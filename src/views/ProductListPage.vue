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
            <v-chip :color="product.inStock ? 'success' : 'error'" small>
              {{ product.inStock ? 'In Stock' : 'Out of Stock' }}
            </v-chip>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const products = ref([])
const isLoading = ref(true)
const error = ref(null)

const fetchProducts = async () => {
  isLoading.value = true
  error.value = null
  try {
    const response = await axios.get('http://localhost:8000/api/products') // your backend endpoint
    products.value = response.data
  } catch (err) {
    console.error(err)
    error.value = 'Failed to load products from server.'
  } finally {
    isLoading.value = false
  }
}

const goToDetail = (id) => {
  router.push({ name: 'ProductDetails', params: { id } })
}

onMounted(() => {
  fetchProducts()
})
</script>
