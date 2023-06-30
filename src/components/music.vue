<script>
import apiService from '../apiService';
import VuetifyAudio from 'vuetify-audio';
import StarRating from 'vue-star-rating';

export default {
  components: {
    StarRating
  },
  data() {
    return {
      firstApiResponse: null,
      file: 'http://www.noiseaddicts.com/samples_1w72b820/290.mp3',
      userRating: 0,
      customClasses: {
        star: 'custom-heart-icon',
        starHalf: 'custom-heart-icon'
      }
    };
  },
  components: {
        'vuetify-audio': VuetifyAudio
    },
  created() {
    apiService.getFirstApiData()
      .then(data => {
        console.log(data)
        this.firstApiResponse = data;
      })
      .catch(e => {
        this.errors(e);
      });

  },
  computed: {
    groupedMusic() {
      const groups = [];
      const chunkSize = 2;
      if (this.firstApiResponse !== null) {
      for (let i = 0; i < this.firstApiResponse.length; i += chunkSize) {
        groups.push(this.firstApiResponse.slice(i, i + chunkSize));
      }
    }
      return groups;
    }
  },
  methods: {
        audioFinish () {
            console.log('You see this means audio finish.');
        }
    }
}
</script>
<template>
  <div>
    <v-row style="padding: 8%;">
      <v-col
        v-for="(group, index) in groupedMusic"
        :key="index"
        cols="12"
        md="4"
        lg="4"
      >
  <v-card
    class="mx-auto"
    max-width="344"
    v-for="music in group"
    :key="music.musicId"
    style="margin-bottom: 10%;"
  >
    <v-img
      :src="music.imageUrl"
      height="300px"
      cover
    ></v-img>

    <v-card-title>
      {{ music.singer }}
    </v-card-title>

    <v-card-subtitle>
      {{ music.title }}
    </v-card-subtitle>

    <v-card-actions>
      <!-- <v-btn
        color="orange-lighten-2"
        variant="text"
      >
        Explore
      </v-btn> -->
      <!-- <v-btn
        color="orange-lighten-2"
        variant="text"
      >
        Explore
      </v-btn> -->
      <br>
        <vuetify-audio :file="file" :ended="audioFinish" class="audio"></vuetify-audio>

      
      <v-spacer></v-spacer>
      <!-- <div>
    <star-rating
      v-model="userRating"
      :star-size="40"
      :increment="0.5"
      active-color="#ff0000"
      inactive-color="#e0e0e0"
      :custom-classes="customClasses"
    ></star-rating>
  </div> -->
    </v-card-actions>
  </v-card>
</v-col>
</v-row>
</div>
</template>
<style>
.custom-heart-icon:before {
  content: '❤️';
  color: red;
}
v-card-actions {
  display: block;
}
.audio {
  /* margin-left: 8%; */
  width: 100%;
  height: 150px;
  max-height: 150px;
}
</style>