<template>
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
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const loginForm = ref(null)
const showPassword = ref(false)

const credentials = reactive({
  email: '',
  password: ''
})

const emailRules = [
  v => !!v || 'Email is required',
  v => /.+@.+\..+/.test(v) || 'Email must be valid'
]

const passwordRules = [
  v => !!v || 'Password is required',
  v => v.length >= 6 || 'Password must be at least 6 characters'
]

const handleLogin = async () => {
  const { valid } = await loginForm.value.validate()

  if (valid) {
    const success = await authStore.login(credentials)
    if (success) {
      router.push('/')
    }
  }
}
</script>
