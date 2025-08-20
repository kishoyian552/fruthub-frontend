<template>
  <div>
    <h1 class="text-h4 font-weight-bold mb-6">Admin Dashboard</h1>
    <v-row>
      <v-col cols="12" md="4">
        <v-card class="pa-6 text-center">
          <h2>150</h2>
          <p>Products</p>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="pa-6 text-center">
          <h2>320</h2>
          <p>Orders</p>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="pa-6 text-center">
          <h2>75</h2>
          <p>Users</p>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "AdminDashboard",
};
</script>
