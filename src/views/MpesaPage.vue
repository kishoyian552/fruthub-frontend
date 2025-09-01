<template>
  <v-container class="py-10">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card class="pa-6" elevation="6">
          <h2 class="text-center mb-4">Pay with M-Pesa</h2>

          <!-- Cart Summary -->
          <v-list v-if="cart.items && cart.items.length > 0">
            <v-list-item v-for="item in cart.items" :key="item.id">
              <v-list-item-title>
                {{ item.name }} (x{{ item.quantity }})
              </v-list-item-title>
              <v-list-item-subtitle>
                KES {{ item.price * item.quantity }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>

          <v-alert
            v-else
            type="warning"
            class="mt-4"
            border="start"
            elevation="2"
          >
            Your cart is empty. Add items to proceed.
          </v-alert>

          <h3 class="mt-4">Total: KES {{ totalPrice }}</h3>

          <!-- Phone Input -->
          <v-text-field
            v-model="phone"
            label="Enter your M-Pesa phone number (e.g., 254712345678)"
            :rules="[phoneRule]" 
            outlined
            class="mt-4" 
          />

          <!-- Pay Button -->
          <v-btn
            color="green"
            class="mt-4"
            block
            :loading="loading"
            :disabled="totalPrice <= 0 || loading"
            @click="submitPayment"
          >
            Pay Now
          </v-btn>

          <!-- Feedback Message -->
          <v-alert
            v-if="message"
            :type="messageType"
            class="mt-4"
            border="start"
            elevation="2"
          >
            {{ message }}
          </v-alert>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useCartStore } from "@/stores/cart";//useCartStore: To access cart state and actions.
import { computed, ref } from "vue"; //Ref: For reactive variables.
import axios from "axios"; //Axios: For HTTP requests to the M-Pesa API.
import { useRouter } from "vue-router";//useRouter: For navigation after payment.

export default {
  name: "MpesaPage",
  setup() {
    const cart = useCartStore();// Access the cart store
    cart.loadCart(); // load cart from localStorage

    const router = useRouter();// For navigation
    const phone = ref("");// User's phone number input
    const message = ref("");// Feedback message to user
    const messageType = ref("success");// success or error
    const loading = ref(false);// Loading state for the payment button

    const totalPrice = computed(() =>
      cart.items && cart.items.length > 0
        ? cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)//Calculates the total price of items in the cart by summing up the product of price and quantity for each item.
        : 0
    );// If cart is empty, total price is 0

    const phoneRule = (value) => {
      const pattern = /^2547\d{8}$/;//Uses a regex pattern to validate that the phone number starts with "2547" followed by 8 digits.
      return (
        pattern.test(value) ||
        "Enter a valid M-Pesa number starting with 2547 (e.g., 254712345678)"
      );// Returns true if valid, otherwise returns an error message.
    };

    const submitPayment = async () => {
      if (phoneRule(phone.value) !== true) {
        messageType.value = "error";
        message.value = " Please enter a valid phone number.";
        return;// If phone number is invalid
      }// Validate phone number format

      if (totalPrice.value <= 0) {
        messageType.value = "error";
        message.value = " Cart is empty or total price is invalid.";// If cart is empty or total price is invalid
        return;
      }// Ensure cart is not empty

      loading.value = true;// Start loading
      message.value = "";// Clear previous messages

      try {
        // Trigger M-Pesa STK Push
        const stkResponse = await axios.post(
          "http://127.0.0.1:8000/api/mpesa/stkpush",// backend endpoint
          { phone: phone.value, amount: totalPrice.value }// Send phone and amount to backend
        );//

        if (stkResponse.status === 200 && stkResponse.data.ResponseCode === "0") {
          // Payment request sent successfully
          messageType.value = "success";// Set message type to success
          message.value =
            " Payment request sent! Check your phone to complete the transaction.";// Inform user to check phone

          // Save cart items to pass to Success page
          const savedItems = [...cart.items];

          // Clear cart
          cart.clearCart();

          // Redirect to Success page
          router.push({
            name: "SuccessPage",
            query: {
              phone: phone.value,
              amount: totalPrice.value,
              items: JSON.stringify(savedItems)
            }// Pass phone, amount, and items as query parameters
          });// Navigate to SuccessPage with relevant data
        } else {
          messageType.value = "error";
          message.value = ` Payment request failed: ${
            stkResponse.data.ResponseDescription || "Unknown error"
          }`;// Set error message
        }// Handle non-successful response from M-Pesa API
      } catch (err) {
        console.error("Error details:", err.response?.data || err);// Log full error details for debugging
        messageType.value = "error";
        message.value = ` Payment failed: ${
          err.response?.data?.errors
            ? JSON.stringify(err.response.data.errors) // Show detailed errors if available
            : err.message
        }`;
      } finally {
        loading.value = false;
      }// finally block ensures loading state is reset regardless of success or failure
    };

    return {
      cart,
      phone,
      message,
      messageType,
      phoneRule,
      submitPayment,
      totalPrice,
      loading,
    };// Return all reactive variables and methods to the template
  },// End of setup function
};
</script>

