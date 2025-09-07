<template>
  <v-container
    class="fill-height d-flex justify-center align-center login-bg"
    fluid
  >
    <v-card width="400" elevation="10" class="pa-4">
      <v-card-title class="justify-center text-h5 font-weight-bold text-primary">
        Admin Login
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="login">
          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            prepend-inner-icon="mdi-email"
            variant="outlined"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            prepend-inner-icon="mdi-lock"
            variant="outlined"
            required
          ></v-text-field>

          <v-btn type="submit" :loading="loading" block color="primary" class="mt-4">
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
      email: "", // email
      password: "", // password
      loading: false // loading
    };
  },
  mounted() {
    if (localStorage.getItem("isAdmin") === "true") {
      this.$router.push({ name: "AdminDashboard" });
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
          localStorage.setItem("adminToken", response.data.token);

          this.$router.push({ name: "AdminDashboard" });
        } else {
          alert("Login failed: " + response.data.message);
          this.password = "";
        }
      } catch (error) {
        console.error(error);
        alert("Login failed. Check your credentials or server.");
        this.password = "";
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
/* Add background image */
.login-bg {
  background: url("https://media.istockphoto.com/id/2162485893/photo/security-expert-typing-in-password-to-access-secure-database-on-laptop.jpg?s=612x612&w=0&k=20&c=23Hk7ulnVC2Gl4LmbveZE8B_oXXd0PGAed8sXqti16w=")
    no-repeat center center fixed;
  background-size: cover;
}

/* Make card slightly transparent for readability */
.v-card {
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
}
</style>
