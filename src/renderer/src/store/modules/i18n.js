import { defineStore } from 'pinia'
import { i18n } from '@/i18n'

export const useI18n = defineStore('i18n', {
  state: () => ({
    code: i18n.global.locale.value
  }),
  getters: {},
  actions: {
    changeLang(code) {
      this.code = code
      i18n.global.locale.value = code
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'i18n',
        storage: localStorage
      }
    ]
  }
})
