import { createApp } from 'vue'// Vue 3
import { createPinia } from 'pinia'// Pinia for state management
import vuetify from '@/plugins/Vuetify'// Vuetify plugin
import router from '@/router'// Vue Router instance
import App from './App.vue'// Root component
import { useAuthStore } from '@/stores/auth'// Import auth store

const app = createApp(App)// Create Vue app instance
const pinia = createPinia()// Create Pinia instance

app.use(pinia)// Use Pinia for state management
app.use(vuetify)// Use Vuetify
app.use(router)// Use Vue Router


const authStore = useAuthStore(pinia)// Access auth store
authStore.loadUser()// Load user from localStorage if available

app.mount('#app')// Mount the app to the DOM
