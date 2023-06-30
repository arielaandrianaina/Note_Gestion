<template>
<v-app class="accueil">
  
    <div >
      
    </div>
    <div class="custom-snackbar-container">
    <v-snackbar
      v-model="showSuccessNotification"
      color="success"
      timeout="6000"
      location="bottom right"
    >
      Welcome  {{ username.toUpperCase() }}!!!
    </v-snackbar>
  </div>
</v-app>
  
</template>
<script>
import { useStore } from 'vuex';
  export default{
  data: () => ({
    showSuccessNotification: true,
  }),
  computed: {
    username() {
      const store = useStore();
      return store.state.username;
    },
  }
};
</script>
<style>
.accueil{
    background-image: url("../src/assets/REAL.png");
    background-color: rgb(24, 21, 21);
    background-size:auto;
    background-repeat: no-repeat;
    background-position: center center;
   
}
</style>