import { defineStore } from 'pinia'
import useSystemMessagesStore from './systemMessages.js'

export default (connectors) => {
  const store = defineStore('auth', {
    state: () => ({
      user: null
    }),
    getters: {
      checkAuth() {
        return !!localStorage.getItem("MasterchefToken")
      },
    },
    actions: {
      async login(formData) {
        try {
          const res = await connectors.login(formData)
          if (!res.success || !res.verified) {
            throw new Error(res.message);
          }
            localStorage.setItem("MasterchefToken", "Bearer " + res.access_token);
            this.user = res.user
          return res
        } catch (error) {
          useSystemMessagesStore().addError(error)
          return {success: false}
        }
      },
      async signup(formData){
        try {
          const res = await connectors.signup(formData)
          if (!res.success) {
            throw new Error(res.message);
          }
          return res
        } catch (error) {
          useSystemMessagesStore().addError(error)
          return {success: false}
        }
      },
      async verify(formData){
        try {
          const res = await connectors.verify(formData)
          if (!res.success) {
            throw new Error(res.message);
          }
          return res
        } catch (error) {
          useSystemMessagesStore().addError(error)
          return {success: false}
        }
      },

      async resendCode(formData){
        try {
          const res = await connectors.resendCode(formData)
          if (!res.success) {
            throw new Error(res.message);
          }
          return res
        } catch (error) {
          useSystemMessagesStore().addError(error)
          return {success: false}
        }
      },
      async createPassword(formData){
        try {
          const res = await connectors.createPassword(formData)
          if (!res.success) {
            throw new Error(res.message);
          }
          return res
        } catch (error) {
          useSystemMessagesStore().addError(error)
          return {success: false}
        }
      },
      async resetPassword(formData){
        try {
          const res = await connectors.resetPassword(formData)
          if (!res.success) {
            throw new Error(res.message);
          }
          return res
        } catch (error) {
          useSystemMessagesStore().addError(error)
          return {success: false}
        }
      },
      async userInfo(){
        try {
          const res = await connectors.userInfo()
          this.user = res.user
          return res
        } catch (error) {
          useSystemMessagesStore().addError(error)
        }
      },
      async logOut() {
        localStorage.removeItem("MasterchefToken")
      },
      async editUser(formData){
        try {
          const res = await connectors.editUser(formData)
            this.user = res.user
            return res
        } catch (error) {
          useSystemMessagesStore().addError(error)
        }
      }
    }
  })
  return store
}
