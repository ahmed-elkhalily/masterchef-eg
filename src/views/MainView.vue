<script setup>
import { watchEffect, ref } from 'vue'
import { useRoute } from 'vue-router'

import CategoryView from './CategoryView.vue'
import HowWeWork from '../components/HowWeWork.vue'
import Main from '../components/MainPage.vue'
import AboutUsCard from '../components/AboutUsCard.vue'
// import ProductList from "../components/ProductList.vue";
import BestSellingProuducts from '../components/BestSellingProuducts.vue'
import { useProductStore } from '../stores/index.js'
import { useI18n } from 'vue-i18n'

const { tm } = useI18n()
const route = useRoute()
const productStore = useProductStore()
const data = ref()
const details = ref()
const name = ref()
const totalPage = ref(0)

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
	<Main></Main>
	<AboutUsCard />
	<CategoryView :animation="true" />
	<HowWeWork />
	<BestSellingProuducts
		:totalPage="totalPage"
		:name="name"
		@changePageHandle="changePageHandle"
		@filterHandler="filterHandler"
		:data="data"
	/>
</template>
