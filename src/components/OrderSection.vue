<script setup>
import { ref, watchEffect } from 'vue'
import { useOrderStore } from "../stores/index.js";
import OrderList from './OrderList.vue'
import OrderDetails from './OrderDetails.vue'
import OrderDetailsDialog from './OrderDetailsDialog.vue';
import { useDisplay } from 'vuetify'
const { mobile } = useDisplay()
const orderStore = useOrderStore()
await orderStore.load()
const props = defineProps({
  mobile: Boolean
})

const data = ref()
const details = ref()
const totalPage = ref(0)
const mobileDialog = ref(false)

async function loadData() {
  await orderStore.load()
  data.value = orderStore.items
  totalPage.value = orderStore.totalPage
}

watchEffect(async () => {
  loadData()
})

async function handleDetails(id) {
  if (!id) {
    details.value = false
  }else{
    details.value = await orderStore.getOne(id)
    mobileDialog.value = !mobileDialog.value
  }
}

async function changePageHandle(params) {
    await orderStore.load(params)
    data.value = orderStore.items
}


</script>

<template>
  <OrderDetailsDialog v-if="mobile && details" :details="details" :open="mobileDialog" />
  <v-container class=" d-flex flex-wrap elevation-2 pt-0 rounded">
    <OrderDetails v-if="!mobile && details" :details="details" @handleDetails="handleDetails" />
    <OrderList v-else-if="data" :totalPage="totalPage" @changePageHandle=changePageHandle :data="data" :mobile="props.mobile" @handleDetails="handleDetails" />
  </v-container>
</template>
