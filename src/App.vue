<script>
import music from './components/music.vue';
import { mapMutations } from 'vuex';
export default {
  name: 'App',
  components: {
    music
  },

  data (){
    return{ 

    };
  },
  computed: {
    isLoginPage() {
      return this.$route.path === '/';
    },
  },
  methods: {
     ...mapMutations(['setIsAuthenticated']),
    logout() {
      // Réinitialisez l'état d'authentification dans le store Vuex
      this.setIsAuthenticated(false);

      // Effectuez d'autres actions de déconnexion (par exemple, suppression des données utilisateur)
    
      // Redirigez vers la page de connexion
      this.$router.push({ name: 'login' });
    },
  },
}
</script>
<template>
  
  <v-app>
  <v-app-bar app color="#424242" dark>
  <v-btn value="recent" color="white"  :disabled="isLoginPage">
      <router-link to="/music" class="custom-link">Musics</router-link>
  </v-btn>

  <v-btn value="favorites" color="#fff"  :disabled="isLoginPage">
    <router-link to="/note" class="custom-link">note</router-link>
  </v-btn>

  <v-btn value="nearby" color="#fff"  :disabled="isLoginPage">
   <router-link to="/prof" class="custom-link">Professeur</router-link>
  </v-btn>
  <v-spacer></v-spacer>

  <v-btn  value="nearby" color="#fff" class="text-right" @click="logout" :disabled="isLoginPage" v-if="!isLoginPage">
      Déconnexion
  </v-btn>
  </v-app-bar>
  <v-content class="content">
    <router-view></router-view>
  </v-content>
</v-app>
    
</template>
<style>
.custom-link {
  text-decoration: none; 
  color: inherit; 
}
.content{
  width: 100%;
  height: 100%;
  margin-top: 0%;
}
</style>
