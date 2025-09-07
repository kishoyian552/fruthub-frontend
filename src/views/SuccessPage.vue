<template>
  <div class="bg-container">
    <v-container class="fill-height d-flex justify-center align-center">
      <v-card class="pa-6 text-center success-card" elevation="10">
        <!-- Checkmark Icon -->
        <v-avatar size="150" class="mb-4 success-icon">
          <v-icon size="80" color="white">mdi-check</v-icon>
        </v-avatar>

        <!-- Success Message -->
        <h2 class="font-weight-bold">Payment Successful </h2>
        <p class="text-black-darken-1">
          Your payment has been successfully processed. Now you can go to the homepage & discover new products.
        </p>

        <!-- Continue Shopping Button -->
        <v-btn
          color="green"
          class="mt-4 px-6 py-3"
          rounded="lg"
          @click="goHome"
        >
          Continue shopping
        </v-btn>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "SuccessPage",
  methods: {
    goHome() {
      this.$router.push("/"); // Redirect to homepage
    },
  },
};
</script>

<style scoped>
/* Full-page background */
.bg-container {
  background-image: url("https://media.istockphoto.com/id/1945681430/photo/wide-composition-of-bright-fruits-vegetables-and-berries-isolated-on-white.jpg?s=612x612&w=0&k=20&c=XlKxs_8jEDsu2A4tS9tKfAOHbAG7GwcmPGVm_fh4R-w=");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  height: 100vh;   /* Full height */
  width: 100vw;    /* Full width */
  display: flex;   /* Make sure child centers well */
}
.success-card {
  max-width: 1000px;
  border-radius: 60px;
  background: rgba(255, 255, 255, 0.7); /* Transparent white */
  backdrop-filter: blur(6px);
}
.success-icon {
  background-color: #4caf50;
}
</style>
