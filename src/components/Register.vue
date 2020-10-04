<template>
  <div >
    <h2>Register</h2>
    <input v-model="email" placeholder="email">
    <input v-model="password" placeholder="password" type="password">
    <p v-if="message">{{ message }}</p>
    <button v-on:click='SendRegister' >Login</button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Register',
  props: {
    msg: String
  },
  data() {
    return{
      message: '',
      email: '',
      password: ''
    }
  },
   methods: {
    SendRegister: async function ()
    {

      var response = await axios.post(process.env.VUE_APP_API_URL+"/newuser" , {
               "email": this.email, 
               "password": this.password 
            })
      if(!response.data.data)
      this.message = response.data.status
      else
      alert(response.data.status)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
