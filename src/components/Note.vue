<!-- <template>
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
      <p class="text-h6 text--primary">
        {{ matiereNames[note.matiere_id] }}
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
import { onMounted } from 'vue';
  export default {
    setup() {
    const store = useStore();
    const noteResponse = ref(null);
    const matiereNames = ref(null);

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
    const fetchMatiereNames = async () => {
      try {
        const matieres = await apiService.getMatiereNames(); // Assuming a method to fetch matiere names
        matiereNames.value = matieres.reduce((acc, matieres) => {
          acc[matieres.id] = matieres.nom;
          console.log(matieres.nom)
          return acc;
        }, {});
      } catch (e) {
        console.error(e);
      }
    };
    onMounted(() => {
      fetchNotes();
      fetchMatiereNames();
    });

    return { noteResponse, username, id , matiereNames};
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
</style> -->
<template>
  <div>
    <h2 class="title">Note de {{ username  }}</h2>
    <v-row justify="center">
      <v-col
        v-for="note in noteResponse"
        :key="note.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card class="mx-auto v-sheet" max-width="344" style="background-color: #78909C;">
          <v-card-text>
            <div>Matière du professeur: {{ username }}</div>
            <p class="text-h6 text--primary">
              {{ getMatiereName(note.matiere_id) }}
            </p>
            <br />
            <div class="text--primary">
              Vous avez eu:
              <v-btn
                variant="text"
                color="teal-accent-1"
                @click="reveal = true"
              >
                {{ note.valeur }}/20
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
import { ref, computed, onMounted } from 'vue';
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('user', ['username', 'id']),
  },
  setup() {
    const store = useStore();
    const noteResponse = ref(null);
    const matiereNames = ref(null);
    const getUsername = computed(() => store.state.username);

    const username = computed(() => store.state.username);
    const id = computed(() => store.state.id);

    const fetchNotes = async () => {
      try {
        const notes = await apiService.getNote();
        const currentId = id.value;
        noteResponse.value = notes.filter(note => note.etudiant_id === currentId);
          // Stockez la variable noteResponse dans le local storage
        localStorage.setItem('noteResponse', JSON.stringify(noteResponse.value));
      } catch (e) {
        console.error(e);
      }
    };

    const fetchMatiereNames = async () => {
      try {
        const matieres = await apiService.getMatiereNames();
        matiereNames.value = matieres.reduce((acc, matiere) => {
          acc[matiere.id] = matiere.nom;
          return acc;
        }, {});
      } catch (e) {
        console.error(e);
      }
    };

    const getMatiereName = (matiereId) => {
      if (matiereNames.value && matiereNames.value[matiereId]) {
        return matiereNames.value[matiereId];
      }
      return  {
      getUsername,
    };
    };

    onMounted(() => {
  // Récupérez les données de note à partir du local storage
  const storedNoteResponse = localStorage.getItem('noteResponse');
  if (storedNoteResponse) {
    noteResponse.value = JSON.parse(storedNoteResponse);
  } else {
    fetchNotes();
  }
  
  fetchMatiereNames();
});

    return { noteResponse, username, getMatiereName };
  },
};
</script>

<style>
.title {
  margin-top: 5%;
  margin-left: 45%;
}

.v-sheet {
  margin-top: 5%;
  
}
</style>
