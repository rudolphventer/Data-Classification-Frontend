<template>
  <div id="app">
    <!-- 
      Navbar checks if user is authed before displaying itself
    -->

    <ul v-if="isAuthed" id="nav" class="navbar movingGradient">
      <router-link style="float: left;" v-if="isAuthed" to="/upload">Upload</router-link>
      <router-link style="float: left;" v-if="isAuthed" to="/myfiles">My Uploads</router-link>
      <li v-if="isAuthed" v-on:click='logOut' style="float: right;" >Sign out</li>
    </ul>
    <div class="loader" v-if="!apiconn">
      <img src="/loader.gif" width="50%" style="margin-left: auto; margin-right: auto">
      <p>Please be patient, the service may take up to 30 seconds to start</p>
    </div>
    <router-view v-if="apiconn"/>
  </div>
</template>

<script>
import VueJwtDecode from 'vue-jwt-decode'
import axios from 'axios';
export default {
  name: 'Edit',
  data () {
    return{
      // Keeps track of whether user is logged in. All API requests check the JWT as well so this is jsut for gui reasons.
      isAuthed: false,
      apiconn: false
    }
  },
  created: function () {
    //Check auth on pagelaod
    this.checkAuth();
    console.log("Authe1d:"+this.isAuthed)
    if(!this.isAuthed)
    {
      this.$router.push("/");
    }
    this.PingAPI();
  },
  watch:{
    //Check auth on route change
    $route (){
        this.checkAuth();
    }
}, 
  methods: {
    //Triggered by logout button, clears jwt from localstorage and routes to login page, then refreshes auth var to reflect being logged out.
      logOut: function () {
        localStorage.removeItem("jwt");
        this.$router.push("/login");
        this.checkAuth();
      },
      //Decodes JWT and checks expiry date, if it is not expired then returns true, returns false if JWT does not exist or is expired
      checkAuth: function () {
      try{
          var exp = VueJwtDecode.decode(localStorage.jwt).exp;
        }
        catch(err)
        {
          this.isAuthed = false;
          console.log("Authed:"+this.isAuthed)
          return
        }
        if (Date.now() >= exp * 1000) {
          this.isAuthed = false;
          console.log("Authed:"+this.isAuthed)
          return
        }
        this.isAuthed = true;
        return
    },
    PingAPI: async function () {
      var check = await axios.get(process.env.VUE_APP_API_URL+"/ping" )
      if(check)
      this.apiconn = true;
    }

    }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
<style src='./assets/styles.css'></style>
