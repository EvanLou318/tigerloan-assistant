import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { mockCustomers, mockSimulations } from '../mock/data'

export const useCustomerStore = defineStore('customer', () => {
  const customers = ref([...mockCustomers])
  const simulations = ref([...mockSimulations])
  const searchKeyword = ref('')

  const filteredCustomers = computed(() => {
    let result = customers.value
    if (searchKeyword.value) {
      const kw = searchKeyword.value.toLowerCase()
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(kw) ||
          c.phone.includes(kw)
      )
    }
    return [...result].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  })

  function getCustomerById(id) {
    return customers.value.find((c) => c.id === id)
  }

  function addCustomer(data) {
    const newCustomer = {
      ...data,
      id: 'c' + String(Date.now()).slice(-6),
      materials: [],
      createdAt: new Date().toLocaleString('zh-CN'),
      updatedAt: new Date().toLocaleString('zh-CN'),
    }
    customers.value.unshift(newCustomer)
    return newCustomer
  }

  function updateCustomer(id, data) {
    const idx = customers.value.findIndex((c) => c.id === id)
    if (idx !== -1) {
      customers.value[idx] = { ...customers.value[idx], ...data, updatedAt: new Date().toLocaleString('zh-CN') }
    }
  }

  // 合并 AI 提取字段到客户档案（只覆盖本次确认的字段）
  function mergeCustomerFields(id, fields) {
    const idx = customers.value.findIndex((c) => c.id === id)
    if (idx !== -1) {
      customers.value[idx] = {
        ...customers.value[idx],
        ...fields,
        updatedAt: new Date().toLocaleString('zh-CN'),
      }
    }
  }

  function deleteCustomer(id) {
    customers.value = customers.value.filter((c) => c.id !== id)
  }

  function addMaterial(customerId, material) {
    const customer = getCustomerById(customerId)
    if (customer) {
      customer.materials.push({
        ...material,
        id: 'm' + String(Date.now()).slice(-6),
        time: new Date().toLocaleString('zh-CN'),
      })
      customer.updatedAt = new Date().toLocaleString('zh-CN')
    }
  }

  // 删除客户材料
  function removeMaterial(customerId, materialId) {
    const customer = getCustomerById(customerId)
    if (customer) {
      customer.materials = customer.materials.filter((m) => m.id !== materialId)
      customer.updatedAt = new Date().toLocaleString('zh-CN')
    }
  }

  // 修改材料类型（AI 识别错误时更正）
  function updateMaterialType(customerId, materialId, newType) {
    const customer = getCustomerById(customerId)
    if (customer) {
      const mat = customer.materials.find((m) => m.id === materialId)
      if (mat) {
        mat.type = newType
        customer.updatedAt = new Date().toLocaleString('zh-CN')
      }
    }
  }

  function getSimulationsByCustomerId(customerId) {
    return simulations.value
      .filter((s) => s.customerId === customerId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  }

  function addSimulation(data) {
    const newSim = {
      ...data,
      id: 's' + String(Date.now()).slice(-6),
      createdAt: new Date().toLocaleString('zh-CN'),
    }
    simulations.value.unshift(newSim)
    return newSim
  }

  function deleteSimulation(id) {
    simulations.value = simulations.value.filter((s) => s.id !== id)
  }

  return {
    customers,
    simulations,
    searchKeyword,
    filteredCustomers,
    getCustomerById,
    addCustomer,
    updateCustomer,
    mergeCustomerFields,
    deleteCustomer,
    addMaterial,
    removeMaterial,
    updateMaterialType,
    getSimulationsByCustomerId,
    addSimulation,
    deleteSimulation,
  }
})
