<script setup>
	import { ref, watchEffect } from "vue";
	import { useRoute, useRouter } from "vue-router";
	import { useAuthStore } from "../stores/index.js";
	import { useI18n } from "vue-i18n";
	import Wishlist from "./WishList.vue";
	import AddressList from "./AddressList.vue";
	import OrderSection from "./OrderSection.vue";
	import alerts from "../alerts/alert";

	const alert = alerts();
	const authStore = useAuthStore();
	const route = useRoute();
	const router = useRouter();
	const { tm } = useI18n();

	const tab = ref("dashboard");
	const pic = ref();

	const user = ref(authStore.user || {});

	watchEffect(() => {
		if (route.hash.slice(1)) {
			tab.value = route.hash.slice(1);
			router.replace({ path: "/user" });
		}
	});

	const userDashboardData = [
		{
			name: tm("userBoard.tabs.orderName"),
			icon: "mdi-file-document-outline",
			tab: "orders",
		},
		{
			name: tm("userBoard.tabs.addressName"),
			icon: "mdi-map-marker-radius-outline",
			tab: "addresses",
		},
		{
			name: tm("userBoard.tabs.accountDetailsName"),
			icon: "mdi-account-circle-outline",
			tab: "accountDetails",
		},
		{
			name: tm("userBoard.tabs.wishlistName"),
			icon: "mdi-heart-outline",
			tab: "wishlist",
		},
		{
			name: tm("userBoard.tabs.logoutName"),
			icon: "mdi-logout",
			tab: "logOut",
		},
	];

	const changeTab = (tabName) => {
		if (tabName === "logOut") {
			authStore.logOut();
			router.push({ path: "/" });
		} else {
			tab.value = tabName;
		}
	};

	const updateUser = async () => {
		const data = { ...user.value, avatar: pic.value };
		const res = await authStore.editUser(data);
		if (res) {
			alert.message("Updated successfully");
		}
	};
</script>

<template>
	<v-col cols="12" md="9" class="d-flex flex-wrap ma-auto py-md-12">
		<v-col cols="12" md="3" class="pt-10">
			<h3 class="text-center text-md-left py-4">
				{{ $t("userBoard.title") }}
			</h3>

			<v-tabs
				v-model="tab"
				class="hidden-sm-and-down"
				color="info"
				direction="vertical"
			>
				<v-tab value="dashboard">{{
					$t("userBoard.tabs.dashboardName")
				}}</v-tab>
				<v-tab value="orders">{{ $t("userBoard.tabs.orderName") }}</v-tab>
				<v-tab value="addresses">{{ $t("userBoard.tabs.addressName") }}</v-tab>
				<v-tab value="accountDetails">{{
					$t("userBoard.tabs.accountDetailsName")
				}}</v-tab>
				<v-tab value="wishlist">{{ $t("userBoard.tabs.wishlistName") }}</v-tab>
				<v-tab
					@click="
						authStore.logOut();
						router.push({ path: '/' });
					"
					>{{ $t("userBoard.tabs.logoutName") }}</v-tab
				>
			</v-tabs>
			<v-tabs v-model="tab" class="hidden-md-and-up" show-arrows color="info">
				<v-tab value="dashboard">{{
					$t("userBoard.tabs.dashboardName")
				}}</v-tab>
				<v-tab value="orders">{{ $t("userBoard.tabs.orderName") }}</v-tab>
				<v-tab value="addresses">{{ $t("userBoard.tabs.addressName") }}</v-tab>
				<v-tab value="accountDetails"
					>{{ $t("userBoard.tabs.accountDetailsName") }} details</v-tab
				>
				<v-tab value="wishlist">{{ $t("userBoard.tabs.wishlistName") }}</v-tab>
				<v-tab value="logOut">{{ $t("userBoard.tabs.logoutName") }}</v-tab>
			</v-tabs>
		</v-col>
		<v-col cols="12" md="9">
			<v-container class="w-100">
				<v-window v-model="tab">
					<v-window-item value="dashboard">
						<v-layout
							class="d-flex flex-wrap justify-start align-self-start w-100"
						>
							<v-hover v-for="(item, i) in userDashboardData" :key="i">
								<template v-slot:default="{ isHovering, props }">
									<v-col
										style="cursor: pointer"
										cols="10"
										md="3"
										@click="changeTab(item.tab)"
										v-bind="props"
										class="elevation-4 pa-4 ma-4"
									>
										<v-card-text class="text-center">
											<v-icon
												size="50"
												style=""
												:color="`${isHovering ? '#005490 ' : 'info'}`"
												>{{ item.icon }}</v-icon
											>
										</v-card-text>
										<v-card-title :class="`text-center`">
											{{ item.name }}
										</v-card-title>
									</v-col>
								</template>
							</v-hover>
						</v-layout>
					</v-window-item>
					<v-window-item value="orders" class="hidden-sm-and-down">
						<Suspense>
							<OrderSection />
						</Suspense>
					</v-window-item>
					<v-window-item value="orders" class="hidden-md-and-up">
						<Suspense>
							<OrderSection :mobile="true" />
						</Suspense>
					</v-window-item>
					<v-window-item value="addresses">
						<Suspense>
							<AddressList />
						</Suspense>
					</v-window-item>
					<v-window-item value="accountDetails">
						<v-col
							cols="12"
							md="6"
							class="d-flex flex-column justify-left align-self-left pa-4"
						>
							<v-avatar
								size="200"
								class="justify-center align-self-center hidden-sm-and-down elevation-4"
							>
								<v-img :src="user.avatar" cover></v-img>
							</v-avatar>

							<v-avatar
								size="80"
								class="justify-center align-self-center elevation-4 hidden-md-and-up"
							>
								<v-img :src="user.avatar" cover></v-img>
							</v-avatar>

							<v-text-field
								class="pa-4 mr-2 ma-auto"
								v-model="pic"
								type="file"
								hide-details
								density="compact"
								variant="plain"
							></v-text-field>

							<v-text-field
								hide-details
								density="compact"
								class="elevation-2 my-4 pt-2 pl-3 rounded"
								color="blue"
								variant="plain"
								name="name"
								:label="$t('userBoard.nameLabel')"
								v-model="user.name"
								required
							/>

							<v-text-field
								hide-details
								density="compact"
								class="elevation-2 my-4 pt-2 pl-3 rounded"
								color="blue"
								variant="plain"
								name="phoneNumber"
								:label="$t('userBoard.phoneLabel')"
								v-model="user.phone"
								required
							/>
							<v-text-field
								hide-details
								density="compact"
								class="elevation-2 my-4 pt-2 pl-3 rounded"
								color="blue"
								variant="plain"
								name="email"
								:label="$t('userBoard.emailLabel')"
								type="email"
								v-model="user.email"
								@update:modelValue="
									(res) => (email = res.replace(/[^a-z0-9@ \.,_-]/gim, ''))
								"
								required
							/>
							<v-text-field
								hide-details
								density="compact"
								class="elevation-2 my-4 pt-2 pl-3 rounded"
								color="blue"
								variant="plain"
								name="password"
								:label="$t('userBoard.passwordLabel')"
								type="password"
								:placeholder="$t('userBoard.passwordPlaceholder')"
								v-model="user.password"
								@update:modelValue="
									(res) =>
										(password = res.replace(/[^a-z0-9!@#$%^&* \.,_-]/gim, ''))
								"
								active
								required
							/>
							<v-btn color="blue" class="my-4 pt-2" @click="updateUser"
								>submit
							</v-btn>
						</v-col>
					</v-window-item>
					<v-window-item value="wishlist">
						<Wishlist />
					</v-window-item>
				</v-window>
			</v-container>
		</v-col>
	</v-col>
</template>
