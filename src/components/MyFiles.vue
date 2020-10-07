<template>
  <div class="FormContainer" >
    <h2>My Files</h2>
    <div v-for="item in Files" :key="item._id">
        <button @click="OpenFileHandler(item._id)">{{ item.filename +" - "+ getTimestamp(item._id)}}</button>
        <!-- Edit component is called when the openFile var is truthy, it should contain the ID which will be passed to the edit component-->
        <Edit v-if="openFile == item._id" v-bind:givenID="openFile"></Edit>
    </div>
     <h3 v-if="Files.length == 0">You have not uploaded any files yet 😢</h3>
     
  </div>
</template>

<script>
import Edit from '../components/Edit.vue'
import axios from 'axios';
export default {
  name: 'MyFiles',
  components: {
    Edit
  },
  data () {
    return{
      Files: [],
      openFile: ''
    }
  },
  created() {
    this.GetFiles();
  },
  methods: {
    // Gets files uploaded by the current user, the user is identified by JWT on API side
    GetFiles: async function ()
    {
      var files = await axios.post(process.env.VUE_APP_API_URL+"/getall" , {}, {headers: {'authorization': 'Bearer '+localStorage.jwt}})
      this.Files = files.data.data.reverse(); //Just fixing the order of the data to keep newest first
    },
    //Called when a file is clicked, opens the edit component for that ID
    OpenFileHandler: function (id)
    {
        if(this.openFile == id)
        this.openFile = '';
        else
        this.openFile = id;
        
    },
    //Generates time of creation from ID
    getTimestamp : function(id) {
    var time = new Date(parseInt(id.toString().slice(0,8), 16)*1000);
    return time.getDate()+"/"+time.getMonth()+"/"+time.getFullYear()
}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
