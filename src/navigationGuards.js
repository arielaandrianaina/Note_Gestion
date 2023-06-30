import router from './router';
import store from './store'; // Assuming you have a Vuex store

router.beforeEach((to, from, next) => {
  const isLoggedIn = store.getters.isLoggedIn;

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      // Redirigez vers la page de connexion ou affichez un message d'erreur
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
