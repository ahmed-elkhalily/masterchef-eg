<script setup>
import { watchEffect, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '../stores/index.js'
import ProductList from '../components/ProductList.vue'
import ProductDetails from '../components/ProductDetails.vue'
import { useI18n } from 'vue-i18n'
import AppLoading from '../components/AppLoading.vue'

const { tm } = useI18n()
const route = useRoute()
const productStore = useProductStore()
const data = ref()
const details = ref()
const name = ref()
const totalPage = ref(1)

async function loadData() {
	totalPage.value = 0
	if (route.params.productId) {
		details.value = await productStore.getOne(route.params.productId)
	} else {
		await productStore.load()
		name.value = tm('productView.allProductName')
		data.value = productStore.items
		totalPage.value = productStore.totalPage
	}
}

async function filterHandler(filter) {
	await productStore.searchProducts(filter)
	data.value = productStore.items
}

async function changePageHandle(params) {
	await productStore.load(params)
	data.value = productStore.items
}

watchEffect(async() => {
	loadData()
})
</script>

<template>
	<Suspense>
		<AppLoading v-if="!data && !details" />
		<ProductDetails
			v-else-if="route.params.productId && details"
			:data="details"
		/>
		<ProductList
			v-else-if="data"
			:totalPage="totalPage"
			:name="name"
			@changePageHandle="changePageHandle"
			@filterHandler="filterHandler"
			:data="data"
		/>
	</Suspense>
</template>
