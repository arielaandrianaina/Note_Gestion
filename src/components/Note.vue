<template>
  <h2 class="title">Note de {{ username }}</h2>
  <v-row justify="center">
  <v-col
      v-for="note in noteResponse"
      :key="note.id"
      cols="12"  
      sm="6"
      md="4"
    >
  <v-card
    class="mx-auto v-sheet"
    max-width="344"
  >
    <v-card-text>
      <div>Matière du professeur: {{ username }}</div>
      <p class="text-h4 text--primary">
        {{ note.matiere_id }}
      </p>
      <br/>
      <div class="text--primary">
      Vous avez eu: <v-btn
        variant="text"
        color="teal-accent-4"
        @click="reveal = true"
      >
      {{ note.valeur }}
      </v-btn>
      </div>
    </v-card-text>
  </v-card>
</v-col>
  </v-row>
</template>
<script>
import apiService from '../apiService';
import { useStore } from 'vuex';
  export default {
    data: () => ({
      noteResponse: null,
    }),
    computed: {
    username() {
      const store = useStore();
      return store.state.username;
    },
  },
  created(){
    apiService.getNote()
     .then(notes => {
          this.noteResponse = notes;
          this.userNotes = notes.filter(note => note.username === this.username);
        })
      .catch(e => {
        this.errors(e);
      });
  }
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