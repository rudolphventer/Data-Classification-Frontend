<template>
  <div >
    <div class="topsquare movingGradient">
    </div>
  <div class="FormContainer" >
    <div class="title">Register</div>
    <input type="text" v-model="email" placeholder="Email">
    <input v-model="password" placeholder="Password" type="password">
    <input v-model="password2" placeholder="Password" type="password">
    <p v-if="message">{{ message }}</p>
    <button v-on:click='SendRegister' >Register</button>
    <p>Already have an account? <router-link class="routeLink" to="/login"> Sign in</router-link></p>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
import VueJwtDecode from 'vue-jwt-decode'
export default {
  name: 'Register',
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
      password: '',
      password2: ''
    }
  },
   methods: {
    SendRegister: async function ()
    {
      //sends registration request with email and password attached if both are valid, checking occurs on api side as well
      var response= {}; 
      if(this.validateEmail(this.email) && this.password == this.password2)
      {
      response = await axios.post(process.env.VUE_APP_API_URL+"/newuser" , {
               "email": this.email, 
               "password": this.password 
            })
      }
      try{
        if(!response.data.data)
        this.message = response.data.status
        else
        {
          //If registration is successful then user is taken to the login screen after an alert notifies them of the success of the operation
          this.message = response.data.status
          alert(response.data.status)
          this.$router.push("/login")
        }
      }
      catch(err)
      {
        this.message = "Please provide a valid email and ensure that both passwords match"
      }
    },
    validateEmail: function (email)
    {
      //uses regex to check if email is valid
      var re = /\S+@\S+\.\S+/;
      return re.test(email);   
    },
    //checks expiry date of JWT, returns false if expired or invalid
    checkJWT: function () {
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
