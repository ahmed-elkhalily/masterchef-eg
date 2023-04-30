import { defineStore } from 'pinia'
import useSystemMessagesStore from './systemMessages.js'

export default (connectors) => {
    const store = defineStore('address', {
        state: () => ({
            items: [],
            params: null,
            query: null
        }),
        actions: {
            async load() {
                try {
                    const res = await connectors.list()
                    this.items = res
                    return res
                } catch (error) {
                     useSystemMessagesStore().addError(error)
                }
            },
            async add(formData) {
                try {
                    const res = await connectors.add(formData)
                    this.items.push(res)
                    return res
                } catch (error) {
                     useSystemMessagesStore().addError(error)
                }
            },
            async edit(id, formData) {
                try {
                    const res = await connectors.edit(id, formData)
                    this.items = this.items.map(ele => {
                        if (ele.id === id) {
                            ele = res
                        }
                        return ele
                    })
                    return res
                } catch (error) {
                    useSystemMessagesStore().addError(error)
                }
            },
            async remove(id) {
                try {
                    const res = await connectors.remove({ id })
                    this.items = this.items.filter(ele => ele.id !== id);
                    return res
                } catch (error) {
                     useSystemMessagesStore().addError(error)
                }
            },
            async allCountries() {
                try {
                    const res = await connectors.allCountries()
                    return res
                } catch (error) {
                     useSystemMessagesStore().addError(error)
                }
            },
            async allStates(id) {
                try {
                    const res = await connectors.allStates({id})
                    return res
                } catch (error) {
                     useSystemMessagesStore().addError(error)
                }
            },
            async allCities(id) {
                try {
                    const res = await connectors.allCities({id})
                    return res
                } catch (error) {
                     useSystemMessagesStore().addError(error)
                }
            },
        }
    })
    return store
}
