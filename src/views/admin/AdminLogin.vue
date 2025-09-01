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
      email: "",//email
      password: "",// password
      loading: false// loading
    };
  },
  mounted() {
    // Redirect if already logged in as admin
    if (localStorage.getItem("isAdmin") === "true") {
      this.$router.push({ name: "AdminDashboard" });
    }
  },
  methods: {
    async login() {
      if (!this.email || !this.password) return;// check

      this.loading = true;// loading

      try {
        const response = await axios.post("http://localhost:8000/api/admin/login", {
          email: this.email.trim(),// email trim
          password: this.password.trim()// password trim
        });// post

        if (response.data.success) {
          // Store token and admin data
          localStorage.setItem("isAdmin", "true");// admin
          localStorage.setItem("adminData", JSON.stringify(response.data.admin));// admin
          localStorage.setItem("adminToken", response.data.token);// token

          // Redirect to dashboard
          this.$router.push({ name: "AdminDashboard" });// navigate
        } else {
          alert("Login failed: " + response.data.message);// alert
          this.password = '';// password
        }
      } catch (error) {
        console.error(error);
        alert(" Login failed. Check your credentials or server.");// alert
        this.password = '';
      } finally {
        this.loading = false;// loading
      }
    }
  }
};
</script>
