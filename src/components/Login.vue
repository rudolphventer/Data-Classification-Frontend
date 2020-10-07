<template>
<div>
<div class="topsquare movingGradient">
</div>
  <div class="FormContainer">
    <div class="title">Sign in</div>
    <input type="text" v-model="email" placeholder="Email">
    <input v-model="password" placeholder="Password" type="password">
    <p v-if="message">{{ message }}</p>
    <button v-on:click='SendLogin' >Login</button>
    <p>Don't have an account? <router-link class="routeLink" to="/register"> Make one</router-link></p>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
import VueJwtDecode from 'vue-jwt-decode'
export default {
  name: 'Login',
  created ()
  {
    //Checking if user is logged in
    if(!this.checkJWT())
    this.$router.push("/upload")
  },
  data() {
    return{
      message: '',
      email: '',
      password: ''
    }
  },
  methods: {
    SendLogin: async function ()
    {
      //If email and password are valid then send the http request to log in, the response should contain
      //a JWT if successful or a false if unsuccessful
      if(this.validateEmail(this.email) && this.password)
      {
        var token = await axios.post(process.env.VUE_APP_API_URL+"/login" , {"email": this.email, "password": this.password })
        if(token.data.data)
        {
          localStorage.jwt = await token.data.data;
          //redirects to uplaod page if login succeeded
          this.$router.push("/upload")
        }
        else
        this.message = token.data.status;
      }
      else
      this.message = "Please supply a valid email address and password"
      
    },

    validateEmail: function (email)
    {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);   
    },
    //checks expiry date of JWT, returns false if expired or invalid
    checkJWT: function () 
    {
      if(localStorage.jwt){
        try{
          var exp = VueJwtDecode.decode(localStorage.jwt).exp;
          if (Date.now() >= exp * 1000) {
          return false;
          }
        }
        catch(error)
        {
          return false;
        }
      }
      return true;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
