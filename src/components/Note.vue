<template>
   <div>
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
</div>
</template>
<script>
import apiService from '../apiService';
import { useStore } from 'vuex';
import { ref } from 'vue';
import { computed } from 'vue';
  export default {
    setup() {
    const store = useStore();
    const noteResponse = ref(null);

    const username = computed(() => store.state.username);
    const id = computed(() => store.state.id);

    // Use async/await to handle the asynchronous behavior
    const fetchNotes = async () => {
      try {
        const notes = await apiService.getNote();
        // Access the computed id value using `.value`
        const currentId = id.value;
        noteResponse.value = notes.filter(note => note.etudiant_id === currentId);
      } catch (e) {
        console.error(e);
      }
    };

    fetchNotes(); // Call the function to fetch notes

    return { noteResponse, username, id };
  },
  //   data: () => ({
  //     noteResponse: null,
  //   }),
  //   computed: {
  //   username() {
  //     const store = useStore();
  //     return store.state.username;
  //   },
  //   id(){
  //     const store = useStore();
  //     return store.state.id;
      
  //   }
  // },
  // created(){
  //   apiService.getNote()
  //    .then(notes => {
  //         //this.noteResponse = notes;
  //         this.noteResponse = notes.filter(note => note.etudiant_id === this.id);
  //       })
  //     .catch(e => {
  //       this.errors(e);
  //     });
  // }
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