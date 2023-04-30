import { defineStore } from 'pinia'
import useSystemMessagesStore from './systemMessages.js'

const operation = {
    'plus': 1,
    'minus': -1
}

export default (connectors) => {
    const store = defineStore('cart', {
        state: () => ({
            items: [],
            cartLoaded: false,
        }),
        getters: {
            numOfElement: (state) => {
                return state.items.length
            },
            totalPrice: (state)=> {
                 return state.items.reduce((accumulator, object) => {
                    return accumulator + (object.dicounted_price * object.qty)
                }, 0)
            }
        },
        actions: {
            async load() {
                try {
                    let res
                    if (!!localStorage.getItem("MasterchefToken")) {
                        res = []
                        if (!!localStorage.getItem("MasterchefCart")) {
                            JSON.parse(localStorage.getItem('MasterchefCart')).forEach(async element => {
                                const data = await connectors.add({ variation_id: element.variation_id, qty: element.min_qty || 1 })
                                res.push(data)
                            })
                        }
                        localStorage.removeItem("MasterchefCart")
                        res = [...await connectors.list(), ...res]
                    } else {
                        res = JSON.parse(localStorage.getItem('MasterchefCart')) || []
                    }

                    this.items = res
                    return res
                } catch (error) {
                    useSystemMessagesStore().addError(error)
                }
            },
            async add(id, qty) {
                try {
                    const found = this.items.find(element => element.variation_id === id)
                    if (found) {
                        return useSystemMessagesStore().addError({ status: 405, name: 'METHOD_NOT_ALLOWED', message: 'Item Already Exists' })
                    }
                    const res = await connectors.add({ variation_id: id, qty })
                    this.items.push(res)
                    if (!!!localStorage.getItem("MasterchefToken")) {
                        localStorage.setItem('MasterchefCart', JSON.stringify(this.items));
                    }
                    return res
                } catch (error) {
                    useSystemMessagesStore().addError(error)
                }
            },
            async remove(id) {
                try {
                    let res
                    if (!!localStorage.getItem("MasterchefToken")) {
                        res = await connectors.remove({ cart_id: id })
                    }
                    this.items = this.items.filter(ele => {
                        if (ele.cart_id !== id) {
                            return ele
                        }
                    })
                    if (!!!localStorage.getItem("MasterchefToken")) {
                        localStorage.setItem('MasterchefCart', JSON.stringify(this.items));
                    }
                    return res
                } catch (error) {
                    useSystemMessagesStore().addError(error)
                }
            },
            async changeQty(id, qty, type, limit) {
                try {
                    if (type === 'minus' && qty - 1 === 0){
                        return this.remove(id)
                    }
                    if ((type === 'minus' && qty - 1 < limit) || (type === 'plus' && qty + 1 > limit && limit > 0)) {
                        return useSystemMessagesStore().addError({ name: 'MethodNotAllowedError', status: 405, message: 'Limit Reached' })
                    }
                    let res
                    if (!!localStorage.getItem("MasterchefToken")) {
                        res = await connectors.changeQty({ cart_id: id, type })
                    } else {
                        res = { success: true }
                    }
                    if (res.success) {
                        this.items.map(ele => {
                            if (ele.cart_id === id) {
                                ele.qty = ele.qty + operation[type]
                            }
                            return ele
                        })
                    }
                    if (!!!localStorage.getItem("MasterchefToken")) {
                        localStorage.setItem('MasterchefCart', JSON.stringify(this.items));
                    }
                    return res
                } catch (error) {
                    useSystemMessagesStore().addError(error)
                }
            },
            async applyCoupon(code) {
                try {
                    const res = await connectors.coupon({ coupon_code: code })
                    return res
                } catch (error) {
                    useSystemMessagesStore().addError(error)
                }
            },

        }
    })
    return store
}
