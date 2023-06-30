import { createRouter, createWebHistory } from 'vue-router';
import music from '../components/music.vue';
import login from '../components/login.vue';
import album from '../components/album.vue';
import deconnexion from '../components/deconnexion.vue';
import store from '../store';


const routes = [
  {
    path: '/music',
    name: 'music',
    component: music,
    meta: { requiresAuth: true },
  },
  {
    path: '/',
    name: 'login',
    component: login,
    beforeEnter: (to, from, next) => {
      if (store.state.isAuthenticated) {
        next({name: 'album'}); // Redirige l'utilisateur vers la page d'album s'il est déjà authentifié
      } else {
        next(); // Permet à l'utilisateur d'accéder à la page de connexion
      }
    }
  },
  {
    path: '/album',
    name: 'album',
    component: album,
    meta: { requiresAuth: true },
  },
  {
    path: '/deconnexion',
    name: 'deconnexion',
    component: deconnexion,
    meta: { requiresAuth: true },
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = store.getters.isLoggedIn;

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      // Redirigez vers la page de connexion ou affichez un message d'erreur
      next({ name: 'login'  });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;


