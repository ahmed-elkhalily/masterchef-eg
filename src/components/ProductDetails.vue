<script setup>
import { ref, watch } from 'vue'
import {
	useCartStore,
	useWishListStore,
	useProductStore
} from '../stores/index.js'
import ProductSlider from '../components/ProductSlider.vue'
import alerts from '../alerts/alert.js'

const props = defineProps({
	data: Object
})

const getReviews = async () => {
	return productStore.productReviews(props.data.id)
}

const alert = alerts()
const cartStore = useCartStore()
const productStore = useProductStore()
const wishListStore = useWishListStore()
const qty = ref(props.data.min_qty)
const pic = ref(props.data.photos)
const isSubmit = ref(false)
const reviews = ref(await getReviews())

const selectedPic = ref(0)
const form = ref({ comment: '', rating: 0, product_id: props.data.id })

watch(props, async () => {
	qty.value = props.data.min_qty
	pic.value = props.data.photos
	form.value = { comment: '', rating: 0, product_id: props.data.id }
	reviews.value = await getReviews()
})

watch(isSubmit, async () => {
	reviews.value = await getReviews()
})

const submitReview = async () => {
	productStore.submitProductReview(form.value)
	reviews.value = await getReviews()
	isSubmit.value = !isSubmit.value
	form.value = ref({ comment: '', rating: 0, product_id: props.data.id })
}

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
</script>

<template>
	<v-layout class="d-flex flex-wrap ma-auto justify-center align-self-center">
		<v-container>
			<v-card class="elevation-0 py-10 justify-left align-self-center">
				<v-row>
					<v-col md="5" cols="12">
						<v-img
							class="pulse"
							:src="pic[selectedPic]"
							height="450"
							width="600"
						></v-img>
						<v-slide-group
							mandatory
							v-if="pic.length > 1"
							v-model="selectedPic"
							class="pa-4"
							show-arrows
						>
							<v-slide-group-item
								v-for="n in pic"
								:key="n"
								v-slot="{ toggle, selectedClass }"
							>
								<v-card
									:class="['ma-4  hidden-sm-and-down', selectedClass]"
									height="150"
									width="150"
									@click="toggle"
								>
									<v-img
										class="pulse"
										:src="n"
										height="200"
										width="250"
									></v-img>
								</v-card>
								<v-card
									color="grey-lighten-1"
									:class="['ma-4  hidden-md-and-up', selectedClass]"
									height="100"
									width="50"
									@click="toggle"
								>
									<v-img class="pulse" :src="n" height="100" width="50"></v-img>
								</v-card>
							</v-slide-group-item>
						</v-slide-group>
					</v-col>
					<v-col>
						<v-card-title>
							{{ props.data.name }}
						</v-card-title>
						<v-col>
							<v-card-title>
								<span
									:class="`${
										props.data.base_price > props.data.base_discounted_price &&
										'text-decoration-line-through'
									}`"
									>{{ props.data.base_price }} {{ $t('currencyLabel') }}</span
								>
								<span
									class="text-blue pa-2"
									v-if="
										props.data.base_price > props.data.base_discounted_price
									"
									>{{ props.data.base_discounted_price }}
									{{ $t('currencyLabel') }}</span
								>
							</v-card-title>
						</v-col>
						<v-card-subtitle>
							{{ $t('productDetails.stockLabel') }}:
							<span>
								{{
									props.data.stock
										? props.data.stock
										: $t('productDetails.outOfStockTitle')
								}}</span
							>
						</v-card-subtitle>
						<v-card-text>
							{{ props.data.description }}
						</v-card-text>
						<v-card-text>
							<v-divider />
						</v-card-text>

						<v-card-actions class="justify-center">
							<!-- flex-wrap justify-center align-self-center -->
							<div
								class="d-flex w-100"
								style="align-items: center; justify-content: space-between"
							>
								<div
									style="
										display: flex;
										align-items: center;
										justify-content: space-between;
									"
								>
									<v-btn
										color="blue"
										:disabled="qty - 1 < props.data.min_qty ? true : false"
										variant="text"
										@click="qty--"
										icon="mdi-minus"
									></v-btn>
									<v-text-field class="mx-2 py-0" disabled v-model="qty" />
									<v-btn
										color="blue"
										:disabled="
											props.data.max_qty && qty + 1 > props.data.max_qty
												? true
												: false
										"
										class="mx-0"
										variant="text"
										@click="qty++"
										icon="mdi-plus"
									></v-btn>
								</div>
								<v-btn
									color="blue-grey"
									size="large"
									prepend-icon="mdi-cart-outline"
									class="ml-3 hidden-sm-and-down"
									@click="addToCart(props.data.variations[0].id, qty)"
									>{{ $t('productDetails.addToCartBtn') }}
								</v-btn>
								{{ props.data.id }}
								<v-btn
									color="blue-grey"
									@click="addToWishList(props.data.id)"
									size="small"
									:icon="
										wishListStore.checkExists(props.data.id)
											? 'mdi-heart'
											: 'mdi-heart-outline'
									"
									:class="`${
										wishListStore.checkExists(props.data.id)
											? 'text-info'
											: null
									}  hidden-sm-and-down`"
								></v-btn>
							</div>

							<v-spacer class="hidden-sm-and-down" />
						</v-card-actions>

						<v-card-actions class="hidden-md-and-up">
							<v-spacer />
							<v-btn
								color="blue-grey"
								icon="mdi-cart-outline"
								@click="addToCart(props.data.variations[0].id, qty)"
								class="mb-5 hidden-md-and-up"
							></v-btn>
							<v-btn
								color="blue-grey"
								@click="addToWishList(props.data.id)"
								:icon="
									wishListStore.checkExists(props.data.id)
										? 'mdi-heart'
										: 'mdi-heart-outline'
								"
								:class="`${
									wishListStore.checkExists(props.data.id) ? 'text-info' : null
								}  mb-5 hidden-md-and-up`"
							>
							</v-btn>
							<v-spacer />
						</v-card-actions>
						<v-spacer />
						<v-btn
							color="blue"
							size="large"
							@click="
								addToCart(props.data.variations[0].id, qty),
									(cartStore.cartLoaded = true)
							"
							block
							class="ml-0"
							>{{ $t('productDetails.buyItNowBtn') }}</v-btn
						>
					</v-col>
				</v-row>
			</v-card>
		</v-container>
	</v-layout>
	<v-container>
		<v-card>
			<v-tabs bg-color="blue" style="align-items: center" fixed-tabs>
				<div>
					{{ $t('productDetails.evaluationTitle') }}
				</div>
			</v-tabs>
			<v-card-text>
				<v-window model-value="one">
					<v-window-item value="one">
						<v-card class="d-flex flex-wrap mx-md-auto py-md-8" elevation="0">
							<v-col cols="12" md="6" class="order-1">
								<v-list
									bg-color="transparent"
									class="d-flex flex-column-reverse"
									density="compact"
								>
									<v-list-item v-for="(rating, i) in 5" :key="i">
										<v-progress-linear
											:model-value="(i + 1) * 0"
											color="yellow-darken-3"
											height="10"
										></v-progress-linear>

										<template v-slot:append>
											<v-icon
												v-bind:key="star"
												v-for="star in 5"
												icon="mdi-star"
												:color="`${star >= i + 1 ? 'yellow-darken-3' : 'grey'}`"
												class="mx-md-3 ma-0 pa-0"
											></v-icon>
										</template>

										<template v-slot:prepend>
											<div class="rating-values">
												<span class="d-flex justify-end pa-md-4">
													{{ props.data.review_summary[`count_${5 - i}`] }}
												</span>
											</div>
										</template>
									</v-list-item>
								</v-list>
							</v-col>
							<v-col cols="12" md="6" class="ma-auto order-0 order-md-2">
								<div class="d-flex justify-center mt-auto text-h5">
									{{ $t('productDetails.ratingTitle') }}
								</div>

								<div class="d-flex align-center flex-column my-auto">
									<div class="text-h2 mt-5">
										{{ props.data.review_summary.average }}
										<span class="text-h6 ml-n3">/5</span>
									</div>

									<div class="d-flex align-center flex-wrap my-auto pa-4">
										<v-icon
											v-for="star in 5"
											v-bind:key="star"
											icon="mdi-star"
											:color="`${
												star !== 0 && star <= props.data.review_summary.average
													? 'yellow-darken-3'
													: 'grey'
											} `"
											class="mx-md-3"
										></v-icon>
									</div>
									<div class="px-3">
										{{ props.data.review_summary.total_count }} ratings
									</div>
								</div>
							</v-col>
							<v-col cols="12" class="order-3">
								<v-divider />
								<v-card-text>
									<h4>{{ $t('productDetails.reviewTitle') }}:</h4>
								</v-card-text>
								<v-card
									v-if="reviews.length"
									height="200"
									class="d-flex flex-wrap elevation-0 w-100 overflow-auto"
								>
									<div
										v-for="user in reviews"
										:key="user"
										class="w-100 d-flex flex-wrap"
									>
										<v-avatar
											size="80"
											class="justify-center align-self-center"
										>
											<v-img
												class="pulse"
												:src="user.user.avatar"
												cover
											></v-img>
										</v-avatar>
										<v-col>
											<v-card-title>
												{{ user.user.name }}
											</v-card-title>
											<v-card-subtitle>
												{{ user.time }}
											</v-card-subtitle>
											<v-card-text class="text-start">
												{{ user.comment }}
											</v-card-text>
										</v-col>
										<v-divider />
									</div>
								</v-card>
								<v-card-text v-else>
									<h4>{{ $t('productDetails.noReviewTitle') }}</h4>
								</v-card-text>
								<v-col cols="12">
									<h3 class="text-start ml-0 pl-0">
										{{ $t('productDetails.addCommentTitle') }}
									</h3>
								</v-col>
								<v-col class="elevation-0 pb-10 w-100">
									<v-rating
										v-model="form.rating"
										bg-color="orange-lighten-1"
										color="blue"
									></v-rating>

									<v-col class="mx-0 px-0 my-5">
										<v-textarea
											hide-details
											density="compact"
											v-model="form.comment"
											class="rounded"
											color="info"
											name="name"
											:label="$t('productDetails.commentLabel')"
											required
											auto-grow
										></v-textarea>
									</v-col>
									<v-btn
										color="blue"
										size="large"
										block
										@click="submitReview"
										class="ml-0"
										>{{ $t('productDetails.submitBtn') }}</v-btn
									>
								</v-col>
							</v-col>
						</v-card>
					</v-window-item>
				</v-window>
			</v-card-text>
		</v-card>
	</v-container>

	<ProductSlider :id="props.data.id" />
</template>
