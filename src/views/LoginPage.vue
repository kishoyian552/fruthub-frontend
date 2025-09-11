<template>
  <div class="login-page"> <!-- background wrapper -->
    <v-container class="fill-height">
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card elevation="8" class="pa-4">
            <v-card-title class="text-center mb-4">
              <h2 class="text-h4 font-weight-bold text-primary">Login</h2>
            </v-card-title>

            <v-form @submit.prevent="handleLogin" ref="loginForm">
              <v-text-field
                v-model="credentials.email"
                label="Email"
                type="email"
                :rules="emailRules"
                prepend-inner-icon="mdi-email"
                variant="outlined"
                class="mb-3"
                required
              ></v-text-field>

              <v-text-field
                v-model="credentials.password"
                label="Password"
                :type="showPassword ? 'text' : 'password'"
                :rules="passwordRules"
                prepend-inner-icon="mdi-lock"
                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append-inner="showPassword = !showPassword"
                variant="outlined"
                class="mb-3"
                required
              ></v-text-field>

              <v-alert
                v-if="authStore.error"
                type="error"
                variant="outlined"
                class="mb-4"
              >
                {{ authStore.error }}
              </v-alert>

              <v-btn
                color="primary"
                variant="flat"
                size="large"
                block
                type="submit"
                :loading="authStore.isLoading"
                class="mb-4"
              >
                Login
              </v-btn>

              <div class="text-center">
                <p class="text-body-2">
                  Don't have an account?
                  <router-link to="/register" class="text-primary text-decoration-none">
                    Register here
                  </router-link>
                </p>
              </div>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'// Vue Composition API
import { useRouter } from 'vue-router'//useRouter: For navigation after login.
import { useAuthStore } from '@/stores/auth'//useAuthStore: Pinia store for authentication.

const router = useRouter()// For navigation
const authStore = useAuthStore()// Access the auth store

const loginForm = ref(null)//// Reference to the login form
const showPassword = ref(false)// Toggle password visibility

const credentials = reactive({
  email: '',// User's email input
  password: ''// User's password input
})/// Reactive object to hold login credentials

const emailRules = [
  v => !!v || 'Email is required',
  v => /.+@.+\..+/.test(v) || 'Email must be valid'
]// Validation rules for email input

const passwordRules = [
  v => !!v || 'Password is required',
  v => v.length >= 6 || 'Password must be at least 6 characters'
]// Validation rules for password input

const handleLogin = async () => {
  const { valid } = await loginForm.value.validate()// Validate the form

  if (valid) {
    const success = await authStore.login(credentials)// Attempt to log in
    if (success) {
      router.push('/')//Navigate to home page on successful login
    }
  }// Only proceed if form is valid
}// Handle form submission and login process
</script>

<style scoped>
.login-page {
  min-height: 100vh; /* full screen */
  background-image: url("https://media.istockphoto.com/id/186792072/photo/assorted-fruits-in-modern-fruit-market.jpg?s=612x612&w=0&k=20&c=i6FCRnQCKNFNFHA-Gri-OXiysP8SmPzuUi7S5YZ9DCQ="); /* your image */
  background-size: cover;
  background-position: center;
}
.v-card {
  background-color: rgba(255, 255, 255, 0.7); /* more transparent */
  border-radius: 12px;
  height: 60vh;
  align-items: center;
  justify-content: center;
  
}

</style>
