<script setup>
import { watchEffect, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCategoryStore, useProductStore } from '../stores/index.js'
import ProductList from '../components/ProductList.vue';
import CategoryList from '../components/CategoryCard.vue';
import { useI18n } from 'vue-i18n'
import AppLoading from '../components/AppLoading.vue';


const { tm } = useI18n()
const route = useRoute()
const categoryStore = useCategoryStore()
const productStore = useProductStore()
const data = ref()
const details = ref()
const name = ref()

const props = defineProps({
    animation: Boolean
})

async function loadData() {
    if (route.params.categoryId) {
        await productStore.loadCategoryProducts(route.params.categoryId)
        if (categoryStore.items.length === 0 ) {
            await categoryStore.load()
        }
        name.value = categoryStore.items.find(ele => ele.id == route.params.categoryId ).name
        details.value = productStore.items
    } else {
        await categoryStore.load()
        data.value = categoryStore.items
    }
}

async function filterHandler(filter) {
    await productStore.searchProducts(filter)
    name.value = tm('productView.productName')
    details.value = productStore.items
}


watchEffect(async () => {
    loadData()
})
</script>

<template>
    <Suspense>
        <AppLoading v-if="!data && !details" />
        <ProductList v-else-if="route.params.categoryId && details" :name="name" @filterHandler="filterHandler" :data="details" />
        <CategoryList v-else-if="data" :animation="props.animation" :data="data" />
    </Suspense>
</template>