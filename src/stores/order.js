import { defineStore } from 'pinia'
import useSystemMessagesStore from './systemMessages.js'

export default (connectors) => {
    const store = defineStore('order', {
        state: () => ({
            items: [],
            totalPage: 0
        }),
        actions: {
            async load(params) {
                try {
                    if (params > 0 && params <= this.totalPage) {
                        params = '?page=' + params
                    } else {
                        params = '?page=' + 1
                    }
                    const res = await connectors.list(params)
                    this.items = res.data
                    this.totalPage = res.totalPage
                    return res
                } catch (error) {
                    useSystemMessagesStore().addError(error)
                }
            },
            async getOne(id) {
                try {
                    const res = await connectors.getOne({ id })
                    return res
                } catch (error) {
                    useSystemMessagesStore().addError(error)
                }
            },
            async cancel(id) {
                try {
                    const res = await connectors.cancelOrder({ id })
                    return res
                } catch (error) {
                    useSystemMessagesStore().addError(error)
                }
            },
            async invoice(id) {
                try {
                    const res = await connectors.invoice({ id })
                    return res
                } catch (error) {
                    useSystemMessagesStore().addError(error)
                }
            },
            async add(formData) {
                try {
                    const res = await connectors.add(formData)
                    return res
                } catch (error) {
                    useSystemMessagesStore().addError(error)
                }
            },
            async refund(id) {
                try {
                    const res = await connectors.refund({ id })
                    return res
                } catch (error) {
                    useSystemMessagesStore().addError(error)
                }
            },
            async getShipping(id) {
                try {
                    const res = await connectors.getShipping({ id })
                    return res
                } catch (error) {
                    useSystemMessagesStore().addError(error)
                }
            }
        }
    })
    return store
}

