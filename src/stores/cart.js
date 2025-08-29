import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])// Cart items

  const loadCart = () => {
    const saved = localStorage.getItem('cart')// Retrieve cart from localStorage
    items.value = saved ? JSON.parse(saved) : []// Load cart from localStorage
  }

  const saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(items.value))// Save cart to localStorage
  }

  const addToCart = (product) => {
    const existing = items.value.find(i => i.id === product.id)// Check if product already in cart
    if (existing) {
      existing.quantity += 1// Increment quantity
    } else {
      items.value.push({ ...product, quantity: 1 })// Add new product with quantity 1
    }// End ifelse
    saveCart()// Persist changes
  }// End of addToCart

  const removeFromCart = (id) => {
    items.value = items.value.filter(item => item.id !== id)// Remove product by id
    saveCart()//Persist changes
  }// End of removeFromCart

  const clearCart = () => {
    items.value = []//Clear all items
    saveCart()//Persist changes
  }

  
  const totalPrice = computed(() => {
    return items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)// Calculate total price
  })/// totalPrice

  return {
    items,
    addToCart,
    removeFromCart,
    clearCart,
    loadCart,
    saveCart,
    totalPrice   //  totalPrice
  }
})
