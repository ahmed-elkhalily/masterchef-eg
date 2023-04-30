<script setup>
import { watchEffect, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useOfferStore } from '../stores/index.js'
import ProductList from '../components/ProductList.vue';
import OfferList from '../components/OfferList.vue';
import AppLoading from '../components/AppLoading.vue';

const route = useRoute()
const offerStore = useOfferStore()
const data = ref()
const details = ref()

async function loadData() {
   if (route.params.offerId) {
        details.value = await offerStore.getOne(route.params.offerId)
    } else {
        await offerStore.load()
        data.value = offerStore.items
    }
}

watchEffect(async () => {
    loadData()
})
</script>

<template>
    <Suspense>
        <AppLoading v-if="!data && !details" />
        <ProductList v-else-if="details" :name="$t('offerView.name')" :offers="true" :data="details" />
        <OfferList v-else-if="data" :data="data" />
    </Suspense>
</template>