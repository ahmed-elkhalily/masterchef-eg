<script setup>
import { ref } from "vue";
const emit = defineEmits(['filterHandler', 'changePageHandle'])
const props = defineProps({
    mobile: Boolean,
    data: Array,
    totalPage: Number
})
const page = ref(1)

const changePageHandle = async (pageNumber) => {
    emit('changePageHandle', pageNumber)
    page.value = pageNumber
}
</script>

<template>
    <div class="w-100">
        <v-col v-if="props.mobile" cols="12" v-for="(order, i) in props.data" :key="i"
            class="my-5 pa-2 ma-auto elevation-5">
            <v-card-text class="text-left mb-0 pb-0">
                <p> {{ $t('orderList.orderNumberLabel') }}: <span>{{ order.code }}</span> </p>
            </v-card-text>
            <v-card-subtitle class="mb-3">
                <span> {{ $t('orderList.qtyLabel') }}: {{ order.orders.length }} </span><br />
                <span> {{ $t('orderList.totalPriceLabel') }}: {{ order.grand_total }} </span><br />
            </v-card-subtitle>
            <v-btn color="info" @click="$emit('handleDetails', order.code)" variant="outlined" block> {{ $t('orderList.detailsBtn') }} </v-btn>
        </v-col>

        <v-container v-else class=" d-flex flex-wrap elevation-2 pt-0 rounded">

            <v-layout class="d-flex flex-wrap">
                <v-table fixed-header class="w-100">
                    <thead>
                        <tr>
                            <th class="text-left">
                                {{ $t('orderList.orderNumberLabel') }}
                            </th>

                            <th class="text-left">
                                {{ $t('orderList.qtyLabel') }}
                            </th>
                            <th class="text-left">
                                {{ $t('orderList.totalPriceLabel') }}
                            </th>
                            <th>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for=" (item, i) in props.data" :key="i">
                            <td>{{ item.code }} </td>

                            <td> {{ item.orders.length }} </td>
                            <td> {{ item.grand_total }} {{ $t('currencyLabel') }}</td>

                            <td>
                                <v-btn color="blue" @click="$emit('handleDetails', item.code)" variant="flat"
                                    class="elevation-4">
                                    {{ $t('orderList.detailsBtn') }} </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
            </v-layout>
            <v-divider />
    <v-layout class="d-flex flex-wrap justify-center align-center">
        <v-spacer />
       
        <div v-if="props.totalPage" class="text-center">
        <v-pagination v-model="page" :total-visible="1" @update:modelValue="res => changePageHandle(res)" :length="props.totalPage" prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"></v-pagination>
    </div>
    </v-layout>
        </v-container>
    </div>
</template>
