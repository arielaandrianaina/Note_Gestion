<script>
import { mapMutations } from 'vuex';
export default {
    methods: {
      ...mapMutations(['setIsAuthenticated', 'clearUserData']),
    logout() {
      console.log("deconnexion ooooooooooo")
      // Réinitialisez l'état d'authentification dans le store Vuex
      this.setIsAuthenticated(false);
      //this.clearUserData();
    
      // Redirigez vers la page de connexion
      this.$router.push({ name: 'login' });
    },
    }
  }
</script>
<template>
</template>