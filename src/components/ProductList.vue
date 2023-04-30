<script setup>
import { ref, watch } from 'vue'
import { useWishListStore, useCartStore } from '../stores/index.js'
import FilterData from './FilterData.vue'
import alerts from '../alerts/alert.js'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n({ useScope: 'global' })
const emit = defineEmits(['filterHandler', 'changePageHandle'])

const componentProps = defineProps({
	data: Array,
	offers: Boolean,
	name: String,
	totalPage: Number
})

const alert = alerts()
const wishListStore = useWishListStore()
const cartStore = useCartStore()
await wishListStore.load()
const products = ref(componentProps.data)
const filter = ref()
const page = ref(1)
const filterDialogStatus = ref(false)

watch(componentProps, () => {
	products.value = componentProps.data
})

const addToCart = async (id, qty) => {
	const res = await cartStore.add(id, qty)
	if (res) {
		alert.message('Added successfully')
	}
}

const addToWishList = async (id) => {
	const res = await wishListStore.addAndRemoveElement(id)
	if (res) {
		alert.message(' Operation done successfully')
	}
}

const changePageHandle = async (pageNumber) => {
	emit('changePageHandle', pageNumber)
	page.value = pageNumber
}
</script>

<template>
	<FilterData
		@filterHandler="(ele) => $emit('filterHandler', ele)"
		:open="filterDialogStatus"
	/>
	<v-layout
		class="d-flex flex-wrap w-75 justify-center hidden-md-and-up align-center pa-5 ma-auto"
	>
		<p class="text-h6 hidden-md-and-up">{{ componentProps.name }}</p>
	</v-layout>
	<v-layout class="d-flex flex-wrap w-75 ma-auto">
		<v-col cols="2" class="pt-5 hidden-sm-and-down">
			<p class="text-h6">{{ componentProps.name }}</p>
		</v-col>
		<v-spacer class="hidden-sm-and-down" />
		<v-col md="5" cols="12">
			<v-row>
				<v-btn
					icon="mdi-tune"
					class="mr-4 elevation-0"
					rounded="0"
					@click="filterDialogStatus = !filterDialogStatus"
				></v-btn>
				<v-text-field
					hide-details
					density="compact"
					class="pa-2"
					:label="$t('productList.searchLabel')"
					variant="underlined"
					append-inner-icon="mdi-magnify"
					v-model.lazy="filter"
					color="info"
					@change="$emit('filterHandler', { keyword: filter })"
				></v-text-field>
			</v-row>
		</v-col>
		<v-divider />
	</v-layout>
	<v-layout
		class="d-flex flex-wrap w-75 ma-auto justify-center align-self-center"
	>
		<v-hover v-for="(product, i) in products" :key="i">
			<template v-slot:default="{ isHovering, props }">
				<v-card
					v-bind="props"
					class="mx-2 my-12 h-25 elevation-3"
					min-width="275"
				>
					<v-card
						class="h-25 elevation-0 justify-center align-self-center"
						min-width="275"
					>
						<router-link :to="`/product/${product.slug}`">
							<v-img
								class="pulse"
								:src="product.thumbnail_image"
								height="270"
								cover
							/>
						</router-link>
						<v-row
							v-if="isHovering"
							class="ma-0 w-100 hidden-sm-and-down justify-center"
							style="position: absolute; bottom: 2%"
						>
							<v-btn
								:icon="
									wishListStore.checkExists(product.id)
										? 'mdi-heart'
										: 'mdi-heart-outline'
								"
								@click="addToWishList(product.id)"
								size="small"
								:class="`${
									wishListStore.checkExists(product.id) ? 'text-info' : null
								}  ma-2 pt-1 text-info hovered-icon`"
								color="white"
							></v-btn>
							<v-btn
								icon="mdi-magnify"
								:to="`/product/${product.slug}`"
								size="small"
								class="ma-2 pt-1 text-info hovered-icon"
								color="white "
							></v-btn>
							<v-btn
								icon="mdi-cart-outline"
								@click="
									addToCart(product.variations[0].id, product.min_qty || 1)
								"
								size="small"
								class="ma-2 pt-1 text-info hovered-icon"
								color="white "
							></v-btn>
						</v-row>
					</v-card>
					<v-card-title class="text-center hidden-md-and-up">
						<v-row class="ma-0 w-100 justify-center">
							<v-btn
								:icon="
									wishListStore.checkExists(product.id)
										? 'mdi-heart'
										: 'mdi-heart-outline'
								"
								@click="addToWishList(product.id)"
								size="small"
								:class="`${
									wishListStore.checkExists(product.id) ? 'text-info' : null
								}  ma-2 pt-1`"
								color="white"
							></v-btn>
							<v-btn
								icon="mdi-magnify"
								:to="`/product/${product.id}`"
								size="small"
								class="ma-2 pt-1"
								color="white "
							></v-btn>
							<v-btn
								icon="mdi-cart-outline"
								@click="
									addToCart(product.variations[0].id, product.min_qty || 1)
								"
								size="small"
								class="ma-2 pt-1"
								color="white "
							></v-btn>
						</v-row>
					</v-card-title>
					<v-card-title
						style="background-color: #005490"
						class="text-white text-center"
					>
						<p class="text-subtitle-1">
							{{ locale === 'ar' ? '...' : ''
							}}{{ product.name.substring(0, 30) }}
							{{ locale === 'en' ? '...' : '' }}
						</p>
						<v-card-subtitle class="text-subtitle-2">
							<span
								:class="`${
									product.base_price > product.base_discounted_price &&
									'text-decoration-line-through'
								}`"
								>{{ product.base_price }} {{ $t('currencyLabel') }}</span
							>
							<span
								class="text-info pa-2"
								v-if="product.base_price > product.base_discounted_price"
								>{{ product.base_discounted_price }}
								{{ $t('currencyLabel') }}</span
							>
						</v-card-subtitle>
					</v-card-title>
				</v-card>
			</template>
		</v-hover>
	</v-layout>
	<div v-if="componentProps.totalPage" class="text-center">
		<v-pagination
			v-model="page"
			:total-visible="6"
			@update:modelValue="(res) => changePageHandle(res)"
			:length="componentProps.totalPage"
			prev-icon="mdi-menu-left"
			next-icon="mdi-menu-right"
		></v-pagination>
	</div>
</template>
