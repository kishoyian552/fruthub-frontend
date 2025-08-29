import { createRouter, createWebHistory } from 'vue-router'


import MpesaPage from '@/views/MpesaPage.vue'
import SuccessPage from '@/views/SuccessPage.vue'


import AdminLogin from '@/views/admin/AdminLogin.vue'
import AdminLayout from '@/views/admin/AdminLayout.vue'
import AdminDashboard from '@/views/admin/AdminDashboard.vue'
import AdminProducts from '@/views/admin/AdminProducts.vue'
import AdminUsers from '@/views/admin/AdminUsers.vue'
import AdminOrders from '@/views/admin/AdminOrders.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomePage.vue')
  },//route for product listing
  {
    path: '/products',
    name: 'Products',
    component: () => import('@/views/ProductListPage.vue')
  },//route for product details with dynamic id
  {
    path: '/products/:id',
    name: 'ProductDetails',
    component: () => import('@/views/ProductDetailsPage.vue'),
    props: true
  },//route for cart page
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/views/CartPage.vue')
  },//route for checkout page
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('@/views/CheckoutPage.vue')
  },//route for M-Pesa payment page

  
  {
    path: '/mpesa',
    name: 'MpesaPage',
    component: MpesaPage
  },//route for success page after payment

  
  {
    path: '/success',
    name: 'SuccessPage',
    component: SuccessPage
  },//route for login page


  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginPage.vue')
  },//route for register page
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/RegisterPage.vue')
  },// Admin routes

 
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLogin
  },// Admin layout with nested routes
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAdmin: true },
    children: [
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: AdminDashboard
      },
      {
        path: 'products',
        name: 'AdminProducts',
        component: AdminProducts
      },
      {
        path: 'users',
        name: 'AdminUsers',
        component: AdminUsers
      },
      {
        path: 'orders',
        name: 'AdminOrders',
        component: AdminOrders
      }
    ]
  }//catch-all route for 404 Not Found
]

const router = createRouter({
  history: createWebHistory(),// Use HTML5 history mode
  routes
})// Navigation guard for admin routes


router.beforeEach((to, from, next) => {
  if (to.meta.requiresAdmin) {
    const isAdmin = localStorage.getItem('isAdmin') === 'true'
    if (!isAdmin) {
      return next('/admin/login')// Redirect to admin login if not admin
    }
  }
  next()
})// Export the router instance

export default router
