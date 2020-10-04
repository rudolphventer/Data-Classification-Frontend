<template>
  <div id="app">
    <ul id="nav" class="navbar">
      <router-link v-if="!isAuthed" to="/login">Login</router-link>
      <router-link v-if="!isAuthed" to="/register">Sign up</router-link>
      <router-link v-if="isAuthed" to="/upload">Upload</router-link>
      <li v-on:click='logOut' >Logout</li>
    </ul>
    <router-view/>
  </div>
</template>
<script>
import VueJwtDecode from 'vue-jwt-decode'
export default {
  name: 'Edit',
  computed: {
    isAuthed: function () {
        try{
          var exp = VueJwtDecode.decode(localStorage.jwt).exp;
        }
        catch(err)
        {
          return false;
        }
        if (Date.now() >= exp * 1000) {
          return false;
        }
        return true;
    }
  },
  methods: {
      logOut: function () {
        localStorage.jwt = null;
        this.$router.push("/login");
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
