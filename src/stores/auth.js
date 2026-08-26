import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || '')
  const userInfo = ref(JSON.parse(localStorage.getItem('userInfo') || 'null'))

  function login(phone, password, remember) {
    // 模拟登录
    token.value = 'mock-jwt-token-' + Date.now()
    userInfo.value = {
      phone,
      name: '李经理',
      role: 'loan_manager',
      loginTime: new Date().toLocaleString('zh-CN'),
    }
    localStorage.setItem('token', token.value)
    localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
    if (remember) {
      localStorage.setItem('savedPhone', phone)
      localStorage.setItem('savedPassword', password)
    } else {
      localStorage.removeItem('savedPhone')
      localStorage.removeItem('savedPassword')
    }
    return true
  }

  function logout() {
    token.value = ''
    userInfo.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
  }

  function getSavedCredentials() {
    return {
      phone: localStorage.getItem('savedPhone') || '',
      password: localStorage.getItem('savedPassword') || '',
    }
  }

  return { token, userInfo, login, logout, getSavedCredentials }
})
