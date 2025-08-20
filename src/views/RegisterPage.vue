<template>
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
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const registerForm = ref()
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const formData = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  phone: ''
})

const nameRules = [
  v => !!v || 'Name is required',
  v => v.length >= 2 || 'Name must be at least 2 characters'
]

const emailRules = [
  v => !!v || 'Email is required',
  v => /.+@.+\..+/.test(v) || 'Email must be valid'
]

const passwordRules = [
  v => !!v || 'Password is required',
  v => v.length >= 6 || 'Password must be at least 6 characters',
  v => /(?=.*[a-z])/.test(v) || 'Must contain lowercase letter',
  v => /(?=.*[A-Z])/.test(v) || 'Must contain uppercase letter',
  v => /(?=.*\d)/.test(v) || 'Must contain a number'
]

const confirmPasswordRules = computed(() => [
  v => !!v || 'Confirm password is required',
  v => v === formData.password || 'Passwords do not match'
])

const handleRegister = async () => {
  const { valid } = await registerForm.value.validate()
  if (valid) {
    const success = await authStore.register(formData)
    if (success) {
      router.push('/')
    }
  }
}
</script>
