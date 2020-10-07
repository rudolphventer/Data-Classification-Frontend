<template>
  <div class="FormContainer" style="max-width: 100% !important" >
    <!-- The file object is retrieved from the DB and kept as FileObject, this object is modified and posted back to store changes to the object -->
    <div v-for="(item, index) in FileObject.columns" :key="index">
      <label class="textlabel">Column {{index}}</label>
     <input type="text" v-model="FileObject.columns[index]" placeholder="Column Name">
    </div>
    {{Status}}
    <button class="inverseButton" v-on:click='UpdateFile' >Update Headers</button>
    
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Edit',
  props: {
    givenID: String
  },
  data () {
    return{
      Columns: [],
      Status: '',
      FileObject: {}
    }
  },
  created() {
    console.log("ID",this.givenID)
    this.GetFile();
  },
  watch: 
  { 
    givenID: function(newVal, oldVal) { // watch it
      this.GetFile()
      console.log(oldVal, newVal)
    }
  },
  methods: {
    //Gets the file as a JS object that matches the ID passed to this component as a prop (JWT is used to check user permissions on API)
    GetFile: async function ()
    {
      var file = await axios.post(process.env.VUE_APP_API_URL+"/getfile" , {fileID : this.givenID}, {headers: {'authorization': 'Bearer '+localStorage.jwt}})
      this.FileObject = file.data.data;
      console.log(this.FileObject.columns)
    },
    //Posts the modified JS object back in order to save the new file
    UpdateFile: async function ()
    {
      var updateObj = await axios.post(process.env.VUE_APP_API_URL+"/updatefile" , this.FileObject, {headers: {'authorization': 'Bearer '+localStorage.jwt}})
      this.Status = updateObj.data.status;

    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
