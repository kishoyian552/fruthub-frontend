<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-card width="400">
      <v-card-title class="justify-center">Admin Login</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="login">
          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            required
          ></v-text-field>

          <v-btn type="submit" :loading="loading" block color="primary">
            Login
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "AdminLogin",
  data() {
    return {
      email: "",
      password: "",
      loading: false
    };
  },
  mounted() {
    // Redirect if already logged in as admin
    if (localStorage.getItem("isAdmin") === "true") {
      // Ensure the route exists before redirecting
      if (this.$router.hasRoute && this.$router.hasRoute("AdminDashboard")) {
        this.$router.push({ name: "AdminDashboard" });
      }
    }
  },
  methods: {
    async login() {
      if (!this.email || !this.password) return;

      this.loading = true;

      try {
        const response = await axios.post("http://localhost:8000/api/admin/login", {
          email: this.email.trim(),
          password: this.password.trim()
        });

        if (response.data.success) {
          localStorage.setItem("isAdmin", "true");
          localStorage.setItem("adminData", JSON.stringify(response.data.admin));

          // Redirect to dashboard using router name
          this.$router.push({ name: "AdminDashboard" });
        } else {
          alert("❌ " + response.data.message);
          this.password = '';
        }
      } catch (error) {
        console.error(error);
        alert("❌ Login failed. Please check your credentials or server.");
        this.password = '';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
