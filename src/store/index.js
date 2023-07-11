// store/index.js
import { createStore } from 'vuex';

const store = createStore({
  state: {
    username: localStorage.getItem('username') || '',
    Email: localStorage.getItem('Email') || '',
    id: localStorage.getItem('id') || '',
    isAuthenticated: false,
    user: null,
    isLoggedIn: false,
    userRole: localStorage.getItem('userRole') || '',
    notes: [], 
  },
  mutations: {
    setNotes(state, notes) {
      state.notes = notes;
      localStorage.setItem('notes', notes); // Store the username in local storage
    },
    setUsername(state, username) {
      state.username = username;
      localStorage.setItem('username', username); // Store the username in local storage
      console.log('Setting username:', username); 
    },
    setId(state, id){
      state.id = id;
      localStorage.setItem('id', id); // Store the id in local storage
      console.log('Setting id:', id); 
    },
    setEmail(state, Email) {
      state.Email = Email;
      localStorage.setItem('Email', Email); // Store the mail in local storage
      console.log('Setting Email:', Email); 
    },
    setIsAuthenticated(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
      console.log('Setting isAuthenticated:', isAuthenticated); // Add this console log statement

    },
    clearUserData(state) {
      state.username = null; // Réinitialiser les données utilisateur à null ou à une valeur vide selon votre structure de données
      state.Email = null;
      state.id = null;
    },
    setUserRole(state, role) {
      state.userRole = role;
      localStorage.setItem('userRole', role); // Store the mail in local storage
    },
  },
  actions: {
    login({ commit }, { username }) {
      commit('setUsername', username);
      commit('setIsAuthenticated', true);
      localStorage.setItem('username', username); // Store the username in local storage
    },
    logout({ commit }) {
      commit('setUsername', '');
      commit('setIsAuthenticated', false);
      localStorage.removeItem('username'); // Remove the username from local storage
    },
  },
});

export default store;
