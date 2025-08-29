import { defineStore } from 'pinia'//
import { ref } from 'vue'
import axios from 'axios'//

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)// Store user data
  const token = ref(null)// Store auth token
  const error = ref(null)// Store error messages
  const isLoading = ref(false)// Loading state

  const login = async (credentials) => {
    isLoading.value = true// Start loading
    error.value = null// Clear previous errors

    try {
      const res = await axios.post('http://localhost:8000/api/login', credentials)//  URL 
      user.value = res.data.user// User data
      token.value = res.data.token// Auth token

      localStorage.setItem('user', JSON.stringify(user.value))// Persist user data
      localStorage.setItem('authToken', token.value)// Persist token
      axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`// Set default header

      return true// Login successful
    } catch (err) {
      error.value = err.response?.data?.message || 'Login failed'//  error message
      return false// Login failed
    } finally {
      isLoading.value = false
    }// End of trycatchfinally
  }// End of login

  const register = async (formData) => {
    isLoading.value = true
    error.value = null//Clear previous errors

    try {
      const res = await axios.post('http://localhost:8000/api/register', {
        first_name: formData.firstName,// Adjust field names as necessary
        last_name: formData.lastName,// Adjust field names ,,
        email: formData.email,// Adjust email field name
        phone: formData.phone,// Adjust phone field ,,
        password: formData.password,// Adjust password field
        password_confirmation: formData.confirmPassword
      })//  URL

      user.value = res.data.user//User data
      token.value = res.data.token || null// Auth token may not be provided

      if (token.value) {
        localStorage.setItem('authToken', token.value)// Persist token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
      }// Set default header if token exists

      localStorage.setItem('user', JSON.stringify(user.value))//Persist user data
      return true// Registration successful
    } catch (err) {
      error.value = err.response?.data?.message || 'Registration failed'//  error message
      return false// Registration failed
    } finally {
      isLoading.value = false
    } // End of trycatchfinally
  }// End of register

  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('user')// Clear persisted data
    localStorage.removeItem('authToken')// Clear persisted data
    delete axios.defaults.headers.common['Authorization']// Remove auth header
  }

  const loadUser = () => {
    const storedUser = localStorage.getItem('user')// Load user from localStorage
    const storedToken = localStorage.getItem('authToken')// Load token from localStorage
    if (storedUser && storedToken) {
      user.value = JSON.parse(storedUser)// Parse and set user data
      token.value = storedToken
      axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`// Set default header
    }
  }// End of loadUser

  const isAuthenticated = () => {
    return !!token.value
  }// Check if user is authenticated

  return {
    user,
    token,
    error,
    isLoading,
    login,
    register,
    logout,
    loadUser,
    isAuthenticated
  }// Return state and actions
})// End of defineStore
