import { defineStore } from 'pinia'
import useSystemMessagesStore from './systemMessages.js'

export default (connectors) => {
    const store = defineStore('wishlist', {
        state: () => ({
            items: [],
            params: null,
            query: null
        }),
        getters: {
            checkExists: (state) => {
                return (id) => state.items.find(ele => ele.id === id)
            },
            numOfElement: (state) => {
                return state.items.length
            },
        },
        actions: {
            async load() {
                try {
                    if (localStorage.getItem("MasterchefToken")) {
                        const res = await connectors.list()
                        this.items = res
                        return res
                    }
                } catch (error) {
                     useSystemMessagesStore().addError(error)
                }
            },
            async addAndRemoveElement(id) {
                try {
                    if (!!!localStorage.getItem("MasterchefToken")) {
                        throw new Error('Login is required');   
                    }
                    const found = this.items.find(element => element.id === id)
                    let res
                    if (found) {
                        res = await connectors.remove({ product_id: id })
                        this.items = this.items.filter(ele => ele.id !== id)
                        return res
                    }
                    res = await connectors.add({ product_id: id })
                    this.items.push(res)
                    return res
                } catch (error) {
                    useSystemMessagesStore().addError(error)
                }
            }
        }
    })
    return store
}
