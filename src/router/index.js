import { createRouter, createWebHashHistory } from 'vue-router'

import MainView from '../views/MainView.vue'
import ProductView from '../views/ProductView.vue'
import UserBoardView from '../views/UserBoardView.vue'
import Categories from '../views/CategoryView.vue'
import CheckOut from '../components/CheckOut.vue'
import AuthView from '../views/AuthView.vue'
import OfferView from '../views/OfferView.vue'
import PolicyView from '../views/PolicyView.vue'
import ContactUs from '../views/ContactUs.vue'
import OurClients from '../views/OurClients.vue'

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	scrollBehavior(to, from, savedPosition) {
		if (to.path !== from.path || to.path === '/') {
			return { top: 0 }
		}
		return savedPosition
	},
	routes: [
		{
			path: '/',
			name: 'main',
			component: MainView
		},
		{
			path: '/category/:categoryId/product/',
			name: 'categoryProducts',
			component: Categories
		},
		{
			path: '/product/:productId',
			name: 'productDetails',
			component: ProductView
		},
		{
			path: '/product/',
			name: 'productList',
			component: ProductView
		},
		{
			path: '/login',
			name: 'login',
			component: AuthView
		},
		{
			path: '/verify',
			name: 'verify',
			component: AuthView
		},
		{
			path: '/registration',
			name: 'signup',
			component: AuthView
		},
		{
			path: '/resetPassword',
			name: 'resetPassword',
			component: AuthView
		},
		{
			path: '/policy/:id',
			name: 'policy',
			component: PolicyView
		},
		{
			path: '/user',
			name: 'userBoard',
			component: UserBoardView
		},
		{
			path: '/category',
			name: 'categories',
			component: Categories
		},
		{
			path: '/checkOut',
			name: 'checkOut',
			component: CheckOut
		},
		{
			path: '/offer',
			name: 'offer',
			component: OfferView
		},
		{
			path: '/offer/:offerId',
			name: 'offerProducts',
			component: OfferView
		},
		{
			path: '/contact-us',
			name: 'contact-us',
			component: ContactUs
		},
		{
			path: '/our-clients',
			name: 'our-clients',
			component: OurClients
		}
	]
})

router.beforeEach((to, from, next) => {
	if (to.path === '/user' || to.path === '/checkOut') {
		if (!localStorage.getItem('MasterchefToken')) {
			router.push('/login')
		}
	}
	next()
})

export default router
