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
        <v-btn color="green" @click="proceedToCheckout">
          Proceed to Checkout
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
import { useCartStore } from '@/stores/cart'
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const cart = useCartStore()
    const router = useRouter()

    // Load cart from localStorage on mount
    onMounted(() => {
      cart.loadCart()
    })

    // Total calculation
    const cartTotal = computed(() =>
      cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    )

    // Navigate to Mpesa page
    const proceedToCheckout = () => {
      router.push('/mpesa')
    }

    return {
      cart,
      cartTotal,
      proceedToCheckout
    }
  }
}
</script>
