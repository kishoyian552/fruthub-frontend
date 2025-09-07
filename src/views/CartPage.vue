<template>
  <div class="cart-background">
    <v-container>
      <h1 class="mb-4">Your Cart</h1>

      <!-- If cart is empty -->
      <div v-if="cart.items.length === 0">
        <p>Your cart is empty.</p>
      </div>

      <!-- If cart has items -->
      <div v-else>
        <v-table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cart.items" :key="item.id">
              <td>{{ item.name }}</td>
              <td>KES {{ item.price }}</td>
              <td>{{ item.quantity }}</td>
              <td>KES {{ item.price * item.quantity }}</td>
              <td>
                <v-btn color="red" @click="cart.removeFromCart(item.id)">
                  Remove
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>

        <!-- Cart Total -->
        <div class="text-right mt-4">
          <h3>Total: KES {{ cartTotal }}</h3>
        </div>

        <!-- Proceed Button -->
        <div class="text-right mt-4">
          <v-btn color="green" @click="placeOrder">
            Proceed to Checkout
          </v-btn>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import { useCartStore } from '@/stores/cart'//useCartStore'
import { computed } from 'vue'// Vue Composition API
import { useRouter } from 'vue-router'// For navigation
import axios from 'axios'// Axios for HTTP requests

export default {
  setup() {
    const cart = useCartStore()//useCartStore: To access cart state and actions
    const router = useRouter()// For navigation

    // Total calculation
    const cartTotal = computed(() =>
      cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)// Calculate total price of items in cart
    )//

    const placeOrder = async () => {
      try {
        const token = localStorage.getItem('authToken')// Get auth token from localStorage
        const user = JSON.parse(localStorage.getItem('user') || '{}')// Get user info from localStorage

        if (!token || !user.id) {
          alert('Please login first!')// Alert if user is not logged in
          router.push('/login')
          return
        }

        await axios.post(
          'http://127.0.0.1:8000/api/orders',// Backend endpoint to create order
          {
            user_id: user.id,
            items: cart.items.map(item => ({
              product_id: item.id,
              quantity: item.quantity,
              price: item.price,
              total: item.price * item.quantity
            })),// Prepare order items
            amount: cartTotal.value,
            status: 'pending'
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }// Authorization header with Bearer token
          }
        )//Create order in backend

        router.push('/mpesa')// Navigate to M-Pesa payment page
      } catch (error) {
        console.error('Error placing order:', error.response?.data || error.message)// Log error for debugging
        alert(error.response?.data?.message || 'Failed to place order')
      }// Handle errors appropriately
    }

    return {
      cart,
      cartTotal,
      placeOrder
    }// Return reactive properties and methods to the template
  }
}// Export the component
</script>

<style scoped>
.cart-background {
  background-image: url('https://media.istockphoto.com/id/1359111636/photo/background-shopping-bag-with-fruits-and-vegetables-on-white-table.jpg?s=612x612&w=0&k=20&c=lJensPJAIt6uBOdSKm2KmokXIN0NjNBExyk55aIxH6I='); /* 🔹 Replace with your image path */
  background-size: cover;
  background-position: center;
  min-height: 100vh; /* Full screen */
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 40px; /* Push content down a bit */
}
.v-table {
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
}
</style>
