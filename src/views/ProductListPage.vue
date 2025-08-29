<template>
  <v-container fluid class="my-8">
    <!-- Loading Spinner -->
    <div v-if="isLoading" class="text-center my-12">
      <v-progress-circular indeterminate color="primary" size="48" />
      <p class="mt-4">Loading products...</p>
    </div>

    <!-- Error Message -->
    <v-alert v-else-if="error" type="error" variant="outlined" class="mt-4">
      {{ error }}
    </v-alert>

    <!-- Product Grid -->
    <v-row v-else>
      <v-col
        v-for="product in products"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            v-bind="props"
            class="pa-2"
            :elevation="isHovering ? 10 : 2"
            style="cursor: pointer; transition: 0.3s ease"
            @click="goToDetail(product.id)"
          >
            <v-img :src="product.image" height="200" cover class="mb-3" />
            <v-card-title>{{ product.name }}</v-card-title>
            <v-card-subtitle>KES {{ product.price }}</v-card-subtitle>
            <v-chip :color="product.inStock ? 'success' : 'success'" small>
              {{ product.inStock ? 'In Stock' : 'In stock' }}
            </v-chip>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'// Vue Composition API
import { useRouter } from 'vue-router'// For navigation
import axios from 'axios'// Axios for HTTP requests

const router = useRouter()
const products = ref([])// Holds the list of products fetched from the backend
const isLoading = ref(true)// Indicates if products are being loaded
const error = ref(null)// Holds any error message during fetching

const fetchProducts = async () => {
  isLoading.value = true// Start loading
  error.value = null// Clear previous errors
  try {
    const response = await axios.get('http://localhost:8000/api/products') // your backend endpoint
    products.value = response.data// Set fetched products
  } catch (err) {
    console.error(err)// Log error for debugging
    error.value = 'Failed to load products from server.'// Set error message
  } finally {
    isLoading.value = false
  }// Stop loading
}

const goToDetail = (id) => {
  router.push({ name: 'ProductDetails', params: { id } })// Navigate to product detail page
}

onMounted(() => {
  fetchProducts()
})// Fetch products when component is mounted
</script>