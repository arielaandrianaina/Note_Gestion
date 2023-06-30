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
      
            <v-btn type="submit" block class="text-color mt-2" color="#263238" style="border-radius: 10px;">Submit</v-btn>
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

            <v-btn type="submit" block class="text-color mt-2" color="#263238" style="border-radius: 10px;">Register</v-btn>
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
        PasswordRules: [
          value => {
            if (value && value.length >= 6) return true;

        return 'Password must be at least 6 characters.';
          },
        ],
        confirm: '',
        confirmPasswordError: '',
        showSuccessNotification: false,
      }),
        methods: {
          ...mapActions(['login']), // Assuming you have a Vuex action called 'login'
          submitForm() {
            console.log('Submit form called');
            const credentials = {
            Email: this.Email,
            Password: this.Password
          };
          const emailParts = credentials.Email.split('@'); 
          const username = emailParts[0];
          
          apiService.getLoginApiData(credentials)
            .then(response => {
              console.log('Making API request to authenticate user:', credentials); // Add this console log statement
              this.$store.commit('setIsAuthenticated', true);
              this.$store.commit('setUsername', username);
              this.$router.push({name: 'album'});
            })
            .catch(error => {
            console.error(error);
            });
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