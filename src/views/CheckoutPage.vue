<template>
  <v-container class="my-8">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h3 font-weight-bold text-primary mb-6">Checkout</h1>
      </v-col>
    </v-row>

    <v-form @submit.prevent="processCheckout" ref="checkoutForm">
      <v-row>
        <!-- Checkout Form -->
        <v-col cols="12" lg="8">
          <!-- Shipping Information -->
          <v-card elevation="2" class="mb-6">
            <v-card-title class="bg-primary text-white">
              <h3>Shipping Information</h3>
            </v-card-title>

            <v-card-text class="pa-6">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="shippingData.firstName"
                    label="First Name"
                    :rules="nameRules"
                    variant="outlined"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="shippingData.lastName"
                    label="Last Name"
                    :rules="nameRules"
                    variant="outlined"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-text-field
                v-model="shippingData.email"
                label="Email"
                type="email"
                :rules="emailRules"
                variant="outlined"
                class="mb-3"
                required
              ></v-text-field>

              <v-text-field
                v-model="shippingData.phone"
                label="Phone Number"
                :rules="phoneRules"
                variant="outlined"
                class="mb-3"
                required
              ></v-text-field>

              <v-text-field
                v-model="shippingData.street"
                label="Street Address"
                :rules="addressRules"
                variant="outlined"
                class="mb-3"
                required
              ></v-text-field>

              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="shippingData.city"
                    label="City"
                    :rules="cityRules"
                    variant="outlined"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="shippingData.state"
                    label="State"
                    :rules="stateRules"
                    variant="outlined"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="shippingData.zipCode"
                    label="ZIP Code"
                    :rules="zipRules"
                    variant="outlined"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-select
                v-model="shippingData.country"
                :items="countries"
                label="Country"
                :rules="countryRules"
                variant="outlined"
                required
              ></v-select>
            </v-card-text>
          </v-card>

          <!-- Payment Information -->
          <v-card elevation="2" class="mb-6">
            <v-card-title class="bg-secondary text-white">
              <h3>Payment Information</h3>
            </v-card-title>

            <v-card-text class="pa-6">
              <v-radio-group
                v-model="paymentMethod"
                :rules="paymentRules"
                required
              >
                <v-radio
                  label="Credit/Debit Card"
                  value="card"
                ></v-radio>
                <v-radio
                  label="PayPal"
                  value="paypal"
                ></v-radio>
                <v-radio
                  label="Cash on Delivery"
                  value="cod"
                ></v-radio>
              </v-radio-group>

              <!-- Credit Card Fields -->
              <div v-if="paymentMethod === 'card'">
                <v-text-field
                  v-model="cardData.number"
                  label="Card Number"
                  :rules="cardNumberRules"
                  variant="outlined"
                  placeholder="1234 5678 9012 3456"
                  class="mb-3"
                  required
                ></v-text-field>

                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="cardData.expiry"
                      label="Expiry Date"
                      :rules="expiryRules"
                      variant="outlined"
                      placeholder="MM/YY"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="cardData.cvv"
                      label="CVV"
                      :rules="cvvRules"
                      variant="outlined"
                      placeholder="123"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-text-field
                  v-model="cardData.name"
                  label="Name on Card"
                  :rules="nameRules"
                  variant="outlined"
                  required
                ></v-text-field>
              </div>

              <!-- PayPal Message -->
              <v-alert
                v-else-if="paymentMethod === 'paypal'"
                type="info"
                variant="outlined"
                class="mt-4"
              >
                You will be redirected to PayPal to complete your payment.
              </v-alert>

              <!-- Cash on Delivery Message -->
              <v-alert
                v-else-if="paymentMethod === 'cod'"
                type="warning"
                variant="outlined"
                class="mt-4"
              >
                You will pay in cash when your order is delivered. Additional charges may apply.
              </v-alert>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Order Summary -->
        <v-col cols="12" lg="4">
          <v-card elevation="2" class="sticky-top">
            <v-card-title class="bg-accent text-white">
              <h3>Order Summary</h3>
            </v-card-title>

            <v-card-text class="pa-4">
              <!-- Order Items -->
              <div class="mb-4">
                <h4 class="text-subtitle-1 font-weight-bold mb-3">Items ({{ mockCartItems.length }})</h4>
                <div
                  v-for="item in mockCartItems"
                  :key="item.id"
                  class="d-flex align-center mb-2"
                >
                  <v-avatar size="40" rounded class="mr-3">
                    <v-img :src="item.image" cover></v-img>
                  </v-avatar>
                  <div class="flex-grow-1">
                    <div class="text-body-2 font-weight-medium">{{ item.name }}</div>
                    <div class="text-caption text-grey">Qty: {{ item.quantity }}</div>
                  </div>
                  <div class="text-body-2 font-weight-bold">
                    ${{ (item.price * item.quantity).toFixed(2) }}
                  </div>
                </div>
              </div>

              <v-divider class="mb-4"></v-divider>

              <!-- Order Totals -->
              <div class="d-flex justify-space-between mb-2">
                <span>Subtotal:</span>
                <span class="font-weight-bold">${{ subtotal.toFixed(2) }}</span>
              </div>

              <div class="d-flex justify-space-between mb-2">
                <span>Shipping:</span>
                <span class="font-weight-bold">
                  {{ subtotal >= 50 ? 'FREE' : '$5.99' }}
                </span>
              </div>

              <div class="d-flex justify-space-between mb-2">
                <span>Tax:</span>
                <span class="font-weight-bold">${{ (subtotal * 0.08).toFixed(2) }}</span>
              </div>

              <v-divider class="my-3"></v-divider>

              <div class="d-flex justify-space-between mb-4">
                <span class="text-h6 font-weight-bold">Total:</span>
                <span class="text-h6 font-weight-bold text-primary">
                  ${{ orderTotal.toFixed(2) }}
                </span>
              </div>

              <!-- Place Order Button -->
              <v-btn
                color="primary"
                variant="flat"
                size="large"
                block
                type="submit"
                :loading="isProcessing"
                :disabled="mockCartItems.length === 0"
              >
                <v-icon start>mdi-check</v-icon>
                Place Order
              </v-btn>

              <div class="text-center mt-3">
                <small class="text-grey">
                  By placing an order, you agree to our Terms of Service
                </small>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-form>

    <!-- Success Dialog -->
    <v-dialog v-model="showSuccessDialog" max-width="500" persistent>
      <v-card>
        <v-card-title class="text-center bg-success text-white">
          <v-icon size="large" class="mr-2">mdi-check-circle</v-icon>
          Order Placed Successfully!
        </v-card-title>
        <v-card-text class="text-center pa-6">
          <h3 class="text-h5 mb-3">Thank you for your order!</h3>
          <p class="text-body-1 mb-4">
            Your order #{{ orderNumber }} has been placed successfully. 
            You will receive a confirmation email shortly.
          </p>
          <p class="text-body-2 text-grey">
            Estimated delivery: 2-3 business days
          </p>
        </v-card-text>
        <v-card-actions class="justify-center pb-6">
          <v-btn
            color="primary"
            variant="flat"
            @click="goHome"
          >
            Continue Shopping
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Error Snackbar -->
    <v-snackbar
      v-model="showError"
      color="error"
      timeout="5000"
    >
      {{ errorMessage }}
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
// import { checkoutApi } from '@/services/api'

const router = useRouter()

const checkoutForm = ref()
const isProcessing = ref(false)
const showSuccessDialog = ref(false)
const showError = ref(false)
const errorMessage = ref('')
const orderNumber = ref('')

// Mock cart items for testing (replace with real cart store later)
const mockCartItems = ref([
  {
    id: 1,
    name: 'Fresh Apples',
    price: 3.99,
    quantity: 2,
    image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 2,
    name: 'Organic Bananas',
    price: 2.49,
    quantity: 1,
    image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
])

const shippingData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  street: '',
  city: '',
  state: '',
  zipCode: '',
  country: 'United States'
})

const cardData = reactive({
  number: '',
  expiry: '',
  cvv: '',
  name: ''
})

const paymentMethod = ref('card')

const countries = ['United States', 'Canada', 'United Kingdom', 'Australia']

// Computed values
const subtotal = computed(() => {
  return mockCartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0)
})

const orderTotal = computed(() => {
  const shipping = subtotal.value >= 50 ? 0 : 5.99
  const tax = subtotal.value * 0.08
  return subtotal.value + shipping + tax
})

// Validation rules
const nameRules = [
  (v) => !!v || 'This field is required',
  (v) => v.length >= 2 || 'Must be at least 2 characters'
]

const emailRules = [
  (v) => !!v || 'Email is required',
  (v) => /.+@.+\..+/.test(v) || 'Email must be valid'
]

const phoneRules = [
  (v) => !!v || 'Phone number is required',
  (v) => /^[\+]?[\d\s\-\(\)]+$/.test(v) || 'Phone number must be valid'
]

const addressRules = [
  (v) => !!v || 'Address is required',
  (v) => v.length >= 5 || 'Address must be at least 5 characters'
]

const cityRules = [
  (v) => !!v || 'City is required'
]

const stateRules = [
  (v) => !!v || 'State is required'
]

const zipRules = [
  (v) => !!v || 'ZIP code is required',
  (v) => /^\d{5}(-\d{4})?$/.test(v) || 'ZIP code must be valid (e.g., 12345 or 12345-6789)'
]

const countryRules = [
  (v) => !!v || 'Country is required'
]

const paymentRules = [
  (v) => !!v || 'Payment method is required'
]

const cardNumberRules = [
  (v) => {
    if (paymentMethod.value !== 'card') return true
    return !!v || 'Card number is required'
  },
  (v) => {
    if (paymentMethod.value !== 'card') return true
    return /^\d{16}$/.test(v.replace(/\s/g, '')) || 'Card number must be 16 digits'
  }
]

const expiryRules = [
  (v) => {
    if (paymentMethod.value !== 'card') return true
    return !!v || 'Expiry date is required'
  },
  (v) => {
    if (paymentMethod.value !== 'card') return true
    return /^(0[1-9]|1[0-2])\/\d{2}$/.test(v) || 'Expiry date must be MM/YY format'
  }
]

const cvvRules = [
  (v) => {
    if (paymentMethod.value !== 'card') return true
    return !!v || 'CVV is required'
  },
  (v) => {
    if (paymentMethod.value !== 'card') return true
    return /^\d{3,4}$/.test(v) || 'CVV must be 3 or 4 digits'
  }
]

const processCheckout = async () => {
  const { valid } = await checkoutForm.value.validate()
  
  if (!valid) {
    errorMessage.value = 'Please fill in all required fields correctly'
    showError.value = true
    return
  }

  if (mockCartItems.value.length === 0) {
    errorMessage.value = 'Your cart is empty'
    showError.value = true
    return
  }

  isProcessing.value = true

  try {
    const checkoutData = {
      items: mockCartItems.value,
      total: orderTotal.value,
      shippingAddress: {
        street: shippingData.street,
        city: shippingData.city,
        state: shippingData.state,
        zipCode: shippingData.zipCode,
        country: shippingData.country
      },
      paymentMethod: paymentMethod.value
    }

    // const response = await checkoutApi.processCheckout(checkoutData)
    const reponse ={};
    
    // Generate a mock order number for demo
    orderNumber.value = `FH${Date.now().toString().slice(-6)}`
    
    // Clear mock cart and show success
    mockCartItems.value = []
    showSuccessDialog.value = true

  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Failed to process order. Please try again.'
    showError.value = true
  } finally {
    isProcessing.value = false
  }
}

const goHome = () => {
  showSuccessDialog.value = false
  router.push('/')
}
</script>

<style scoped>
.sticky-top {
  position: sticky;
  top: 80px;
}
</style>