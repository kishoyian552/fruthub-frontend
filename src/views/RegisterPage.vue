<template>
  <div class="register-page"> <!-- background wrapper -->
    <v-container class="fill-height">
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6" lg="5">
          <v-card elevation="8" class="pa-4">
            <v-card-title class="text-center mb-4">
              <h2 class="text-h4 font-weight-bold text-primary">Register</h2>
            </v-card-title>

            <v-form @submit.prevent="handleRegister" ref="registerForm">
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="formData.firstName"
                    label="First Name"
                    :rules="nameRules"
                    prepend-inner-icon="mdi-account"
                    variant="outlined"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="formData.lastName"
                    label="Last Name"
                    :rules="nameRules"
                    variant="outlined"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-text-field
                v-model="formData.email"
                label="Email"
                type="email"
                :rules="emailRules"
                prepend-inner-icon="mdi-email"
                variant="outlined"
                class="mb-3"
                required
              ></v-text-field>

              <v-text-field
                v-model="formData.phone"
                label="Phone (Optional)"
                type="tel"
                prepend-inner-icon="mdi-phone"
                variant="outlined"
                class="mb-3"
              ></v-text-field>

              <v-text-field
                v-model="formData.password"
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

              <v-text-field
                v-model="formData.confirmPassword"
                label="Confirm Password"
                :type="showConfirmPassword ? 'text' : 'password'"
                :rules="confirmPasswordRules"
                prepend-inner-icon="mdi-lock"
                :append-inner-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append-inner="showConfirmPassword = !showConfirmPassword"
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
                Register
              </v-btn>

              <div class="text-center">
                <p class="text-body-2">
                  Already have an account?
                  <router-link to="/login" class="text-primary text-decoration-none">
                    Login here
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
import { ref, reactive, computed } from 'vue'// Vue Composition API
import { useRouter } from 'vue-router'// For navigation
import { useAuthStore } from '@/stores/auth'// Pinia store for authentication

const router = useRouter()// For navigation
const authStore = useAuthStore()// Access auth store

const registerForm = ref()// Reference to the form
const showPassword = ref(false)// Toggle password visibility
const showConfirmPassword = ref(false)// Toggle confirm password visibility

const formData = reactive({
  email: '',// User's email input
  password: '',// User's password input
  confirmPassword: '',// User's confirm password input
  firstName: '',// User's first name input
  lastName: '',// User's last name input
  phone: ''// User's phone input (optional)
})// Form data model

const nameRules = [
  v => !!v || 'Name is required',
  v => v.length >= 2 || 'Name must be at least 2 characters'
]// Validation rules for name fields

const emailRules = [
  v => !!v || 'Email is required',
  v => /.+@.+\..+/.test(v) || 'Email must be valid'
]// Validation rules for email field

const passwordRules = [
  v => !!v || 'Password is required',
  v => v.length >= 6 || 'Password must be at least 6 characters',
  v => /(?=.*[a-z])/.test(v) || 'Must contain lowercase letter',
  v => /(?=.*[A-Z])/.test(v) || 'Must contain uppercase letter',
  v => /(?=.*\d)/.test(v) || 'Must contain a number'
]// Validation rules for password field

const confirmPasswordRules = computed(() => [
  v => !!v || 'Confirm password is required',
  v => v === formData.password || 'Passwords do not match'
])// Validation rules for confirm password field

const handleRegister = async () => {
  const { valid } = await registerForm.value.validate()// Validate form
  if (valid) {
    const success = await authStore.register(formData)// Call register action in auth store
    if (success) {
      router.push('/')// Redirect to home on successful registration
    }// If registration fails, error is handled in the store
  }// Only proceed if form is valid
}// Handle form submission
</script>

<style scoped>
.register-page {
  min-height: 100vh; /* full screen */
  background-image: url("https://media.istockphoto.com/id/186792072/photo/assorted-fruits-in-modern-fruit-market.jpg?s=612x612&w=0&k=20&c=i6FCRnQCKNFNFHA-Gri-OXiysP8SmPzuUi7S5YZ9DCQ="); /* your image */
  background-size: cover;
  background-position: center;
}
.v-card {
  background-color: rgba(255, 255, 255, 0.7); /* more transparent */
  border-radius: 12px;
}

</style>
