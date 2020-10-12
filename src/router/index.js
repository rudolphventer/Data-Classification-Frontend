import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Upload from '../components/Upload.vue'
import Edit from '../components/Edit.vue'
import MyFiles from '../components/MyFiles.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/upload',
    name: 'Upload',
    component: Upload
  },
  {
    path: '/myfiles',
    name: 'MyFiles',
    component: MyFiles
  },
  {
    path: '/edit',
    name: 'Edit',
    component: Edit
  },
  {
    path: '/',
    name: 'Home',
    component: Login
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
