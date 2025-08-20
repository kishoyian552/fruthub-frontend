<template>
  <v-card class="ma-2" elevation="2">
    <!-- Product Image -->
    <v-img
      :src="product.image"
      height="200"
      cover
    >
      <template v-slot:placeholder>
        <v-row
          class="fill-height ma-0"
          align="center"
          justify="center"
        >
          <v-progress-circular indeterminate color="primary" />
        </v-row>
      </template>
    </v-img>

    <!-- Product Details -->
    <v-card-title class="text-h6">{{ product.name }}</v-card-title>
    <v-card-subtitle>ksh{{ product.price.toFixed(2) }}</v-card-subtitle>

    <v-card-text class="text-body-2">
      {{ product.description }}
    </v-card-text>

    <!-- Rating + Stock Info -->
    <v-card-actions class="d-flex justify-space-between">
      <div class="d-flex align-center">
        <v-icon size="18" color="amber">mdi-star</v-icon>
        <span class="ml-1">{{ product.rating }}</span>
        <span class="ml-1 grey--text">({{ product.reviews }})</span>
      </div>

      <v-chip
        :color="product.inStock ? 'green' : 'red'"
        size="small"
        variant="flat"
      >
        {{ product.inStock ? 'In Stock' : 'Out of Stock' }}
      </v-chip>
    </v-card-actions>
  </v-card>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>
