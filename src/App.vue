<script>
import Note from './components/Note.vue';
import Home from './components/Home.vue';
import deconnexion from './components/deconnexion.vue';
import { mapMutations } from 'vuex';
import { useStore } from 'vuex';
export default {
  name: 'App',
  components: {
    Note,
    Home,
    deconnexion
  },

  data (){
    return{ 
      items: [
        { text: 'My Files', icon: 'mdi-folder', to: '/Home' , textClass: 'text'},
        { text: 'Shared with me', icon: 'mdi-account-multiple' , to: '/deconnexion', textClass: 'text'},
        { text: 'Recent', icon: 'mdi-history', textClass: 'text' },
        { text: 'Offline', icon: 'mdi-check-circle' , textClass: 'text'},
        { text: 'Uploads', icon: 'mdi-upload', textClass: 'text' },
        { text: 'deconnexion', icon: 'mdi-logout', textClass: 'text' },
      ],
      studentItems: [
        { text: 'Note Eleve', icon: 'mdi-note', to: '/Note', textClass: 'text' },
        { text: 'deconnexion', icon: 'mdi-logout', to: '/deconnexion', textClass: 'text' },
      ],
    };
  },
  computed: {
    isLoginPage() {
      return this.$route.path === '/';
    },
    username() {
      const store = useStore();
      return store.state.username;
    },
    Email(){
      const store = useStore();
      return store.state.Email;
    },
    userRole() {
      return this.$store.state.userRole; // Assuming you have 'userRole' stored in the Vuex state
    },
    visibleItems() {
      if (this.userRole === 'etudiant') {
        return this.studentItems;
      } else {
        return this.items;
      }
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
    itemClick(item) {
      console.log(item);
      if (!this.isLoginPage || item.text !== 'deconnexion') {
        // Handle item click logic here
        if (item.text === 'deconnexion') {
          this.logout();
        } else {
          // Handle other item clicks
          this.$router.push(item.to);
        }
      }
    },
}
}
</script>
<template>
  
  <!-- <v-app>
  <v-app-bar app color="#424242" dark>
  <v-btn value="recent" color="white"  :disabled="isLoginPage">
      <router-link to="/autre" class="custom-link">autre</router-link>
  </v-btn>

  <v-btn value="favorites" color="#fff"  :disabled="isLoginPage">
    <router-link to="/Note" class="custom-link">note</router-link>
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
</v-app> -->
<v-layout>
      <v-navigation-drawer permanent absolute class="nav" style="background-color: #546E7A;">
        <v-list>
          <v-list-item
            prepend-avatar="../src/assets/avatar.jpg"
            :title="username"
            :subtitle="Email"
            :class="customClass"
          >
            
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list
          :lines="false"
          density="compact"
          nav
        >
          <v-list-item
            v-for="(item, i) in visibleItems"
            :key="i"
            :value="item"
            color="white"
            :to="item.to"
            @click="itemClick(item)"
            :class="{ 'disabled': isLoginPage  }"
          >
            <template v-slot:prepend>
              <v-icon :icon="item.icon" class="text"></v-icon>
            </template>

            <v-list-item-title  :class="item.textClass" v-text="item.text"></v-list-item-title>
          </v-list-item>
        </v-list>
       
      </v-navigation-drawer>

      <v-main style="height: 354px;"> 
          <router-view></router-view>
        
      </v-main>
    </v-layout>
</template>
<style>
.text{
  color: #fff;
}
.v-list-item.disabled {
  pointer-events: none;
  opacity: 0.6;
}
.customClass {
  color: red; /* Replace with your desired color */
}
</style>
