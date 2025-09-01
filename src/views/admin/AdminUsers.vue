<template>
  <div>
    <h1 class="text-h4 font-weight-bold mb-6">Manage Users</h1>

    <v-data-table
      :headers="headers"
      :items="users"
      class="elevation-1"
      :loading="loading"
      loading-text="Loading users..."
    >
      <template v-slot:item.actions="{ item }">
        <v-btn icon color="red" @click="deleteUser(item.id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from "axios";// axios

export default {
  name: "AdminUsers",
   
  data() {
    return {
      loading: false,
      users: [],
      headers: [
        { text: "ID", value: "id" },
        { text: "First Name", value: "first_name" },
        { text: "Last Name", value: "last_name" },
        { text: "Email", value: "email" },
        { text: "Phone", value: "phone" },
        { text: "Actions", value: "actions", sortable: false },
      ],// headers/headers for the table
    };// return
  },// Data for the users table
  methods: {
    async fetchUsers() {
      this.loading = true;
      try {
        const token = localStorage.getItem("adminToken"); // login
        if (!token) throw new Error("Admin not logged in");// error

        const res = await axios.get("http://127.0.0.1:8000/api/users", {
          headers: { Authorization: `Bearer ${token}` },// get
        });// get
        this.users = res.data;
      } catch (err) {
        console.error("Error fetching users:", err.response?.data || err);// error
        if (err.response?.status === 401) {
          alert("Admin not logged in. Please login again.");// alert
          this.$router.push({ name: "AdminLogin" });// navigate
        } else {
          alert("Failed to fetch users. Please try again.");// alert
        }
      } finally {
        this.loading = false;// loading
      }
    },

    async deleteUser(id) {
      if (!confirm("Are you sure you want to delete this user?")) return;// confirm
      try {
        const token = localStorage.getItem("adminToken");  // login
        if (!token) throw new Error("Admin not logged in");

        await axios.delete(`http://127.0.0.1:8000/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },// delete
        });
        this.fetchUsers();// Fetch users
      } catch (err) {
        console.error("Error deleting user:", err.response?.data || err);// error
        if (err.response?.status === 401) {
          alert("Admin not logged in. Please login again.");// alert
          this.$router.push({ name: "AdminLogin" });// navigate
        } else {
          alert("Failed to delete user. Please try again.");// alert
        } 
      }
    },
  },
    
   
  mounted() {
    this.fetchUsers();// Fetch users
  }, // it fetch all users from the API.
};
</script>
