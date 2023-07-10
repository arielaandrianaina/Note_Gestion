import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export default {
    getNote() {
      return axios.get(`${API_BASE_URL}/notes`)
        .then(response => response.data)
        .catch(error => {
          throw error;
        });
    },
    getMatiereNames() {
      return axios.get(`${API_BASE_URL}/matieres`)
        .then(response => response.data)
        .catch(error => {
          throw error;
        });
    },
    getProfessors() {
      return axios.get(`${API_BASE_URL}/professeurs`)
        .then(response => response.data)
        .catch(error => {
          throw error;
        });
    },
    registerApiData(register) {
      return axios.post(`${API_BASE_URL}/Authentification`, register)
        .then(response => response.data)
        .catch(error => {
          throw error;
        });
    },
    getLoginApiData(credentials) {
      return axios.get(`${API_BASE_URL}/Authentification`, credentials)
        .then(response => response.data)
        .catch(error => {
          throw error;
        });
    }
  }