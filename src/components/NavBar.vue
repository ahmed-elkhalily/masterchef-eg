<script setup>
import { useRouter } from 'vue-router'
import { useCartStore, useWishListStore } from '../stores/index.js'
import { useI18n } from 'vue-i18n'
const router = useRouter()
const cartStore = useCartStore()
const wishListStore = useWishListStore()
wishListStore.load()

const { locale } = useI18n({ useScope: 'global' })

const lang = [
	{ name: 'العربية', value: 'ar' },
	{ name: 'English', value: 'en' }
]

const changeLanguage = (lang) => {
	locale.value = lang
	// change language...
	localStorage.setItem('siteLang', lang)
	location.reload()
}
</script>
<style lang="scss">
.change-lang {
	&.v-select .v-field .v-field__append-inner > .v-icon {
		margin-inline-start: -10px;
		margin-block: 0.2rem;
	}
}
.bg-info {
	color: white !important;
}
</style>

<template>
	<v-locale-provider :rtl="locale === 'ar' ? true : false">
		<v-app-bar>
			<v-menu location="bottom">
				<template v-slot:activator="{ props }">
					<v-app-bar-nav-icon
						v-bind="props"
						class="hidden-md-and-up"
					></v-app-bar-nav-icon>
				</template>

				<v-list>
					<v-list-item to="/user">
						<v-icon>mdi-account-outline</v-icon>
						{{ " " }}
						<span>{{ $t('navbar.dashboardBtn') }}</span>
					</v-list-item>

					<v-list-item to="/product">
						<v-icon>mdi-shopping-outline</v-icon>
						{{ " " }}
						<span>{{ $t('navbar.productBtn') }}</span>
					</v-list-item>
					<v-list-item to="/category">
						<v-icon>mdi-view-grid-outline</v-icon>
						{{" "}}
						<span> {{ $t('navbar.categoryBtn') }}</span>
					</v-list-item>

					<v-list-item to="/offer">
						<v-icon>mdi-percent</v-icon
						>
							{{" "}}
						<span> {{ $t('navbar.offersBtn') }}</span>
					</v-list-item>
					<v-list-item to="/contact-us">
							<v-icon>mdi-contacts</v-icon>
							{{" "}}
							<span>
								{{ $t('navbar.contactUs') }}
							</span>
					</v-list-item>
					<v-list-item to="/our-clients">
							<v-icon>mdi-account-group</v-icon>
							{{" "}}
							<span>
								{{ $t('navbar.ourClients') }}
							</span>
					</v-list-item>
					<v-list-item
						@click="router.push({ path: '/user', hash: '#wishlist' })"
					>
						<v-icon>mdi-heart-outline</v-icon>
						{{ " " }}
						<span> {{ $t('navbar.wishlistBtn') }}</span>
					</v-list-item>
				</v-list>
			</v-menu>

			<v-spacer />
			<router-link to="/">
				<v-avatar rounded="0" size="50">
					<v-img src="./logo.jpg"></v-img>
				</v-avatar>
			</router-link>
			<v-spacer class="hidden-md-and-up" />

			<v-btn
				variant="text"
				class="h-100 hidden-sm-and-down rounded-0"
				to="/product"
			>
				{{ $t('navbar.productBtn') }}
			</v-btn>
			<v-btn
				variant="text"
				class="h-100 hidden-sm-and-down rounded-0"
				to="/category"
			>
				{{ $t('navbar.categoryBtn') }}
			</v-btn>
			<v-btn
				variant="text"
				class="h-100 hidden-sm-and-down rounded-0"
				to="/contact-us"
			>
				{{ $t('navbar.contactUs') }}
			</v-btn>
			<v-btn
				variant="text"
				class="h-100 hidden-sm-and-down rounded-0"
				to="/our-clients"
			>
				{{ $t('navbar.ourClients') }}
			</v-btn>

			<v-btn
				variant="text"
				class="h-100 hidden-sm-and-down rounded-0"
				to="/offer"
			>
				{{ $t('navbar.offersBtn') }}
			</v-btn>

			<v-btn
				class="text-none hidden-sm-and-down"
				stacked
				@click="router.push({ path: '/user', hash: '#wishlist' })"
			>
				<v-badge
					text-color="white"
					color="#42c0f9"
					floating
					:content="wishListStore.numOfElement"
				>
					<v-icon>mdi-heart-outline</v-icon>
				</v-badge>
			</v-btn>

			<v-btn class="text-none" stacked @click="cartStore.cartLoaded = true">
				<v-badge
					floating
					text-color="white"
					color="#42c0f9"
					:content="cartStore.numOfElement"
				>
					<v-icon>mdi-cart-outline</v-icon>
				</v-badge>
			</v-btn>

			<v-btn class="text-none hidden-sm-and-down" to="/user" stacked>
				<v-icon size="large">mdi-account-outline</v-icon>
			</v-btn>

			<div class="pa-2 mb-2">
				<v-select
					hide-details
					@update:modelValue="(res) => changeLanguage(res)"
					variant="plain"
					density="compact"
					class="rounded change-lang"
					color="info"
					v-model="locale"
					:items="lang"
					item-title="name"
					item-value="value"
				></v-select>
			</div>
			<v-spacer class="hidden-sm-and-down" />
		</v-app-bar>
	</v-locale-provider>
</template>
