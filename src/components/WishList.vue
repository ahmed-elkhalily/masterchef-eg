<script setup>
	import { useWishListStore, useCartStore } from "../stores/index.js";
	import alerts from "../alerts/alert.js";
	import { useI18n } from "vue-i18n";

	const { locale } = useI18n({ useScope: "global" });

	const wishlistStore = useWishListStore();
	const cartStore = useCartStore();
	const alert = alerts();

	await wishlistStore.load();

	const addToCart = async (id, qty) => {
		const res = await cartStore.add(id, qty);
		if (res) {
			alert.message("Added successfully");
		}
	};

	const addToWishList = async (id) => {
		const res = await wishlistStore.addAndRemoveElement(id);
		if (res) {
			alert.message(" Operation done successfully");
		}
	};
</script>

<template>
	<v-layout class="d-flex flex-wrap ma-auto justify-center align-self-center">
		<v-hover v-for="(item, i) in wishlistStore.items" :key="i">
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
						<router-link :to="`/product/${item.slug}`">
							<v-img
								class="pulse"
								:src="item.thumbnail_image"
								height="270"
								cover
							/>
						</router-link>
						<v-row
							v-if="isHovering"
							class="ma-0 w-100 justify-center hidden-sm-and-down"
							style="position: absolute; bottom: 2%"
						>
							<v-btn
								icon="mdi-heart"
								@click="addToWishList(item.id)"
								class="text-info ma-2 pt-1 hovered-icon"
								size="small"
								color="white"
							></v-btn>
							<v-btn
								icon="mdi-magnify"
								:to="`/product/${item.slug}`"
								size="small"
								class="ma-2 pt-1 text-info hovered-icon"
								color="white "
							></v-btn>
							<v-btn
								icon="mdi-cart-outline"
								@click="addToCart(item.variations[0].id, item.min_qty || 1)"
								size="small"
								class="ma-2 pt-1 text-info hovered-icon"
								color="white"
							></v-btn>
						</v-row>
					</v-card>
					<v-row class="ma-0 w-100 justify-center hidden-md-and-up">
						<v-btn
							icon="mdi-heart"
							@click="addToWishList(item.id)"
							size="small"
							class="text-info ma-2 pt-1"
							color="white"
						></v-btn>
						<v-btn
							icon="mdi-cart-outline"
							@click="addToCart(item.variations[0].id, item.min_qty || 1)"
							size="small"
							class="ma-2 pt-1 text-info"
							color="white"
						></v-btn>
					</v-row>

					<v-card-title
						style="background-color: #005490"
						class="text-white text-center"
					>
						<p>
							{{ locale === "ar" ? "..." : "" }}{{ item.name.substring(0, 30) }}
							{{ locale === "en" ? "..." : "" }}
						</p>
						<v-card-subtitle class="text-subtitle-2">
							<span
								:class="`${
									item.base_price > item.base_discounted_price &&
									'text-decoration-line-through'
								}`"
							>
								{{ item.base_price }} {{ $t("currencyLabel") }}
							</span>
							<span
								v-if="item.base_price > item.base_discounted_price"
								class="text-info pa-2"
							>
								{{ item.base_discounted_price }} {{ $t("currencyLabel") }}
							</span>
						</v-card-subtitle>
					</v-card-title>
				</v-card>
			</template>
		</v-hover>
	</v-layout>
</template>
