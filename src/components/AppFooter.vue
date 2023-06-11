<script setup>
import { watchEffect, ref } from 'vue'
import { useSettingStore, useOurClientsStore, useCategoryStore } from '../stores/index.js'
import { useI18n } from 'vue-i18n'

const settingStore = useSettingStore()
const clientsStore = useOurClientsStore()
const categoryStore = useCategoryStore()

const data = ref(await settingStore.getFooter())
const partners = ref()

async function loadData() {
	const clients = await clientsStore.load()
	partners.value = clients.slice(0, 4)
}

const { locale } = useI18n({ useScope: 'global' })
watchEffect(async() => {
	loadData()
})

</script>

<template>
	<v-footer
		style="background-color: #005490"
		class="text-white text-center mt-12 py-12"
	>
		<v-container>
			<div class="mb-3">
				<div class="footer__logo mb-2">
					<div class="footer__logo-qrcode">
						<div>
							<v-img
								class="logo"
								:src="data?.footer_logo"
								height="80"
								width="200"
							/>
						</div>
						<div
							style="
								padding: 0.125rem;
								background: white;
								border-radius: 0.5rem;
							"
						>
							<v-img
								width="100"
								height="100"
								src="./QR_code_for_mobile_English_Wikipedia.svg.png"
							></v-img>
						</div>
					</div>
				</div>
				<v-spacer />
				<v-divider />
			</div>
			<v-row no-gutter>
				<v-col cols="6" xs="6" md="3" class="text-start">
					<v-card-text class="ml-0 pl-0" style="color: #42c0f9">
						<p style="cursor: pointer" class="text-subtitle-1 font-weight-bold">
							{{ $t('appFooter.categoryTitle') }}
						</p>
					</v-card-text>
					<router-link
						style="color: inherit; text-decoration: inherit"
						v-for="item in categoryStore.items"
						:key="item"
						:to="`/category/${item.id}/product/`"
					>
						<p class="py-2">{{ item.name }}</p>
					</router-link>
				</v-col>

				<v-col cols="6" xs="6" md="3" class="text-start">
					<v-card-text class="ml-0 pl-0" style="color: #42c0f9">
						<p style="cursor: pointer" class="text-subtitle-1 font-weight-bold">
							{{ $t('appFooter.myAccountTitle') }}
						</p>
					</v-card-text>
					<router-link
						style="color: inherit; text-decoration: inherit"
						:to="`/user`"
					>
						<p class="py-2">{{ $t('userBoard.tabs.dashboardName') }}</p>
					</router-link>
					<router-link
						style="color: inherit; text-decoration: inherit"
						:to="`/user#accountDetails`"
					>
						<p class="py-2">{{ $t('userBoard.tabs.accountDetailsName') }}</p>
					</router-link>
					<router-link
						style="color: inherit; text-decoration: inherit"
						:to="`/user#orders`"
					>
						<p class="py-2">{{ $t('userBoard.tabs.orderName') }}</p>
					</router-link>
					<router-link
						style="color: inherit; text-decoration: inherit"
						:to="`/user#wishlist`"
					>
						<p class="py-2">{{ $t('userBoard.tabs.wishlistName') }}</p>
					</router-link>
				</v-col>
				<v-col cols="6" xs="6" md="3" class="text-start">
					<v-card-text class="ml-0 pl-0" style="color: #42c0f9">
						<p style="cursor: pointer" class="text-subtitle-1 font-weight-bold">
							{{ $t('appFooter.policyTitle') }}
						</p>
					</v-card-text>
					<router-link
						style="color: inherit; text-decoration: inherit"
						v-for="(item, i) in data.footer_policy"
						:key="item"
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
				<v-col cols="12" sm="6" md="3" class="text-start">
					<v-card-text style="color: #42c0f9">
						<p class="text-subtitle-1 font-weight-bold">
							{{ $t('appFooter.contactUsTitle') }}
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
						<a v-bind:href="'tel:' + data.contact_info.contact_phone" style="color: inherit; text-decoration: none;" >
								{{ data.contact_info.contact_phone }}
						</a>
					</v-card-text>
					<v-card-text class="headline px-0">
						<v-icon icon="mdi-fax mr-2"></v-icon>
						{{ data.contact_info.contact_fax }}
					</v-card-text>
				</v-col>
			</v-row>

			<v-container class="mt-5">
				<v-card-text class="mb-2" style="color: #42c0f9; font-size: 1.5rem">
					<p class="text-subtitle-1 font-weight-bold ">
						<router-link class="" to="/our-clients" style="color: #42c0f9; font-size: 1.125rem; text-decoration: none;">
							{{ $t('appFooter.ourClients') }}
						</router-link>
					</p>
				</v-card-text>
				<v-row v-if="partners">
					<v-col
						v-for="(partner) in partners"
						:key="partner.name"
						cols="6"
						sm="4"
						md="3"
						class="our-clients"
					>
						<div class="our-clients__item">
							<router-link to="/our-clients">
								<v-img
									class="our-clients__img"
									:src="partner.avatar"
									:alt="partner.name"
									height="100px"
								/>
							</router-link>
						</div>
					</v-col>
				</v-row>
			</v-container>
			<strong>@{{ data.copyright_text }}</strong>
		</v-container>
	</v-footer>
</template>

<style lang="scss">
.our-clients {
	&__item {
		text-align: center;
		border-radius: 3.5px;
		padding: 0.5rem;
		background: white;
	}
	&__title {
		margin-top: 1rem;
		font-size: 1.23rem;
		color: #313131;
		font-weight: 600;
	}
}
.footer__logo-qrcode {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

@media (min-width: 320px) and (max-width: 568px) {
	.footer__logo-qrcode {
		flex-direction: column;
	}
}
</style>
