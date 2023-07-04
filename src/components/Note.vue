<template>
  <h2 class="title">Note de {{ username }}</h2>
  <v-card
    class="mx-auto v-sheet"
    max-width="344"
  >
    <v-card-text>
      <div>Matière du professeur: {{ username }}</div>
      <p class="text-h4 text--primary">
        Mathématiques
      </p>
      <br/>
      <div class="text--primary">
      Vous avez eu: <v-btn
        variant="text"
        color="teal-accent-4"
        @click="reveal = true"
      >
       12/20
      </v-btn>
      </div>
    </v-card-text>
  </v-card>
  
</template>
<script>
import { useStore } from 'vuex';
  export default {
    data: () => ({
      
    }),
    computed: {
    username() {
      const store = useStore();
      return store.state.username;
    },
  },
  }
</script>
<style>
.title{
  margin-top: 5%;
  margin-left: 45%;
}
.v-sheet{
  margin-top: 5%;
}
</style>