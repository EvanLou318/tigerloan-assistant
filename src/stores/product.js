import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { mockProducts } from '../mock/data'

export const useProductStore = defineStore('product', () => {
  const products = ref([...mockProducts])
  const searchKeyword = ref('')
  const filterStatus = ref('') // '', 'active', 'disabled'

  const filteredProducts = computed(() => {
    let result = products.value
    if (searchKeyword.value) {
      const kw = searchKeyword.value.toLowerCase()
      result = result.filter(
        (p) =>
          p.productName.toLowerCase().includes(kw) ||
          p.institution.toLowerCase().includes(kw)
      )
    }
    if (filterStatus.value) {
      result = result.filter((p) => p.status === filterStatus.value)
    }
    return [...result].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  })

  const activeCount = computed(() => products.value.filter((p) => p.status === 'active').length)

  function getProductById(id) {
    return products.value.find((p) => p.id === id)
  }

  function addProduct(data) {
    const newProduct = {
      ...data,
      id: 'p' + String(Date.now()).slice(-6),
      status: 'active',
      createdAt: new Date().toLocaleString('zh-CN'),
      source: data.source || 'text',
    }
    products.value.unshift(newProduct)
    return newProduct
  }

  function updateProduct(id, data) {
    const idx = products.value.findIndex((p) => p.id === id)
    if (idx !== -1) {
      products.value[idx] = { ...products.value[idx], ...data, updatedAt: new Date().toLocaleString('zh-CN') }
    }
  }

  function deleteProduct(id) {
    products.value = products.value.filter((p) => p.id !== id)
  }

  function toggleStatus(id) {
    const product = getProductById(id)
    if (product) {
      product.status = product.status === 'active' ? 'disabled' : 'active'
    }
  }

  return {
    products,
    searchKeyword,
    filterStatus,
    filteredProducts,
    activeCount,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleStatus,
  }
})
