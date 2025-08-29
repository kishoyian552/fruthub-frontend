<template>
  <div class="p-4 min-h-screen bg-white">
    <div>
      <h1 class="text-xl font-medium text-green-600 mb-4">Payment Successful</h1>

      <p class="text-base text-gray-600 mb-2">
        <strong>Phone:</strong> {{ phone || 'Not provided' }}
      </p>
      <p class="text-base text-gray-600 mb-4">
        <strong>Total Amount Paid:</strong> KES {{ amount || '0' }}
      </p>

      <h2 class="text-lg font-medium text-gray-600 mb-2">Ordered Items:</h2>
      <ul>
        <li v-for="item in items" :key="item.id" class="text-gray-600 mb-2">
          {{ item.name }} (x{{ item.quantity }}) — KES {{ item.price }}
        </li>
        <li v-if="!items.length" class="text-gray-500">No items found</li>
      </ul>
    </div>

    <!-- Simple right-aligned green button -->
    <div class="flex justify-end mt-4">
      <button
        @click="goHome"
        class="bg-green-600 text-white px-4 py-2 rounded-md font-medium hover:bg-green-700"
      >
        Go Back to Home
      </button>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";// For route and navigation
import axios from "axios";/// Axios for HTTP requests

export default {
  setup() {
    const route = useRoute();//
    const router = useRouter();// Router for navigation

    const phone = route.query.phone || "";// Phone number from query
    const amount = route.query.amount || 0;// Amount from query
    let items = [];// Items array

    try {
      items = JSON.parse(route.query.items || "[]");
    } catch (e) {
      console.error("Error parsing items", e);// Log parsing error
    }

    // Send each item as a separate order to the database
    const saveOrders = async () => {
      try {
        await axios.get("/sanctum/csrf-cookie");// Get csrf cookie for Laravel Sanctum
        for (const item of items) {
          const response = await axios.post(
            "/api/orders",// Backend endpoint to create order(not active for now) creates an error
            {
              product_id: item.id,
              amount: item.price * item.quantity,
              mpesa_receipt: route.query.mpesa_receipt || `MPESA_${Date.now()}`,// Use provided receipt or generate a dummy one
            },// Order data
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
              },// Authorization header with Bearer token
            }// Axios config
          );// Create order in backend (not active for now)
          console.log(`Order ${response.data.order.id} saved successfully`);
        }// Loop through items
      } catch (error) {
        console.error("Error saving orders:", error.response?.data || error.message);
      }// Log error for debugging
    };// Save orders function

    // Call saveOrders when component mounts
    saveOrders();// Save orders on mount

    const goHome = () => {
      router.push("/");// Navigate to home page
    };// Go home function

    return { phone, amount, items, goHome };
  },// End of setup
};// Export component
</script>