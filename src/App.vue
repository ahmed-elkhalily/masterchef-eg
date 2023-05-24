<script setup>
import NavBar from './components/NavBar.vue'
import ErrorMessage from './components/ErrorMessage.vue'
import Footer from './components/AppFooter.vue'
import Cart from './components/AppCart.vue'
import SideMedias from './components/SideMedias.vue'
import { useI18n } from 'vue-i18n'
import './styles/index.css'

const { locale } = useI18n({ useScope: 'global' })

locale.value = localStorage.getItem('siteLang') || 'en'

// Get a reference to the storage element
const storage = window.localStorage

// Read the stored language preference and update the HTML tag attributes
const lang = storage.getItem('siteLang')
if (lang) {
	document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr')
	document.documentElement.setAttribute('lang', lang)
}
</script>

<template>
	<v-locale-provider :rtl="locale === 'ar' ? true : false">
		<v-app>
			<Suspense>
				<NavBar />
			</Suspense>
			<Suspense>
				<Cart />
			</Suspense>
			<v-main>
				<ErrorMessage />
				<Suspense>
					<router-view />
				</Suspense>
			</v-main>
			<Suspense>
				<Footer></Footer>
			</Suspense>
			<SideMedias />
		</v-app>
	</v-locale-provider>
</template>

<style>
.sweetAlertZConfig {
	z-index: 100000000 !important;
}

.pulse:hover {
	border-color: #00aadc;
	overflow: inherit;
	z-index: 0;
	-webkit-transition: all 0.3s ease-in-out;
	-moz-transition: all 0.3s ease-in-out;
	-o-transition: all 0.3s ease-in-out;
	transition: all 0.3s ease-in-out;
	-webkit-animation-name: animate;
	-webkit-animation-duration: 2s;
	-webkit-animation-iteration-count: 1;
}

.v-application .py-1:hover {
	background-color: #ffc120;
}

.img-fit:hover {
	border-color: #00aadc;
	overflow: inherit;
	z-index: 10;
	-webkit-transition: all 0.3s ease-in-out;
	-moz-transition: all 0.3s ease-in-out;
	-o-transition: all 0.3s ease-in-out;
	transition: all 0.3s ease-in-out;
	-webkit-animation-name: animate;
	-webkit-animation-duration: 2s;
	-webkit-animation-iteration-count: 1;
}

@keyframes animate {
	0% {
		transform: scale(1);
	}

	50% {
		transform: scale(1.1);
	}

	100% {
		transform: scale(1);
	}
}

body {
	font-family: 'Cairo', 'sans-serif';
}
</style>
