<template>
  <v-footer
    color="primary"
    class="text-white mt-12"
  >
    <v-container>
      <v-row>
        <!-- Company Info -->
        <v-col cols="12" md="4" class="mb-4">
          <h3 class="text-h6 font-weight-bold mb-3">
            <v-icon>mdi-fruit-pineapple</v-icon>
            FruitHub
          </h3>
          <p class="text-body-2 mb-3">
            Your trusted source for fresh, organic fruits delivered directly to your door.
            Quality, freshness, and customer satisfaction guaranteed.
          </p>
          <div class="d-flex">
            <v-btn
              icon
              variant="text"
              color="white"
              href="https://facebook.com"
              target="_blank"
              class="mr-2"
            >
              <v-icon>mdi-facebook</v-icon>
            </v-btn>
            <v-btn
              icon
              variant="text"
              color="white"
              href="https://instagram.com"
              target="_blank"
              class="mr-2"
            >
              <v-icon>mdi-instagram</v-icon>
            </v-btn>
            <v-btn
              icon
              variant="text"
              color="white"
              href="https://wa.me/1234567890"
              target="_blank"
            >
              <v-icon>mdi-whatsapp</v-icon>
            </v-btn>
          </div>
        </v-col>

        <!-- Quick Links -->
        <v-col cols="12" md="4" class="mb-4">
          <h4 class="text-subtitle-1 font-weight-bold mb-3">Quick Links</h4>
          <div class="d-flex flex-column">
            <a
              href="#"
              @click.prevent="handleNavigation('/products')"
              class="text-white text-decoration-none mb-2 text-body-2"
            >
              All Products
            </a>
            <a
              href="#"
              @click.prevent="handleNavigation('/cart')"
              class="text-white text-decoration-none mb-2 text-body-2"
            >
              Shopping Cart
            </a>
            <a
              href="#"
              @click.prevent="handleNavigation('/about')"
              class="text-white text-decoration-none mb-2 text-body-2"
            >
              About Us
            </a>
            <a
              href="#"
              @click.prevent="handleNavigation('/contact')"
              class="text-white text-decoration-none mb-2 text-body-2"
            >
              Contact
            </a>

            <a
              href="#"
              @click.prevent="goToAdminLogin"
              class="text-white text-decoration-none mb-2 text-body-2"
            >
              Admin
            </a>
          </div>
        </v-col>

        <!-- Partners -->
        <v-col cols="12" md="4" class="mb-4">
          <h4 class="text-subtitle-1 font-weight-bold mb-3">Our Partners</h4>
          <div class="d-flex flex-wrap align-center">
            <v-chip
              variant="outlined"
              color="white"
              class="ma-1"
              size="small"
            >
              Organic Farms Co.
            </v-chip>
            <v-chip
              variant="outlined"
              color="white"
              class="ma-1"
              size="small"
            >
              Fresh Direct
            </v-chip>
            <v-chip
              variant="outlined"
              color="white"
              class="ma-1"
              size="small"
            >
              Green Valley
            </v-chip>
            <v-chip
              variant="outlined"
              color="white"
              class="ma-1"
              size="small"
            >
              Farm Fresh
            </v-chip>
          </div>
        </v-col>
      </v-row>

      <v-divider class="my-4" color="white" opacity="0.3"></v-divider>
      
      <v-row class="align-center">
        <v-col cols="12" md="6">
          <p class="text-body-2 mb-0">
            © {{ currentYear }} FruitHub. All Rights Reserved.
          </p>
        </v-col>
        <v-col cols="12" md="6" class="text-md-right">
          <p class="text-body-2 mb-0">
            Privacy Policy | Terms of Service | Support
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Get current year
const currentYear = computed(() => new Date().getFullYear())

// Navigate to pages
const handleNavigation = (path) => {
  router.push(path)
}

// Admin link forces login
const goToAdminLogin = () => {
  localStorage.removeItem('isAdmin')
  localStorage.removeItem('adminData')
  router.push('/admin/login')
}
</script>

<style scoped>
a:hover {
  text-decoration: underline !important;
}

.v-btn--icon {
  transition: transform 0.2s ease;
}

.v-btn--icon:hover {
  transform: scale(1.1);
}
</style>
