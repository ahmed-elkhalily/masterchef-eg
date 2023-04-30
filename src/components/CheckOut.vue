<script setup>
import { ref } from 'vue';
import { useCartStore, useOrderStore, useAddressStore } from '../stores/index.js'
import AddressList from './AddressList.vue'
import alerts from '../alerts/alert.js'

const cartStore = useCartStore()
const orderStore = useOrderStore()
const addressStore = useAddressStore()

await cartStore.load()
const alert = alerts()


const order = ref({ delivery_type: 'standard', payment_type: 'cash_on_delivery' })
const shipping = ref({})

if (addressStore.items.length) {
    order.value.shipping_address_id = addressStore.items[0].id
    order.value.billing_address_id = addressStore.items[0].id
    shipping.value = await orderStore.getShipping(addressStore.items[0].id)
}

const ChooseAddressHandler = async (params) => {
    order.value.shipping_address_id = params
    order.value.billing_address_id = params
    shipping.value = await orderStore.getShipping(params)
}

const submit = async () => {
    order.value['cart_item_ids'] = cartStore.items.map(ele => ele.cart_id)
    const res = await orderStore.add(order.value)
    if (res) {
        alert.message('order submitted successfully')
    }
}

</script>

<template>
    <v-container class=" d-flex flex-wrap elevation-2 pa-10 rounded">
        <v-card-title class=" bg-grey-lighten-2 w-100 text-left">
            {{$t('checkOut.addressTitle')}}
        </v-card-title>
        <AddressList @ChooseAddressHandler="ChooseAddressHandler" />

        <v-card-title class=" bg-grey-lighten-2 w-100 text-left">
            {{$t('checkOut.deliveryMethodTitle')}}
        </v-card-title>
        <v-radio-group v-model="order.delivery_type" class=" pa-4 w-100 text-left d-flex ">
            <v-radio label="standard" color="info" value="standard"></v-radio>
            <v-radio label="express" color="info" value="express"></v-radio>
        </v-radio-group>

        <v-card-title class=" bg-grey-lighten-2 w-100 text-left">
            {{$t('checkOut.orderDetailsTitle')}}
        </v-card-title>
        <v-card class=" d-flex flex-wrap pa-2 elevation-0 w-100 hidden-md-and-up">
            <v-col cols="12" v-for="(product, i) in cartStore.items" :key="i"
                class="my-5 pa-2 ma-auto elevation-5 hidden-md-and-up">
                <v-card-text class="text-left mb-0 pb-0">
                    <p> # <span>{{ i }}</span> </p>
                </v-card-text>
                <v-card-text class="text-left mb-0 pb-0">
                    <p> {{$t('checkOut.table.productLabel')}}: <span>{{ product.name }} </span> </p>
                </v-card-text>
                <v-card-subtitle class="mb-3">
                    <span> {{$t('checkOut.table.qtyLabel')}}: {{ product.qty }} </span><br />
                    <span> {{$t('checkOut.table.itemPriceLabel')}}: {{ product.dicounted_price }} </span><br />
                    <span> {{$t('checkOut.table.totalPriceLabel')}}: {{ product.dicounted_price * product.qty }} </span><br />
                </v-card-subtitle>
            </v-col>
        </v-card>
        <v-card class=" d-flex flex-wrap hidden-sm-and-down  pa-2 elevation-0 w-100">
            <v-table fixed-header class="pa-5 w-100 hidden-sm-and-down ">
                <thead>
                    <tr>
                        <th class="text-left">
                            #
                        </th>
                        <th class="text-left">
                            {{$t('checkOut.table.productLabel')}}
                        </th>
                        <th class="text-left">
                            {{$t('checkOut.table.qtyLabel')}}
                        </th>
                        <th class="text-left">
                            {{$t('checkOut.table.totalPriceLabel')}}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, i) in cartStore.items" :key="i">
                        <td> {{ i }} </td>
                        <td> {{ item.name }} </td>
                        <td> {{ item.qty }} </td>
                        <td> {{ item.dicounted_price * item.qty }} </td>
                    </tr>
                </tbody>
            </v-table>
        </v-card>

        <v-col cols="12" md="6" class=" d-flex flex-wrap pa-2 elevation-0 ">
            <v-card-title class=" bg-grey-lighten-2 w-100 text-left">
                {{$t('checkOut.paymentDetailsTitle')}}
            </v-card-title>
            <v-table fixed-header class="pa-md-5 w-100">
                <tbody>
                    <tr>
                        <td> {{$t('checkOut.subTotalLabel')}} </td>
                        <td class="text-right"> {{ cartStore.totalPrice }} EGP </td>
                    </tr>
                    <tr>
                        <td> {{$t('checkOut.taxLabel')}} </td>
                        <td class="text-right"> {{ cartStore.items.map(obj => obj.tax).reduce((accumulator, current) =>
                            accumulator + current, 0) }} EGP </td>
                    </tr>
                    <tr>
                        <td> {{$t('checkOut.shippingChargeLabel')}} </td>
                        <td class="text-right"> {{ shipping[order.delivery_type ===
                            'standard' ? 'standard_delivery_cost' : 'express_delivery_cost'] || 0 }} EGP </td>
                    </tr>
                    <tr>
                        <td>
                            <v-btn color="info" class="pa-2"> {{$t('checkOut.applyDiscountBtn')}} </v-btn>
                            <p class="pt-2">{{$t('checkOut.applyDiscountTitle')}}</p>
                        </td>
                        <td class="text-right pa-2">
                            <v-text-field hide-details density="compact" :label="$t('checkOut.discountFieldLabel')" variant="outlined"
                                color="info"></v-text-field>
                            <p class="pt-2">0 {{$t('currencyLabel')}}</p>
                        </td>
                    </tr>
                    <tr class="bg-grey-lighten-2">
                        <td> {{$t('checkOut.totalLabel')}}: </td>
                        <td class="text-right"> {{ cartStore.totalPrice + cartStore.items.map(obj =>
                            obj.tax).reduce((accumulator, current) => accumulator + current, 0) +
                            (shipping[order.delivery_type === 'standard' ? 'standard_delivery_cost' : 'express_delivery_cost']
                                || 0) }} {{$t('currencyLabel')}} </td>
                    </tr>
                </tbody>
            </v-table>
        </v-col>

        <v-col cols="12" md="6" class=" d-flex flex-wrap pa-md-2 elevation-0 ">
            <v-card-title class=" bg-grey-lighten-2 w-100 text-left">
                {{$t('checkOut.paymentMethod.title')}}
            </v-card-title>
            <v-col>
                <v-card style="cursor: pointer;" class="mx-2 pa-4 elevation-5">
                    <v-card-text class="text-center">
                        <v-icon size="50" :class="order.payment_type === 'online' && 'text-info'"> mdi-credit-card-outline
                        </v-icon>
                    </v-card-text>
                    <v-card-text :class="`text-center ${order.payment_type === 'online' && 'text-info'}`">
                        {{$t('checkOut.paymentMethod.onlinePaymentLabel')}}
                    </v-card-text>
                </v-card>
                <v-card style="cursor: pointer;" @click="order.payment_type = 'cash_on_delivery'"
                    class="mx-2 my-5 pa-4  elevation-5">
                    <v-card-text class="text-center">
                        <v-icon size="50" :class="order.payment_type === 'cash_on_delivery' && 'text-info'">
                            mdi-truck-outline </v-icon>
                    </v-card-text>
                    <v-card-text :class="`text-center ${order.payment_type === 'cash_on_delivery' && 'text-info'}`">
                        {{$t('checkOut.paymentMethod.payOnDeliveryLabel')}}
                    </v-card-text>
            </v-card>
        </v-col>
    </v-col>
    <v-btn color="info" class="pa-5" @click="submit" block>  {{$t('checkOut.checkOutBtn')}} </v-btn>
</v-container></template>
