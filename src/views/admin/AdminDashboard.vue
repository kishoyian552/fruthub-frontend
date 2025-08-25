<template>
  <div>
    <h1 class="text-h4 font-weight-bold mb-6">Admin Dashboard</h1>
    <v-row>
      <v-col cols="12" md="4">
        <v-card class="pa-6 text-center">
          <h2>{{ productCount }}</h2>
          <p>Products</p>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="pa-6 text-center">
          <h2>{{ orderCount }}</h2>
          <p>Orders</p>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="pa-6 text-center">
          <h2>{{ userCount }}</h2>
          <p>Users</p>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AdminDashboard",
  data() {
    return {
      productCount: 0,
      orderCount: 0,
      userCount: 0,
    };
  },
  methods: {
    async fetchCounts() {
      try {
        // ✅ Get admin token
        const token = localStorage.getItem("adminToken");

        if (!token) {
          alert("You must be logged in as admin!");
          this.$router.push({ name: "AdminLogin" });
          return;
        }

        // ✅ Set headers for all requests
        const headers = { Authorization: `Bearer ${token}` };

        const [productsRes, ordersRes, usersRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/products", { headers }),
          axios.get("http://127.0.0.1:8000/api/orders", { headers }),
          axios.get("http://127.0.0.1:8000/api/users", { headers }),
        ]);

        this.productCount = productsRes.data.length;
        this.orderCount = ordersRes.data.length;
        this.userCount = usersRes.data.length;
      } catch (err) {
        console.error("Error fetching counts:", err.response?.data || err);
        alert("Failed to fetch admin dashboard data");
      }
    },
  },
  mounted() {
    this.fetchCounts();
  },
};
</script>
