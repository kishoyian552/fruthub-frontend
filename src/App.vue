<template>
  <v-app>
    <AppHeader />
    <v-main>
      <router-view />
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script setup>
import { onMounted } from 'vue'//Vue Composition API
import AppHeader from '@/components/AppHeader.vue'// Header component
import AppFooter from '@/components/AppFooter.vue'// Footer component
import { useCartStore } from '@/stores/cart'//useCartStore: To access cart state and actions

const cartStore = useCartStore()//useCartStore: To access cart state and actions

onMounted(async () => {
  await cartStore.loadCart()//load cart from localStorage
})// Load cart when app mounts
</script>
