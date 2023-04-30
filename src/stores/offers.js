import { defineStore } from 'pinia'
import useSystemMessagesStore from './systemMessages.js'

export default (connectors) => {
  const store = defineStore('offer', {
    state: () => ({
      items:[]
    }),
    actions: {
      async load () {
        try {
          const res = await connectors.listOffers()
          this.items = res
          return res
        } catch (error) {
           useSystemMessagesStore().addError(error)
        }
      },
      async getOne (id) {
        try {
          const res = await connectors.list({id})
          return res.products.data
        } catch (error) {
           useSystemMessagesStore().addError(error)
        }
      }
    }
  })
  return store
}
