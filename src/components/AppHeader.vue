<template>
  <v-app-bar color="primary" app elevation="2" height="64">
    <v-container class="d-flex align-center">
      <router-link to="/" class="text-decoration-none">
        <v-toolbar-title class="text-white font-weight-bold">
          <v-icon icon="mdi-fruit-pineapple" class="mr-2" />
          FruitHub
        </v-toolbar-title>
      </router-link>

      <v-spacer />

      <div class="d-none d-md-flex align-center">
        <v-btn variant="text" color="white" to="/products" class="mr-2">
          Products
        </v-btn>

        <!-- Cart Button with Badge -->
        <v-btn variant="text" color="white" to="/cart" class="mr-2">
          <v-badge
            :content="cartItemCount"
            color="red"
            overlap
            v-if="cartItemCount > 0"
          >
            <v-icon>mdi-cart</v-icon>
          </v-badge>
          <v-icon v-else>mdi-cart</v-icon>
          <span class="ml-1">Cart</span>
        </v-btn>

        <v-btn variant="outlined" color="white" to="/login" class="mr-2">
          Login
        </v-btn>
        <v-btn variant="flat" color="white" to="/register">
          Register
        </v-btn>
      </div>

      <v-app-bar-nav-icon class="d-md-none" color="white" @click="drawer = !drawer" />
    </v-container>
  </v-app-bar>

  <!-- Mobile Drawer -->
  <v-navigation-drawer v-model="drawer" temporary location="right" class="d-md-none">
    <v-list>
      <v-list-item to="/products">
        <template v-slot:prepend>
          <v-icon>mdi-shopping</v-icon>
        </template>
        <v-list-item-title>Products</v-list-item-title>
      </v-list-item>

      <v-list-item to="/cart">
        <template v-slot:prepend>
          <v-badge
            :content="cartItemCount"
            :model-value="cartItemCount > 0"
            color="red"
          >
            <v-icon>mdi-cart</v-icon>
          </v-badge>
        </template>
        <v-list-item-title>Cart</v-list-item-title>
      </v-list-item>

      <v-divider class="my-2" />

      <v-list-item to="/login">
        <template v-slot:prepend>
          <v-icon>mdi-login</v-icon>
        </template>
        <v-list-item-title>Login</v-list-item-title>
      </v-list-item>

      <v-list-item to="/register">
        <template v-slot:prepend>
          <v-icon>mdi-account-plus</v-icon>
        </template>
        <v-list-item-title>Register</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '@/stores/cart'

const drawer = ref(false)
const cartStore = useCartStore()

// Compute total quantity from cart store
const cartItemCount = computed(() =>
  cartStore.items.reduce((sum, item) => sum + item.quantity, 0)
)
</script>

<style scoped>
.v-toolbar-title {
  cursor: pointer;
}
.v-btn--variant-outlined {
  border: 1px solid currentColor;
}
.v-navigation-drawer .v-list-item {
  padding: 8px 16px;
}
.v-badge .v-badge__badge {
  font-size: 12px;
  min-width: 18px;
  height: 18px;
}
</style>
