<template>
  <div >
    <h2>Sign in</h2>
    <input v-model="email" placeholder="email">
    <input v-model="password" placeholder="password" type="password">
    <p v-if="message">{{ message }}</p>
    <button v-on:click='SendLogin' >Login</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  props: {
    //msg: String
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

      var token = await axios.post(process.env.VUE_APP_API_URL+"/login" , {
               "email": this.email, 
               "password": this.password 
            })
      console.log(token.data.status)
      if(token.data.data)
      localStorage.jwt = token.data.data;
      else
      this.message = token.data.status;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
