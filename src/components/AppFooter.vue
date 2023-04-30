<script setup>
	import { ref } from "vue";
	import { useSettingStore, useCategoryStore } from "../stores/index.js";
	import { useI18n } from "vue-i18n";

	const settingStore = useSettingStore();
	const categoryStore = useCategoryStore();

	const data = ref(await settingStore.getFooter());
	await categoryStore.load();
	const { locale } = useI18n({ useScope: "global" });
</script>
<template>
	<v-footer
		style="background-color: #005490"
		class="text-white text-center justify-center mt-12 py-12 px-5 d-flex flex-wrap"
	>
		<v-col cols="8">
			<v-img class="pulse" :src="data.footer_logo" height="80" width="200" />
			<v-spacer />
		</v-col>
		<v-col cols="8">
			<v-divider />
		</v-col>
		<v-col cols="8">
			<v-row>
				<v-col class="text-left">
					<v-card-text class="ml-0 pl-0" style="color: #42c0f9">
						<p style="cursor: pointer" class="text-subtitle-1 font-weight-bold">
							{{ $t("appFooter.categoryTitle") }}
						</p>
					</v-card-text>
					<router-link
						style="color: inherit; text-decoration: inherit"
						v-for="item in categoryStore.items"
						:to="`/category/${item.id}/product/`"
					>
						<p class="py-2">{{ item.name }}</p>
					</router-link>
				</v-col>
				<v-col class="text-left">
					<v-card-text class="ml-0 pl-0" style="color: #42c0f9">
						<p style="cursor: pointer" class="text-subtitle-1 font-weight-bold">
							{{ $t("appFooter.myAccountTitle") }}
						</p>
					</v-card-text>
					<router-link
						style="color: inherit; text-decoration: inherit"
						:to="`/user`"
					>
						<p class="py-2">{{ $t("userBoard.tabs.dashboardName") }}</p>
					</router-link>
					<router-link
						style="color: inherit; text-decoration: inherit"
						:to="`/user#accountDetails`"
					>
						<p class="py-2">{{ $t("userBoard.tabs.accountDetailsName") }}</p>
					</router-link>
					<router-link
						style="color: inherit; text-decoration: inherit"
						:to="`/user#orders`"
					>
						<p class="py-2">{{ $t("userBoard.tabs.orderName") }}</p>
					</router-link>
					<router-link
						style="color: inherit; text-decoration: inherit"
						:to="`/user#wishlist`"
					>
						<p class="py-2">{{ $t("userBoard.tabs.wishlistName") }}</p>
					</router-link>
				</v-col>
				<v-col class="text-left">
					<v-card-text class="ml-0 pl-0" style="color: #42c0f9">
						<p style="cursor: pointer" class="text-subtitle-1 font-weight-bold">
							{{ $t("appFooter.policyTitle") }}
						</p>
					</v-card-text>
					<router-link
						style="color: inherit; text-decoration: inherit"
						v-for="(item, i) in data.footer_policy"
						:to="`/policy/${i}`"
					>
						<p class="py-2">
							{{
								item.page_translations.find(
									(element) => element.lang === locale
								).title
							}}
						</p>
					</router-link>
				</v-col>
				<v-col class="text-left">
					<v-card-text style="color: #42c0f9">
						<p class="text-subtitle-1 font-weight-bold">
							{{ $t("appFooter.contactUsTitle") }}
						</p>
					</v-card-text>
					<v-card-text class="headline px-0">
						<v-icon icon="mdi-home mr-2"></v-icon>
						{{ data.contact_info.contact_address }}
					</v-card-text>
					<v-card-text class="headline px-0">
						<v-icon icon="mdi-email-outline mr-2"></v-icon>
						{{ data.contact_info.contact_email }}
					</v-card-text>
					<v-card-text class="headline px-0">
						<v-icon icon="mdi-phone-outline mr-2"></v-icon>
						{{ data.contact_info.contact_phone }}
					</v-card-text>
				</v-col>
			</v-row>
		</v-col>
		<v-col cols="8">
			<v-btn
				class="ma-2"
				variant="text"
				icon="mdi-facebook"
				color="info"
				style="background-color: white"
				density="comfortable"
			></v-btn>
			<v-btn
				density="comfortable"
				class="ma-2"
				variant="text"
				icon="mdi-instagram"
				style="background-color: white"
				color="red"
			></v-btn>
			<v-btn
				density="comfortable"
				class="ma-2"
				variant="text"
				icon="mdi-twitter"
				style="background-color: white"
				color="info"
			></v-btn>
		</v-col>
		<v-col cols="8">
			<strong>@{{ data.copyright_text }}</strong>
		</v-col>
	</v-footer>
</template>
