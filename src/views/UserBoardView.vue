<script setup>
	import { watchEffect } from "vue";
	import AppLoading from "../components/AppLoading.vue";
	import UserBoardVue from "../components/UserBoard.vue";
	import { useAuthStore, useWishListStore } from "../stores/index.js";
	const authStore = useAuthStore();
	const wishlistStore = useWishListStore();
	async function loadData() {
		await authStore.userInfo();
		await wishlistStore.load();
	}

	watchEffect(async () => {
		loadData();
	});
</script>

<template>
	<Suspense>
		<AppLoading v-if="!authStore.user" />
		<UserBoardVue v-else />
	</Suspense>
</template>
