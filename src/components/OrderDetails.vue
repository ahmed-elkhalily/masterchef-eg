<script setup>
const props = defineProps({
    details: Object
})

const status = {
    'cancel': 0,
    'confirmed': 1,
    'processed': 2,
    'shipped': 3,
    'delivered': 4,
}

</script>

<template>
    <v-container class=" d-flex flex-wrap elevation-2 pt-0 rounded">
        <v-hover>
            <template v-slot:default="{ isHovering, props }">
                <v-icon v-bind="props" size="30" @click="$emit('handleDetails')"
                    :class="`pa-4 mt-3 text-right ${isHovering ? 'text-blue' : ''}`">mdi-arrow-left</v-icon>
            </template>
        </v-hover>
        <v-card-title class="w-100 pl-0 ml-0 text-left">
            {{ $t('orderDetails.orderNumberLabel') }}: {{ props.details.code }}
        </v-card-title>
        <v-card-title class=" bg-grey-lighten-2 w-100 text-left">
            {{ $t('orderDetails.orderDetailsLabel.title') }}
        </v-card-title>

        <v-card class=" d-flex flex-wrap elevation-0">
            <v-col>

                <v-card-text class="text-left">
                    {{ $t('orderDetails.orderDetailsLabel.orderNumberLabel') }}: {{ props.details.code }}
                </v-card-text>
                <v-card-text class="text-left">
                    {{ $t('orderDetails.orderDetailsLabel.orderNameLabel') }}: {{ props.details.user.name }}
                </v-card-text>
                <v-card-text class="text-left">
                    {{ $t('orderDetails.orderDetailsLabel.orederEmailLabel') }}: {{ props.details.user.email }}
                </v-card-text>

            </v-col>
            <v-col>

                <v-card-text class="text-left">
                    {{ $t('orderDetails.orderDetailsLabel.orderTotalAmountLabel') }}: {{ props.details.grand_total }} {{ $t('currencyLabel') }}
                </v-card-text>
                <v-card-text class="text-left">
                    {{ $t('orderDetails.orderDetailsLabel.orderPaymentMethodLabel') }}: {{ props.details.orders[0].payment_type }}
                </v-card-text>
                <v-card-text class="text-left">
                    {{ $t('orderDetails.orderDetailsLabel.orderDeliveryMethodeLabel') }}: {{ props.details.orders[0].delivery_type }}
                </v-card-text>
            </v-col>
            <v-card-text class="ml-2 text-left w-100">
                {{ $t('orderDetails.orderDetailsLabel.orderAdressLabel') }}: {{ props.details.shipping_address.address }}
            </v-card-text>
        </v-card>
        <v-card-title class=" bg-grey-lighten-2 w-100 text-left">
        {{ $t('orderDetails.orderStatus.title') }}
        </v-card-title>
        <v-card class=" d-flex flex-wrap elevation-0">

            <v-timeline direction="horizontal" side="end" class="px-12  mt-5">
                <v-timeline-item :dot-color="status[props.details.orders[0].delivery_status] == 0? 'red': 'blue'" icon-color="white" icon="mdi-truck-fast-outline" fill-dot>
                    <h4 class=" font-weight-black text-body-2">{{ $t('orderDetails.orderStatus.timeline1') }}</h4>
                </v-timeline-item>
                <v-timeline-item :dot-color="status[props.details.orders[0].delivery_status] >= 1? 'blue': status[props.details.orders[0].delivery_status] ===0? 'red': 'grey'" icon-color="white" icon="mdi-truck-fast-outline" fill-dot>
                    <h4 class="font-weight-black text-body-2">{{ $t('orderDetails.orderStatus.timeline2') }}</h4>
                </v-timeline-item>
                <v-timeline-item :dot-color="status[props.details.orders[0].delivery_status] >= 2? 'blue': status[props.details.orders[0].delivery_status] ===0? 'red': 'grey'" icon-color="white" icon="mdi-truck-fast-outline" fill-dot>
                    <h4 class=" font-weight-black text-body-2">{{ $t('orderDetails.orderStatus.timeline3') }}</h4>
                </v-timeline-item>
                <v-timeline-item :dot-color="status[props.details.orders[0].delivery_status] >= 3? 'blue': status[props.details.orders[0].delivery_status] ===0? 'red': 'grey'" icon-color="white" icon="mdi-truck-fast-outline" fill-dot>
                    <h4 class="font-weight-black text-body-2">{{ $t('orderDetails.orderStatus.timeline4') }}</h4>
                </v-timeline-item>
                <v-timeline-item :dot-color="status[props.details.orders[0].delivery_status] >= 4? 'blue': status[props.details.orders[0].delivery_status] ===0? 'red': 'grey'" icon-color="white" icon="mdi-truck-fast-outline" fill-dot>
                    <h4 class=" font-weight-black text-body-2"> {{ $t('orderDetails.orderStatus.timeline5') }}</h4>
                </v-timeline-item>
            </v-timeline>
            <v-card class=" d-flex flex-wrap pa-2 elevation-0 w-100">
                <v-table fixed-header class="pa-5 w-100">
                    <thead>
                        <tr>
                            <th class="text-left">
                                #
                            </th>
                            <th class="text-left">
                                 {{ $t('orderDetails.table.productLabel') }}
                            </th>
                            <th class="text-left">
                                 {{ $t('orderDetails.table.qtyLabel') }}
                            </th>
                            <th class="text-left">
                                 {{ $t('orderDetails.table.totalPriceLabel') }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, i) in props.details.orders[0].products.data" :key="i">
                            <td> {{ i }}</td>
                            <td> {{ item.name }} </td>
                            <td> {{ item.quantity }} </td>
                            <td> {{ item.total }} {{ $t('currencyLabel') }} </td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card>

            <v-card class=" d-flex flex-wrap pa-2 elevation-0 w-50">
                <v-table fixed-header class="pa-5 w-100">
                    <tbody>
                        <tr>
                            <td> {{ $t('orderDetails.subTotalLabel') }}  </td>
                            <td class="text-right"> {{props.details.orders[0].subtotal }} {{ $t('currencyLabel') }} </td>
                        </tr>
                        <tr>
                            <td> {{ $t('orderDetails.taxLabel') }}: </td>
                            <td class="text-right"> {{  props.details.orders[0].tax }} {{ $t('currencyLabel') }} </td>
                        </tr>
                        <tr>
                            <td>{{ $t('orderDetails.shippingFeeLabel') }} : </td>
                            <td class="text-right"> {{ props.details.orders[0].shipping_cost }} {{ $t('currencyLabel') }} </td>
                        </tr>
                        <tr>
                            <td>{{ $t('orderDetails.voucherDiscountLabel') }} : </td>
                            <td class="text-right"> {{ props.details.orders[0].coupon_discount }} {{ $t('currencyLabel') }} </td>
                        </tr>
                        <tr class="bg-grey-lighten-2">
                            <td>{{ $t('orderDetails.totalLabel') }} : </td>
                            <td class="text-right"> {{ props.details.grand_total }} {{ $t('currencyLabel') }} </td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card>
        </v-card>
    </v-container>
</template>
