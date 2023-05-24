<script setup>
const props = defineProps({
	data: Array
})
</script>

<style lang="scss">
.offer-banner {
	// height: 300px;
}
@media (max-width: 768px) {
	.offer-banner {
		height: auto;
	}
}
</style>

<template>
	<v-container>
		<v-card
			v-for="(offer, i) in props.data"
			:key="i"
			class="mx-2 my-3 w-100 elevation-0"
		>
			<router-link :to="`/offer/${offer.slug}`">
				<v-img class="pulse offer-banner" :src="offer.banner" />
			</router-link>
			<v-card-title class="text-start ml-0 pl-0">
				<p>{{ offer.title }}</p>
				<v-card-subtitle class="ml-0 pl-0">
					<span>
						{{
							new Date(offer.start_date).toLocaleDateString('en-us', {
								year: 'numeric',
								month: 'short',
								day: 'numeric'
							})
						}}
						-
					</span>
					<span>
						{{
							new Date(offer.end_date).toLocaleDateString('en-us', {
								year: 'numeric',
								month: 'short',
								day: 'numeric'
							})
						}}
					</span>
				</v-card-subtitle>
			</v-card-title>
		</v-card>
	</v-container>
</template>
