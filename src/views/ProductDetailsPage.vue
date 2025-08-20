<template>
  <v-container class="my-8">
    <!-- Loading State -->
    <div v-if="isLoading" class="text-center">
      <v-progress-circular indeterminate color="primary" size="64" />
      <p class="mt-4">Loading product details...</p>
    </div>

    <!-- Error State -->
    <v-alert v-else-if="error" type="error" variant="outlined" prominent class="mb-6">
      {{ error }}
      <template v-slot:append>
        <v-btn color="error" variant="outlined" size="small" @click="loadProduct">
          Retry
        </v-btn>
      </template>
    </v-alert>

    <!-- Product Details -->
    <div v-else-if="product">
      <v-breadcrumbs :items="breadcrumbs" class="px-0">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>

      <v-row>
        <!-- Product Image -->
        <v-col cols="12" md="6">
          <v-card elevation="2" class="overflow-hidden">
            <v-img :src="product.image" height="500" cover class="product-detail-image">
              <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-progress-circular indeterminate color="primary" />
                </div>
              </template>
            </v-img>
          </v-card>
        </v-col>

        <!-- Product Info -->
        <v-col cols="12" md="6">
          <div class="product-info">
            <v-chip :color="product.in_stock ? 'success' : 'error'" class="mb-4">
              {{ product.in_stock ? 'In Stock' : 'Out of Stock' }}
            </v-chip>

            <h1 class="text-h3 font-weight-bold text-primary mb-4">
              {{ product.name }}
            </h1>

            <div v-if="product.rating" class="d-flex align-center mb-4">
              <v-icon color="amber" class="mr-1">mdi-star</v-icon>
              <span class="text-h6 mr-2">{{ Number(product.rating) }}</span>
              <span class="text-body-1 text-grey">({{ product.reviews }} reviews)</span>
            </div>

            <p class="text-h4 font-weight-bold text-primary mb-4">
              ksh{{ Number(product.price).toFixed(2) }}
            </p>

            <p class="text-body-1 mb-6">{{ product.description }}</p>

            <!-- Quantity -->
            <div class="d-flex align-center mb-6">
              <span class="text-subtitle-1 mr-4">Quantity:</span>
              <v-btn-toggle
                v-model="selectedQuantity"
                color="primary"
                variant="outlined"
                divided
              >
                <v-btn icon @click="decreaseQuantity" :disabled="selectedQuantity <= 1">
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
                <v-btn disabled class="px-4">
                  {{ selectedQuantity }}
                </v-btn>
                <v-btn icon @click="increaseQuantity" :disabled="selectedQuantity >= 10">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-btn-toggle>
            </div>

            <!-- Buttons -->
            <div class="d-flex flex-column flex-sm-row gap-3">
              <v-btn
                color="primary"
                variant="flat"
                size="large"
                :disabled="!product.in_stock || isAddingToCart"
                :loading="isAddingToCart"
                @click="addToCart"
                class="flex-grow-1"
              >
                <v-icon start>mdi-cart-plus</v-icon>
                Add to Cart
              </v-btn>

              <v-btn
                color="primary"
                variant="outlined"
                size="large"
                to="/products"
                class="flex-grow-1 flex-sm-grow-0"
              >
                <v-icon start>mdi-arrow-left</v-icon>
                Back to Products
              </v-btn>
            </div>

            <v-alert v-if="showSuccessMessage" type="success" variant="outlined" class="mt-4">
              Product added to cart successfully!
            </v-alert>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import axios from 'axios'

const route = useRoute()
const cartStore = useCartStore()

const product = ref(null)
const isLoading = ref(true)
const error = ref(null)
const selectedQuantity = ref(1)
const isAddingToCart = ref(false)
const showSuccessMessage = ref(false)

const breadcrumbs = computed(() => [
  { title: 'Home', to: '/' },
  { title: 'Products', to: '/products' },
  { title: product.value?.name || 'Product', disabled: true }
])

const increaseQuantity = () => { if (selectedQuantity.value < 10) selectedQuantity.value++ }
const decreaseQuantity = () => { if (selectedQuantity.value > 1) selectedQuantity.value-- }

const addToCart = async () => {
  if (!product.value) return
  isAddingToCart.value = true
  showSuccessMessage.value = false
  try {
    cartStore.addToCart({
      ...product.value,
      quantity: selectedQuantity.value
    })
    showSuccessMessage.value = true
    setTimeout(() => showSuccessMessage.value = false, 3000)
  } finally {
    isAddingToCart.value = false
  }
}

const loadProduct = async () => {
  isLoading.value = true
  error.value = null
  try {
    const productId = route.params.id
    const response = await axios.get(`http://localhost:8000/api/products/${productId}`)
    product.value = response.data
  } catch (err) {
    console.error(err)
    error.value = 'Product not found or failed to load.'
    product.value = null
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadProduct()
})
</script>

<style scoped>
.product-detail-image {
  transition: transform 0.3s ease-in-out;
}
.product-info {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.gap-3 { gap: 12px; }
</style>
