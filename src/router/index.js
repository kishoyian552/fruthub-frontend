import { createRouter, createWebHistory } from 'vue-router'

//  Import MpesaPage
import MpesaPage from '@/views/MpesaPage.vue'

//  Import Admin pages
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
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('@/views/ProductListPage.vue')
  },
  {
    path: '/products/:id',
    name: 'ProductDetails',
    component: () => import('@/views/ProductDetailsPage.vue'),
    props: true
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/views/CartPage.vue')
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('@/views/CheckoutPage.vue')
  },

  // ✅ Mpesa route
  {
    path: '/mpesa',
    name: 'MpesaPage',
    component: MpesaPage
  },

  // ✅ User routes
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginPage.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/RegisterPage.vue')
  },

  // ✅ Admin routes
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLogin
  },
  {
    path: '/admin',
    component: AdminLayout,  // <-- Layout with sidebar + navbar
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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 🔒 Admin route guard
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAdmin) {
    const isAdmin = localStorage.getItem('isAdmin') === 'true'
    if (!isAdmin) {
      return next('/admin/login')
    }
  }
  next()
})

export default router
