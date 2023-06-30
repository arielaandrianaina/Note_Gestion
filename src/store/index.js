// store/index.js
import { createStore } from 'vuex';

const store = createStore({
  state: {
    username: '',
    isAuthenticated: false,
    userData: null,
    isLoggedIn: false,
  },
  mutations: {
    setUsername(state, username) {
      state.username = username;
      console.log('Setting username:', username); 
    },
    setIsAuthenticated(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
      console.log('Setting isAuthenticated:', isAuthenticated); // Add this console log statement

    },
    clearUserData(state) {
      state.userData = null; // Réinitialiser les données utilisateur à null ou à une valeur vide selon votre structure de données
      // Réinitialiser d'autres données utilisateur si nécessaire
    },
    SET_LOGGED_IN(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    },
  },
  actions: {
    login({ commit }, credentials) {
      // Logique de connexion
      return new Promise((resolve, reject) => {
        // Effectuez ici votre logique de connexion, par exemple une requête API

        // Si la connexion réussit, mettez à jour l'état de connexion dans le store
        commit('SET_LOGGED_IN', true);
        resolve();
        
        // Si la connexion échoue, rejetez la promesse avec une erreur
        reject(new Error('Failed to login'));
      });
    },
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
  },
});

export default store;
