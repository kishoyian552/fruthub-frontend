<template>
  <div>
    <h1 class="text-h4 font-weight-bold mb-6">Manage Orders</h1>

    <v-data-table
      :headers="headers"
      :items="orders"
      class="elevation-1"
      :loading="loading"
      loading-text="Loading orders..."
    >
      <template v-slot:item.customer="{ item }">
        {{ item.user?.first_name }} {{ item.user?.last_name }}
      </template>

      <template v-slot:item.total="{ item }">
        KES {{ item.amount }}
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AdminOrders",
  data() {
    return {
      headers: [
        { text: "Order ID", value: "id" },
        { text: "Customer", value: "customer" },
        { text: "Total", value: "total" },
        { text: "Status", value: "status" },
      ],
      orders: [],
      loading: false,
    };
  },
  mounted() {
    this.fetchOrders();
  },
  methods: {
    async fetchOrders() {
      this.loading = true;

      try {
        const token = localStorage.getItem("adminToken"); // admin orders
        if (!token) {
          alert("Please login as admin first!");
          this.$router.push("/admin/login");
          return;
        }

        const response = await axios.get("http://127.0.0.1:8000/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });

        this.orders = response.data; // set real orders
      } catch (error) {
        console.error("Error fetching orders:", error.response?.data || error.message);
        alert("Failed to fetch orders");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
