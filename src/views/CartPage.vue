<template>
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
</template>

<script>
import { useCartStore } from '@/stores/cart'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
  setup() {
    const cart = useCartStore()
    const router = useRouter()

    // Total calculation
    const cartTotal = computed(() =>
      cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    )

    const placeOrder = async () => {
      try {
        const token = localStorage.getItem('authToken')
        const user = JSON.parse(localStorage.getItem('user') || '{}')

        if (!token || !user.id) {
          alert('Please login first!')
          router.push('/login')
          return
        }

        await axios.post(
          'http://127.0.0.1:8000/api/orders',
          {
            user_id: user.id,
            items: cart.items.map(item => ({
              product_id: item.id,
              quantity: item.quantity,
              price: item.price,
              total: item.price * item.quantity
            })),
            amount: cartTotal.value,
            status: 'pending'
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

      
        router.push('/mpesa')
      } catch (error) {
        console.error('Error placing order:', error.response?.data || error.message)
        alert(error.response?.data?.message || 'Failed to place order')
      }
    }

    return {
      cart,
      cartTotal,
      placeOrder
    }
  }
}
</script>
