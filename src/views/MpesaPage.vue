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
import { useCartStore } from "@/stores/cart";
import { computed, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  name: "MpesaPage",
  setup() {
    const cart = useCartStore();
    cart.loadCart(); // load cart from localStorage

    const router = useRouter();
    const phone = ref("");
    const message = ref("");
    const messageType = ref("success");
    const loading = ref(false);

    const totalPrice = computed(() =>
      cart.items && cart.items.length > 0
        ? cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
        : 0
    );

    const phoneRule = (value) => {
      const pattern = /^2547\d{8}$/;
      return (
        pattern.test(value) ||
        "Enter a valid M-Pesa number starting with 2547 (e.g., 254712345678)"
      );
    };

    const submitPayment = async () => {
      if (phoneRule(phone.value) !== true) {
        messageType.value = "error";
        message.value = " Please enter a valid phone number.";
        return;
      }

      if (totalPrice.value <= 0) {
        messageType.value = "error";
        message.value = " Cart is empty or total price is invalid.";
        return;
      }

      loading.value = true;
      message.value = "";

      try {
        // Trigger M-Pesa STK Push
        const stkResponse = await axios.post(
          "http://127.0.0.1:8000/api/mpesa/stkpush",
          { phone: phone.value, amount: totalPrice.value }
        );

        if (stkResponse.status === 200 && stkResponse.data.ResponseCode === "0") {
          // Payment request sent successfully
          messageType.value = "success";
          message.value =
            " Payment request sent! Check your phone to complete the transaction.";

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
            }
          });
        } else {
          messageType.value = "error";
          message.value = ` Payment request failed: ${
            stkResponse.data.ResponseDescription || "Unknown error"
          }`;
        }
      } catch (err) {
        console.error("Error details:", err.response?.data || err);
        messageType.value = "error";
        message.value = ` Payment failed: ${
          err.response?.data?.errors
            ? JSON.stringify(err.response.data.errors)
            : err.message
        }`;
      } finally {
        loading.value = false;
      }
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
    };
  },
};
</script>
