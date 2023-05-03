<script setup>
import { ref, watch } from 'vue'
import { useWishListStore, useCartStore } from '../stores/index.js'
import FilterData from './FilterData.vue'
import alerts from '../alerts/alert.js'

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

<style>
.offers-badg {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 9999;
	height: 50px;
	/* to make the icon in the right */
	width: 50%;
}
.offers-badg img {
	height: 50px;
	/* to make the icon in the right */
	left: -19px;
}
</style>

<template>
	<v-container>
		<FilterData
			@filterHandler="(ele) => $emit('filterHandler', ele)"
			:open="filterDialogStatus"
			v-if="!componentProps.offers"
		/>
		<v-layout
			v-if="!componentProps.offers"
			class="d-flex flex-wrap justify-center hidden-md-and-up align-center pa-5 ma-auto"
		>
			<p class="text-h6 hidden-md-and-up">{{ componentProps.name }}</p>
		</v-layout>

		<v-layout v-if="!componentProps.offers" class="d-flex flex-wrap">
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

		<v-layout class="d-flex flex-wrap justify-center align-self-center">
			<v-hover v-for="(product, i) in products" :key="i">
				<template v-slot:default="{ isHovering, props }">
					<v-card
						v-bind="props"
						class="mx-2 h-25 elevation-3"
						:class="componentProps.offers ? 'mb-12' : 'my-12'"
						min-width="275"
					>
						<v-card
							class="h-25 elevation-0 justify-center align-self-center"
							min-width="275"
						>
							<router-link :to="`/product/${product.slug}`">
								<div class="offers-badg" v-if="componentProps.offers">
									<v-img src="./sale.png" />
								</div>
								<v-img
									class="pulse"
									:src="product.thumbnail_image"
									height="270"
									cover
								/>
							</router-link>
							<v-row
								v-if="isHovering"
								class="ma-0 w-100 justify-center hidden-md-and-down"
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
							<v-row
								class="ma-0 w-100 justify-center hidden-md-and-up"
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

						<v-card-title
							style="background-color: #005490"
							class="text-white text-center"
						>
							<p class="text-subtitle-1">
								{{ product.name.substring(0, 30) }}
								{{ product.name.length > 30 ? '...' : '' }}
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
		<div v-if="componentProps.totalPage" class="text-center hidden-sm-and-down">
			<v-pagination
				v-model="page"
				:total-visible="6"
				@update:modelValue="(res) => changePageHandle(res)"
				:length="componentProps.totalPage"
				prev-icon="mdi-menu-left"
				next-icon="mdi-menu-right"
			></v-pagination>
		</div>
		<div v-if="componentProps.totalPage" class="text-center hidden-md-and-up">
			<v-pagination
				v-model="page"
				:total-visible="1"
				@update:modelValue="(res) => changePageHandle(res)"
				:length="componentProps.totalPage"
				prev-icon="mdi-menu-left"
				next-icon="mdi-menu-right"
			></v-pagination>
		</div>
	</v-container>
</template>
