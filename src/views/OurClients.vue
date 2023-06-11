<script setup>
import { watchEffect, ref } from 'vue'
import { useOurClientsStore } from '../stores/index.js'

const clientsStore = useOurClientsStore()

const partners = ref()

async function loadData() {
	partners.value = await clientsStore.load()
}

watchEffect(async() => {
	loadData()
})

</script>

<template>
	<v-container class="mt-5">
		<v-row >
			<v-col
				v-for="partner in partners"
				:key="partner.name"
				cols="6"
				sm="4"
				md="3"
				class="our-clients"
			>
				<div class="our-clients__item">
					<v-img
						class="our-clients__img"
						:src="partner.avatar"
						:alt="partner.name"
						height="100px"
					/>
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<style lang="scss" scoped>
.our-clients {
	&__item {
		text-align: center;
		border-radius: 3.5px;
		padding: 0.5rem;
		box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
		background: white;
	}
	&__title {
		margin-top: 1rem;
		font-size: 1.23rem;
		color: #313131;
		font-weight: 600;
	}
}
</style>
