import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vuetify from '@/plugins/Vuetify'
import router from '@/router'
import App from './App.vue'
import { useAuthStore } from '@/stores/auth'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(vuetify)
app.use(router)


const authStore = useAuthStore(pinia)
authStore.loadUser()

app.mount('#app')
