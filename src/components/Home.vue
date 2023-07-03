<template>
<!-- <v-app class="accueil"> -->
  
    <div class="accueil">
      
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
<!-- </v-app> -->
  
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
    width: 100%;
    height: 100vh;
    background-image: url("../src/assets/note.png");
    /* background-color: rgb(24, 21, 21); */
    /* background-size:40%; */
    background-repeat: no-repeat;
    background-position: center center;
   
}
</style>