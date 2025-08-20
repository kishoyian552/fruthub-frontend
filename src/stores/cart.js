import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])

  const loadCart = () => {
    const saved = localStorage.getItem('cart')
    items.value = saved ? JSON.parse(saved) : []
  }

  const saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(items.value))
  }

  const addToCart = (product) => {
    const existing = items.value.find(i => i.id === product.id)
    if (existing) {
      existing.quantity += 1
    } else {
      items.value.push({ ...product, quantity: 1 })
    }
    saveCart()
  }

  const removeFromCart = (id) => {
    items.value = items.value.filter(item => item.id !== id)
    saveCart()
  }

  const clearCart = () => {
    items.value = []
    saveCart()
  }

  // 👉 Add this computed value
  const totalPrice = computed(() => {
    return items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  })

  return {
    items,
    addToCart,
    removeFromCart,
    clearCart,
    loadCart,
    saveCart,
    totalPrice   // ✅ expose it
  }
})
