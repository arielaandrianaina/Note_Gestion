<template>
  <div class="taille">
    <div v-if="renderType === 'login'">
      <v-sheet width="400" class="mx-auto">
          <v-form fast-fail @submit.prevent="submitForm">
            <v-text-field
              v-model="Email"
              label="Email"
              :rules="EmailRules"
            ></v-text-field>
      
            <v-text-field
              v-model="Password"
              label="Password"
              :rules="PasswordRules"
              type="password"
            ></v-text-field>
      
            <v-btn type="submit" block class="text-color mt-2" color="#546e7a" style="border-radius: 10px; ">Submit</v-btn>
          </v-form>
        </v-sheet>
    </div>
    <div v-else-if="renderType === 'register'">
      <v-sheet width="400" class="mx-auto">
          <v-form fast-fail @submit.prevent="submitRegister"  ref="form">
            <v-text-field
              v-model="Email"
              label="Email"
              :rules="EmailRules"
            ></v-text-field>
      
            <v-text-field
              v-model="Password"
              label="Password"
              :rules="PasswordRules"
              type="password"
            ></v-text-field>
      
            <v-text-field
              label="Confirm Password"
              v-model="confirm"
              :rules="ConfirmPasswordRules"
              type="password"
              :error-messages="confirmPasswordError"
            ></v-text-field>

            <v-btn type="submit" block class="text-color mt-2" color="#546e7a" style="border-radius: 10px;" :disabled="!isRegisterFormValid">Register</v-btn>
          </v-form>
        </v-sheet>
    </div>
    <div class="row btn">
      <v-btn  v-if="renderType === 'login'" @click="toggleRender">
        <span class="material-icons">
        how_to_reg
        </span>
        Register
      </v-btn>
      <v-btn class=""  v-else="renderType === 'register'" @click="toggleRender">
        <span class="material-icons">
           person
        </span>
        Signin
      </v-btn>
    </div>
  </div>
  <div class="custom-snackbar-container">
    <v-snackbar
      v-model="showSuccessNotification"
      color="success"
      timeout="3000"
      location="bottom right"
    >
      Registration successful!!!
    </v-snackbar>
  </div>
  </template>

  <script>
  import { mapActions } from 'vuex';
  import apiService from '../apiService';
  import axios from 'axios';
  import { mapMutations } from 'vuex';

    export default {
      data: () => ({
        renderType: 'login',
        LoginResponse: null,
        Email: '',
        EmailRules: [
          value => {
            if (isValidEmail(value)) return true;

        return 'Please enter a valid email address.';
          },
        ],
        Password: '',
        id:'',
        PasswordRules: [
          value => {
            if (value && value.length >= 6) return true;

        return 'Password must be at least 6 characters.';
          },
        ],
        confirm: '',
        confirmPasswordError: '',
        showSuccessNotification: false,
        jsonData: null,
        loaded: false,
      }),
      computed: {
        isRegisterFormValid() {
            // Check if all required fields are filled
            return this.Email && this.Password && this.confirm;
          },
        },
      created() {
        this.loadData(); // Appel de la méthode pour charger les données
        
      },
        methods: {
          ...mapMutations(['setUserRole']), // Add this line to use the setUserRole mutation

          loadData() {
          axios.get('http://localhost:3000/db')
            .then(response => {
              this.jsonData = response.data; // Stockez les données JSON dans la propriété jsonData
              this.loaded = true; 
            })
            .catch(error => {
              console.error('Erreur lors du chargement des données JSON:', error);
            });
        },
          submitForm() {
          // Check if the email and password are valid
          if (!this.Email || !this.Password) {
            // Show an error message or take any other appropriate action
            console.error('Email and Password are required.');
            return;
          }
           // Check if jsonData is available before accessing its properties
          if (!this.jsonData || !this.jsonData.Authentification) {
            console.error('Data is not loaded yet.');
            return;
          }
            const credentials = {
            Email: this.Email,
            Password: this.Password,
            id: this.id
          };
          // Recherchez l'utilisateur dans les données d'authentification
          const user = this.jsonData.Authentification.find(
            (user) => user.Email === this.Email && user.Password === this.Password
          );

          if (user) {
            // Vérifiez si l'utilisateur est un étudiant ou un professeur
            const etudiant = this.jsonData.etudiants.find((etudiant) => etudiant.Email === user.Email);
            const professeur = this.jsonData.professeurs.find((professeur) => professeur.Email === user.Email);

            if (etudiant) {
              this.setUserRole('etudiant'); // Dispatch the mutation to set userRole to 'etudiant'
              const emailParts = credentials.Email.split('@'); 
              const username = emailParts[0];
              const Email = this.Email;
              const id = etudiant.id;
          
              apiService.getLoginApiData(credentials)
                .then(response => {
                  this.$store.commit('setUsername', username);
                  this.$store.commit('setId', id);
                  this.$store.commit('setEmail', Email);
                  this.$router.push({name: 'Home'});
                })
                .catch(error => {
                console.error(error);
                });
              console.log('Authentifié en tant qu\'étudiant:', etudiant.prenom, etudiant.nom);
              // Effectuer des actions spécifiques pour l'étudiant (par exemple, rediriger vers la page d'accueil des étudiants)
            } else if (professeur) {
              this.setUserRole('professeur');
              const emailParts = credentials.Email.split('@'); 
              const username = emailParts[0];
              const Email = this.Email;
              const id = professeur.id;
          
              apiService.getLoginApiData(credentials)
                .then(response => {
                  this.$store.commit('setUsername', username);
                  this.$store.commit('setEmail', Email);
                  this.$store.commit('setId', id);
                  this.$router.push({name: 'Home'});
                })
                .catch(error => {
                console.error(error);
                });
              console.log('Authentifié en tant que professeur:', professeur.prenom, professeur.nom);
              // Effectuer des actions spécifiques pour le professeur (par exemple, rediriger vers la page d'accueil des professeurs)
            } else {
              console.error('Rôle d\'utilisateur inconnu');
            }
          } else {
            console.error('Email ou mot de passe incorrect.');
          }
        
         
        },
        submitRegister() {
          if (this.$refs.form.validate()) {
            if (this.Password === this.confirm) {
              const register = {
                Email: this.Email,
                Password: this.Password
              };

              apiService.registerApiData(register)
                .then(response => {
                  const token = response.token;
                  localStorage.setItem('accessToken', token);
                  this.resetForm(); 
                  this.showSuccessNotification = true;
                  this.renderType = 'login'; 
                })
                .catch(error => {
                  console.error(error);
                });
            } else {
              this.confirmPasswordError = 'Password and Confirm Password do not match';
              console.error('Password and Confirm Password do not match');
            }
          } else {
            console.error('Form validation failed');
          }
        },
        toggleRender() {
          if (this.renderType === 'login') {
            this.resetForm();
            this.renderType = 'register'; // Switch to rendering 2
          } else {
            this.resetForm();
            this.renderType = 'login'; // Switch back to rendering 1
          }
        },
        resetForm() {
        this.Email = '';
        this.Password = '';
        this.confirm = '';
        this.confirmPasswordError = '';
    }
    }
    }
    function  isValidEmail(Email) 
        {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(Email);
        }
  </script>
<style>
.taille{
    margin: 18% auto;
}
.text-color{
    color:#fff;
    border-radius: 0 0;
}
.btn{
  color: #fff;
  margin-top: 2%;
  margin-left: 46%;
  
}
.white{
  color: #fff;
}
</style>