import { createRouter, createWebHistory } from 'vue-router';
import Note from '../components/Note.vue';
import login from '../components/login.vue';
import Home from '../components/Home.vue';
import deconnexion from '../components/deconnexion.vue';



const routes = [
  {
    path: '/Note',
    name: 'Note',
    component: Note,
  },
  {
    path: '/',
    name: 'login',
    component: login,
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/deconnexion',
    name: 'deconnexion',
    component: deconnexion,
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes
});
export default router;


