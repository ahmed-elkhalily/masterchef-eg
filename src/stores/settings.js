import { defineStore } from 'pinia'
import useSystemMessagesStore from './systemMessages.js'

export default (connectors) => {
  const store = defineStore('setting', {
    state: () => ({
      policy: []
    }),

    actions: {
      async getFooter () {
        try {
          const res = await connectors.getFooter()
          this.policy = res.footer_policy
          return res
        } catch (error) {
           useSystemMessagesStore().addError(error)
        }
      }
    }
  })
  return store
}
