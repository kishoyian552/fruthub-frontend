import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(null)
  const error = ref(null)
  const isLoading = ref(false)

  const login = async (credentials) => {
    isLoading.value = true
    error.value = null

    try {
      const res = await axios.post('http://localhost:8000/api/login', credentials)
      user.value = res.data.user
      token.value = res.data.token

      localStorage.setItem('user', JSON.stringify(user.value))
      localStorage.setItem('authToken', token.value)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`

      return true
    } catch (err) {
      error.value = err.response?.data?.message || 'Login failed'
      return false
    } finally {
      isLoading.value = false
    }
  }

  const register = async (formData) => {
    isLoading.value = true
    error.value = null

    try {
      const res = await axios.post('http://localhost:8000/api/register', {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        password_confirmation: formData.confirmPassword
      })

      user.value = res.data.user
      token.value = res.data.token || null

      if (token.value) {
        localStorage.setItem('authToken', token.value)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
      }

      localStorage.setItem('user', JSON.stringify(user.value))
      return true
    } catch (err) {
      error.value = err.response?.data?.message || 'Registration failed'
      return false
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('user')
    localStorage.removeItem('authToken')
    delete axios.defaults.headers.common['Authorization']
  }

  const loadUser = () => {
    const storedUser = localStorage.getItem('user')
    const storedToken = localStorage.getItem('authToken')
    if (storedUser && storedToken) {
      user.value = JSON.parse(storedUser)
      token.value = storedToken
      axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
    }
  }

  const isAuthenticated = () => {
    return !!token.value
  }

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
  }
})
