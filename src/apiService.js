import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000';

export default {
    getFirstApiData() {
      return axios.get(`${API_BASE_URL}/musica`)
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