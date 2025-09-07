<template>
  <v-container fluid class="pa-0" style="background-color: #046924; color: #ffffff;">
    <!-- App Header -->
    

    <!-- Fruit Carousel -->
    <v-carousel
      cycle
      hide-delimiters
      :show-arrows="true"
      height="500"
      class="mb-12 animate__animated animate__fadeIn"
    >
      <v-carousel-item
        v-for="(item, index) in carouselItems"
        :key="index"
        :src="item.src"
        cover
      >
        <v-row class="fill-height" align="center" justify="center">
          <v-col class="text-center">
            <h2 class="text-h3 font-weight-bold mb-4 animate__animated animate__zoomIn" style="color: #ffffff; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);">
              {{ item.title }}
            </h2>
            <p class="text-h5" style="color: #ffffff; text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);">
              {{ item.description }}
            </p>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- Our Story Section with Glassmorphism and Slide-In Animation -->
    <v-container fluid class="py-16 glass-card animate__animated animate__slideInLeft animate__delay-1s">
      <v-row justify="center">
        <v-col cols="12" md="8" class="text-center">
          <h1 class="text-h3 font-weight-bold mb-6" style="font-size: 38px;">
            Our Story
          </h1>
          <p class="text-h5 font-weight-medium" style="line-height: 1.8;">
            Fruithub was born to bring the freshest, organic fruits from farms to your table. Our passion is delivering vibrant, natural flavors with every order, supporting local farmers and sustainable practices.
          </p>
        </v-col>
      </v-row>
    </v-container>

    <!-- Mission Section with Parallax Background and Fade-In Animation -->
    <v-container fluid class="py-16 parallax-section animate__animated animate__fadeIn animate__delay-2s" style="background-image: url('https://media.istockphoto.com/id/2186457342/photo/fresh-raw-vegetables-and-fruits.jpg?s=612x612&w=0&k=20&c=mNDXtsV-E4RiXpI96LeweQQfMZJzDVvd7oiLN0Nkbp0='); background-attachment: fixed; background-size: cover; color: black;">
      <v-row justify="center">
        <v-col cols="12" md="8" class="text-center">
          <h1 class="text-h3 font-weight-bold mb-6" style="font-size: 36px;">
            Our Mission
          </h1>
          <p class="text-h5 font-weight-medium" style="line-height: 1.8;">
            To deliver the freshest fruits with speed and care, promoting healthy living and supporting sustainable farming communities.
          </p>
        </v-col>
      </v-row>
    </v-container>

    <!-- Services Section with Hover Effects and Staggered Animations -->
    <v-container fluid class="py-16" style="background-color: #046924;">
      <h2 class="text-h4 font-weight-bold mb-12 text-center animate__animated animate__zoomIn animate__delay-1s">Our Services</h2>
      <v-row justify="center" align="stretch">
        <v-col
          v-for="(service, index) in services"
          :key="service.title"
          cols="12"
          sm="6"
          md="3"
        >
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              v-bind="props"
              class="pa-6 text-center glass-card"
              :elevation="isHovering ? 12 : 4"
              style="transition: transform 0.3s ease, box-shadow 0.3s ease;"
              :style="{ transform: isHovering ? 'scale(1.05)' : 'scale(1)' }"
              :class="`animate__animated animate__slideInUp animate__delay-${index + 1}s`"
            >
              <v-icon size="48" class="mb-4 fruit-bounce" :color="service.color">{{ service.icon }}</v-icon>
              <h3 class="text-h6 font-weight-bold mb-2">{{ service.title }}</h3>
              <p>{{ service.description }}</p>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>

    <!-- Advantages Section with Animated Cards -->
    <v-container fluid class="py-16" style="background-color: #046924;">
      <h2 class="text-h4 font-weight-bold mb-12 text-center animate__animated animate__zoomIn animate__delay-1s">Why Choose Fruithub</h2>
      <v-row justify="center">
        <v-col
          v-for="(advantage, index) in advantages"
          :key="advantage.title"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card
            class="pa-6 text-center glass-card"
            elevation="4"
            :class="`animate__animated animate__fadeIn animate__delay-${index + 1}s`"
          >
            <v-icon size="48" class="mb-4 fruit-bounce" :color="advantage.color">{{ advantage.icon }}</v-icon>
            <h3 class="text-h6 font-weight-bold mb-2">{{ advantage.title }}</h3>
            <p>{{ advantage.description }}</p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'// Vue Composition API
import { useRouter } from 'vue-router'//// For navigation
import AppHeader from '@/components/AppHeader.vue'

const router = useRouter()// Vue Router instance

function goToExplore() {
  router.push({ name: 'Explore' })//Navigate to Explore page (not implemented yet)
}

// Carousel Items with Fruit Images
const carouselItems = ref([
  {
    src: 'https://media.istockphoto.com/id/641708312/photo/fresh-organic-vegetables-and-fruits-on-shelf-in-supermarket-farmers-market-healthy-food.jpg?s=612x612&w=0&k=20&c=W3HM6OABmSVFyMgTR8BV3FayZUsfvHqNyPNKSstucIk=',
    title: 'Juicy fruits',
    description: 'Savor the sweetness of our farm-fresh mangoes.'
  },
  {
    src: 'https://media.istockphoto.com/id/182188154/photo/cornucopia-with-fresh-fruits-and-vegetables-isolated-on-white.jpg?s=612x612&w=0&k=20&c=GZyVF1AvcZChU7LYakjqgghSgZXGtII8hMu4seenRMo=',
    title: ' fresh fruits',
    description: 'A basket of fresh fruits for your next meal.'
  },
  {
    src: 'https://images.pexels.com/photos/209339/pexels-photo-209339.jpeg',
    title: 'Crisp Apples',
    description: 'Hand-picked apples bursting with flavor.'
  }
])

// Services Section
const services = [
  { title: 'Fresh Delivery', description: 'Same-day delivery of farm-fresh fruits', icon: 'mdi-truck-fast', color: '#a5d6a7' },// Light green
  { title: 'Organic Certified', description: '100% organic fruits from trusted farms', icon: 'mdi-leaf', color: '#81c784' },// Medium green
  { title: 'Gift Baskets', description: 'Custom fruit baskets for any occasion', icon: 'mdi-gift', color: '#66bb6a' },// Darker green
  { title: 'Customer Care', description: '24/7 support for your fruit orders', icon: 'mdi-headset', color: '#4caf50' },// Dark green
]

// Advantages Section
const advantages = [
  { title: 'Premium Quality', description: 'Hand-selected fruits for maximum freshness', icon: 'mdi-star', color: '#a5d6a7' },
  { title: 'Eco-Friendly', description: 'Sustainable packaging and farming practices', icon: 'mdi-earth', color: '#a5d6a7' },
  { title: 'Fast Delivery', description: 'Get your fruits delivered fresh and fast', icon: 'mdi-truck', color: '#a5d6a7' },
]// Light green
</script>

<style scoped>
.hero-section {
  background: linear-gradient(45deg, '#EE9003FF', #66bb6a);/* Green gradient */
  background-size: 200% 200%;/* Larger background for animation */
  animation: gradientAnimation 1s ease infinite;/* Faster animation for a more dynamic effect */
}

@keyframes gradientAnimation {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(200px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
}/* Glassmorphism card style */

.parallax-section {
  position: relative;
  overflow: hidden;
}/* Parallax effect container */

/* Custom Fruit Bounce Animation */
.fruit-bounce {
  display: inline-block;
  animation: fruitBounce 2s ease infinite;
}/* Apply bounce animation to fruit icons */

@keyframes fruitBounce {
  0%, 100% { transform: translateY(0); }/* Start and end at original position */
  50% { transform: translateY(-10px); }/* Move up by 10px at the midpoint */
}/* Smooth up-and-down bounce effect */

.text-center {
  text-align: center;
}/* Center text alignment */

.font-weight-bold {
  font-weight: bold;
}/* Bold font weight */

/*  animate.css  included */
@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';/* Import animate.css for animations */
</style>