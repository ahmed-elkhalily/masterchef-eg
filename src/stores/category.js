import { defineStore } from 'pinia'
import useSystemMessagesStore from './systemMessages.js'

export default (connectors) => {
  const store = defineStore('category', {
    state: () => ({
      items:[],
      params: null,
      query: null
    }),
    actions: {
      async load () {
        try {
          const res = await connectors.list(this.params, this.query)
          this.items = res
          return res
        } catch (error) {
           useSystemMessagesStore().addError(error)
        }
      }
    }
  })
  return store
}
