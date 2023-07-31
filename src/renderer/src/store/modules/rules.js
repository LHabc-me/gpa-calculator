import { defineStore } from 'pinia'

export const useRules = defineStore('rules', {
  state: () => {
    return {
      list: [
        { scoreFrom: 0, scoreTo: 59, gpa: 0 },
        { scoreFrom: 60, scoreTo: 63, gpa: 1 },
        { scoreFrom: 64, scoreTo: 66, gpa: 1.3 },
        { scoreFrom: 67, scoreTo: 69, gpa: 1.7 },
        { scoreFrom: 70, scoreTo: 73, gpa: 2 },
        { scoreFrom: 74, scoreTo: 76, gpa: 2.3 },
        { scoreFrom: 77, scoreTo: 79, gpa: 2.7 },
        { scoreFrom: 80, scoreTo: 83, gpa: 3 },
        { scoreFrom: 84, scoreTo: 86, gpa: 3.3 },
        { scoreFrom: 87, scoreTo: 89, gpa: 3.7 },
        { scoreFrom: 90, scoreTo: 100, gpa: 4 }
      ]
    }
  },
  getters: {},
  actions: {},
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'rules',
        storage: localStorage
      }
    ]
  }
})
