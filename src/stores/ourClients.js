import { defineStore } from 'pinia'
import useSystemMessagesStore from './systemMessages.js'

export default (connectors) => {
	const store = defineStore('clients', {
		state: () => ({
			ourClients: []
		}),
		actions: {
			async load() {
				try {
					const res = await connectors.clientsList()
					this.ourClients = res.data
					return res.data
				} catch (error) {
					useSystemMessagesStore().addError(error)
				}
			}
		}
	})
	return store
}
