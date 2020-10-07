<template>
    <div class="FormContainer">
      <h2>Upload a file for classification</h2>
      <div class="fileWrapper">
        <input type="file" id="file" ref="file" accept=".txt,.csv,.xlsx" v-on:change="handleFileUpload()"/>
      </div>
      <img v-if="uploading" src="/loader.gif" width="50%" style="margin-left: auto; margin-right: auto">
      <p v-if="message">{{ message }}</p>
      <button v-on:click="submitFile()">Upload</button>
      <h2 v-if="status">{{status}}</h2>
      <div v-if="time">Processed in {{time}}</div>
      <Edit v-if="returnID" v-bind:givenID="returnID"></Edit>
  </div>
</template>

<script>
import Edit from '../components/Edit.vue'
import axios from 'axios';
export default {
  name: 'Upload',
  components: {
    Edit
  },
  props: {
    msg: String
  },
  data(){
    return {
      status: '',
      message: '',
      file: '',
      returnID: '',
      uploading: false,
      time: ''
    }
  },
  methods: {
    handleFileUpload: function () {
    this.file = this.$refs.file.files[0];
  },

  /*
    submitFile sends a request with the file as form data and the JWT as a bearer token, it recieves 
    a status message and the record ID or a false boolean if the request fails. The file extension is also checked and a loading bar is displayed for large files
  */
  submitFile: async function () {
    //Checking if a file has been uploaded and if the extension is allowed
    if(this.file)
    if(["csv","txt","xlsx"].includes(this.file.name.split(".").pop()))
    {
      //Declaring form data and appending the file
      let formData = new FormData();
       formData.append('file', this.file);
       var token = localStorage.jwt;
       this.uploading = true;
       //Making the request and adding the JWT 
       var request = await axios.post( process.env.VUE_APP_API_URL+"/upload",formData,{headers: {'Content-Type': 'multipart/form-data', 'authorization': 'Bearer '+token}});
       this.uploading = false; //Stops the upload spinner
       this.status = request.data.status;
       //Showing the processing time because I think it's interesting
       this.time = request.data.time;
       //Checks if the upload was successful
       if(request.data.data)
        this.CreateEditor(request.data.data);
       this.message = '';
       return
    }
    this.returnID = '';
    this.status = ''
    this.message = "Please select a .csv, .txt or .xlsx file";

    },
    CreateEditor: function(ID){
      this.returnID = '';
      this.returnID = ID;
    },
     
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
