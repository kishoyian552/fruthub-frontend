<template>
  <div class="dashboard-page"> <!-- background wrapper -->
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
      productCount: 0,//
      orderCount: 0,// Set counts
      userCount: 0,//
    };
  },
  methods: {
   // Fetch counts
    async fetchCounts() {
      try {
        // Get admin token
        const token = localStorage.getItem("adminToken");// admin

        if (!token) {
          alert("You must be logged in as admin!");// alert
          this.$router.push({ name: "AdminLogin" });// navigate
          return;
        }

        //  Set headers for all requests
        const headers = { Authorization: `Bearer ${token}` };

        const [productsRes, ordersRes, usersRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/products", { headers }),//GET PRODUCTS
          axios.get("http://127.0.0.1:8000/api/orders", { headers }),//GET ORDERS
          axios.get("http://127.0.0.1:8000/api/users", { headers }),//GET USERS
        ]);

        this.productCount = productsRes.data.length;// Set counts
        this.orderCount = ordersRes.data.length;// Set counts
        this.userCount = usersRes.data.length;// Set counts
      } catch (err) {
        console.error("Error fetching counts:", err.response?.data || err);// error
        alert("Failed to fetch admin dashboard data");// alert
      }
    },
  },

  mounted() {
    this.fetchCounts();
  },//Fetch counts of products, orders, and users when the component is mounted
};
</script>

<style scoped>
.dashboard-page {
  min-height: 100vh; /* full screen height */
  background-image: url("https://media.istockphoto.com/id/2204402496/photo/shopping-basket-full-of-products-with-smartphone-with-white-screen-online-food-ordering.jpg?s=612x612&w=0&k=20&c=tJr6q8kMikymWH-TYk9W_eZiTYpJhJdjm-Z-S15ugZU="); /* your image path */
  background-size: cover;
  background-position: center;
}
.v-card {
  background-color: rgba(255, 255, 255, 0.7); /* more transparent */
  border-radius: 12px;
}
</style>
