import { createRouter, createWebHistory } from 'vue-router';
import music from '../components/music.vue';
import login from '../components/login.vue';
import album from '../components/album.vue';
import deconnexion from '../components/deconnexion.vue';



const routes = [
  {
    path: '/music',
    name: 'music',
    component: music,
  },
  {
    path: '/',
    name: 'login',
    component: login,
  },
  {
    path: '/album',
    name: 'album',
    component: album,
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


