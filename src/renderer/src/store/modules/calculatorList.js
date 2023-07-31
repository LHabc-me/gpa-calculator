import { defineStore } from 'pinia'

export const useCalculatorList = defineStore('calculatorList', {
  state: () => {
    return {
      list: []
    }
  },
  getters: {},
  actions: {},
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'useCalculatorList',
        storage: localStorage
      }
    ]
  }
})
