// store/index.js
import { createStore } from 'vuex';

const store = createStore({
  state: {
    username: '',
    Email:'',
    isAuthenticated: false,
    userData: null,
    isLoggedIn: false,
    userRole: '', // Initialize as an empty string
  },
  mutations: {
    setUsername(state, username) {
      state.username = username;
      console.log('Setting username:', username); 
    },
    setEmail(state, Email) {
      state.Email = Email;
      console.log('Setting Email:', Email); 
    },
    setIsAuthenticated(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
      console.log('Setting isAuthenticated:', isAuthenticated); // Add this console log statement

    },
    clearUserData(state) {
      state.userData = null; // Réinitialiser les données utilisateur à null ou à une valeur vide selon votre structure de données
      // Réinitialiser d'autres données utilisateur si nécessaire
    },
    setUserRole(state, role) {
      state.userRole = role;
    },
  }
});

export default store;
