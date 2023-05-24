<script setup>
import { ref, watch } from 'vue'
import { useProductStore, useWishListStore, useCartStore } from '../stores'
import alerts from '../alerts/alert.js'
// working with swipper
import { Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'

const productStore = await useProductStore()
const wishListStore = useWishListStore()
const cartStore = useCartStore()
await wishListStore.load()

const props = defineProps({
	id: Number
})

const data = ref([])
async function loadData() {
	data.value = await productStore.listRelatedProducts(props.id)
}

watch(props, () => {
	loadData()
})

loadData()

const alert = alerts()
await wishListStore.load()

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

const modules = [Pagination]
</script>

<template>
	<v-container>
		<!-- :space-between="10" -->
		<swiper
			class="swiper"
			:modules="modules"
			:slides-per-view="1"
			:breakpoints="{
				'640': {
					slidesPerView: 1,
					spaceBetween: 20
				},
				'768': {
					slidesPerView: 2,
					spaceBetween: 10
				},
				'1024': {
					slidesPerView: 4,
					spaceBetween: 10
				}
			}"
			:pagination="{ clickable: true }"
		>
			<swiper-slide v-for="(product, i) in data" :key="i" class="slide">
				<v-hover>
					<template v-slot:default="{ isHovering, props }">
						<v-card
							v-bind="props"
							class="mx-2 my-12 elevation-3 bestselling-slider"
						>
							<v-card
								class="elevation-0 justify-center align-self-center bestselling-slider-1"
								min-height="220"
								style="background-color: #cacaca"
							>
								<router-link :to="`/product/${product.slug}`">
									<v-img class="pulse" :src="product.thumbnail_image" />
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
							<!-- <v-card-title class="text-center hidden-md-and-up">
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
							</v-card-title> -->
							<v-card-title
								style="background-color: #005490"
								class="text-white text-center"
							>
								<p class="text-subtitle-1">
									<!-- todo: we need to add tooltip -->
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
			</swiper-slide>
		</swiper>
	</v-container>
</template>
