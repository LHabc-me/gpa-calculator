import { defineStore } from 'pinia'
import { useToast } from 'vue-toast-notification'

export const useMessage = defineStore('message', {
  state: () => {
    return {
      message: useToast()
    }
  },
  getters: {},
  actions: {
    info(msg) {
      this.message.open({
        message: msg,
        type: 'info',
        position: 'top',
        duration: 3000
      })
    },
    success(msg) {
      this.message.open({
        message: msg,
        type: 'success',
        position: 'top',
        duration: 3000
      })
    },
    warning(msg) {
      this.message.open({
        message: msg,
        type: 'warning',
        position: 'top',
        duration: 3000
      })
    },
    error(msg) {
      this.message.open({
        message: msg,
        type: 'error',
        position: 'top',
        duration: 3000
      })
    }
  }
})
