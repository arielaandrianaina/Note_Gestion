<script>
import { mapMutations } from 'vuex';
export default {
    methods: {
    // ...mapMutations(['setIsAuthenticated']),
    logout() {
      // Réinitialisez l'état d'authentification dans le store Vuex
      this.setIsAuthenticated(false);
      this.$store.commit('clearUserData')
      // Effectuez d'autres actions de déconnexion (par exemple, suppression des données utilisateur)

      // Redirigez vers la page de connexion
      this.$router.push({ name: 'login' });
    },
    }
  }
</script>
<template>
</template>