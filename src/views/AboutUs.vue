<template>
  <div class="about-background">
    <v-container>
      <!-- Header -->
      <v-row justify="center" class="mb-12">
        <v-col cols="12" md="8" class="text-center">
          <h1 class="page-title mb-6">About Fruithub</h1>
          <p class="intro-text">
            At <strong>Fruithub</strong>, we believe fresh fruits bring health, happiness, and energy to life.  
            That’s why we work hard to connect you with the freshest, organic fruits, sourced from trusted farmers, and delivered straight to your door.
          </p>
        </v-col>
      </v-row>

      <!-- Mission and Vision -->
      <v-row class="mb-14">
        <v-col cols="12" md="6">
          <v-card elevation="4" class="pa-8 rounded-xl h-100 glass-card">
            <h2 class="section-title mb-4"> Our Mission</h2>
            <p>
              To make healthy living simple and accessible by delivering premium-quality, fresh fruits to your family, while supporting local farmers and eco-friendly practices.
            </p>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card elevation="4" class="pa-8 rounded-xl h-100 glass-card">
            <h2 class="section-title mb-4">Our Vision</h2>
            <p>
              To become your go-to hub for everything fruity — blending technology, freshness, and sustainability to create a healthier future for communities everywhere.
            </p>
          </v-card>
        </v-col>
      </v-row>

      <!-- Core Values -->
      <v-row class="mb-14" justify="center">
        <v-col cols="12" md="4" class="mb-6">
          <v-card elevation="3" class="pa-8 text-center rounded-xl h-100 glass-card">
            <v-icon size="50" color="green">mdi-leaf</v-icon>
            <h3 class="value-title mt-4">Eco-Friendly</h3>
            <p>Sustainable packaging and responsible farming practices to protect our planet.</p>
          </v-card>
        </v-col>

        <v-col cols="12" md="4" class="mb-6">
          <v-card elevation="3" class="pa-8 text-center rounded-xl h-100 glass-card">
            <v-icon size="50" color="orange">mdi-star</v-icon>
            <h3 class="value-title mt-4">Premium Quality</h3>
            <p>Only the best hand-selected fruits for maximum taste, freshness, and nutrition.</p>
          </v-card>
        </v-col>

        <v-col cols="12" md="4" class="mb-6">
          <v-card elevation="3" class="pa-8 text-center rounded-xl h-100 glass-card">
            <v-icon size="50" color="blue">mdi-truck-delivery</v-icon>
            <h3 class="value-title mt-4">Fast Delivery</h3>
            <p>We make sure your fruits arrive fresh and fast, straight to your doorstep.</p>
          </v-card>
        </v-col>
      </v-row>

      <!-- Team / Brand Image -->
      <v-row justify="center">
        <v-col cols="12" md="8" class="text-center">
          <v-img
            src="https://images.unsplash.com/photo-1606788075761-1a5d08f1f4a5"
            alt="Fruithub Team"
            max-height="420"
            class="rounded-xl elevation-3"
            cover
          />
          <p class="closing-text mt-6">
            We are more than just a fruit delivery service — we’re a community passionate about health, sustainability, and great taste.
          </p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>

</script>

<style scoped>
.about-background {
  background-image: url('https://media.istockphoto.com/id/2199265016/photo/rustic-table-with-winter-fruit-illuminated-with-light-pointing.jpg?s=612x612&w=0&k=20&c=TwWnXFKEAg5yvQf_tQpIMi24i3JxKnm3IxvYbCSYrxc=');
  background-size: cover;
  background-position: center;
  min-height: 100vh; 
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 40px; 
}

/* Glass effect for cards */
.glass-card {
  background-color: rgba(255, 255, 255, 0.7) !important;
  border-radius: 20px;
}

/* Typography */
.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #046924;
}

.section-title {
  font-size: 2.6rem;
  font-weight: 600;
  color: #046924;
}

.value-title {
  font-size: 2.3rem;
  font-weight: 600;
  color: #046924;
}

.closing-text {
  font-size: 2.15rem;
  line-height: 1.7;
  color: #e9ebf0;
}
.intro-text {
  font-size: 2.2rem;   
  color: #e9ebf0;        
  line-height: 1.5;    
  font-weight: 400;    
}


</style>
