<template>
  <v-carousel
    height="400"
    cycle
    interval="5000"
    show-arrows="hover"
    hide-delimiter-background
    class="fruit-carousel"
  >
    <v-carousel-item
      v-for="(item, index) in carouselItems"
      :key="index"
      :src="item.image"
      cover
    >
      <div class="carousel-overlay d-flex align-center justify-center">
        <v-container>
          <v-row class="text-center">
            <v-col cols="12">
              <h1 class="text-h2 font-weight-bold text-white mb-4">
                {{ item.title }}
              </h1>
              <p class="text-h6 text-white mb-6">
                {{ item.subtitle }}
              </p>
              <v-btn
                color="white"
                variant="flat"
                size="large"
                @click="handleShopNow"
                class="px-8"
              >
                Shop Now
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-carousel-item>
  </v-carousel>
</template>

<script setup>
import { ref } from 'vue'

const handleShopNow = () => {
  // Scroll to products section or navigate
  const section = document.getElementById('products')
  if (section) section.scrollIntoView({ behavior: 'smooth' })
}

const carouselItems = ref([
  {
    title: 'Fresh Organic Fruits',
    subtitle: 'Delivered directly from farm to your door',
    image: 'https://images.pexels.com/photos/4198023/pexels-photo-4198023.jpeg?auto=compress&cs=tinysrgb&w=1200' // Fruit in basket
  },
  {
    title: 'Sweet and Juicy',
    subtitle: 'Perfectly ripened fruits for every bite',
    image: 'https://images.pexels.com/photos/4198011/pexels-photo-4198011.jpeg?auto=compress&cs=tinysrgb&w=1200' // Fruits in wooden plate
  },
  {
    title: 'Colorful Variety',
    subtitle: 'Taste the rainbow of nature’s best',
    image: 'https://images.pexels.com/photos/209339/pexels-photo-209339.jpeg?auto=compress&cs=tinysrgb&w=1200' // Fruit mix
  }
])
</script>

<style scoped>
.carousel-overlay {
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4));
  height: 100%;
  width: 100%;
}

.fruit-carousel :deep(.v-carousel__controls) {
  background: rgba(0, 0, 0, 0.2);
}
</style>
