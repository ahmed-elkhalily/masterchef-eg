<script setup>
const props = defineProps({
	data: Array,
	animation: Boolean
})
</script>

<template>
	<v-container>
		<v-layout
			v-for="(category, i) in props.data"
			:key="i"
			class="d-flex flex-wrap justify-center mt-12"
		>
			<v-col
				v-motion
				:initial="{
					opacity: !props.animation ? 1 : 0,
					x: !props.animation ? 0 : i % 2 === 0 ? -200 : 200
				}"
				:visibleOnce="{
					opacity: 1,
					x: 0,
					transition: { repeat: 0, duration: 800, type: 'all', ease: 'easeIn' }
				}"
				md="6"
				cols="12"
				:class="`d-flex flex-wrap justify-center align-self-center elevation-0 order-md-${
					i % 2 === 0 ? '0' : '2'
				}`"
			>
				<v-img
					class="pulse"
					:src="category.banner"
					height="450"
					width="500"
				></v-img>
			</v-col>

			<v-col
				v-motion
				:initial="{
					opacity: !props.animation ? 1 : 0,
					x: !props.animation ? 0 : i % 2 === 0 ? -200 : 200
				}"
				:visibleOnce="{
					opacity: 1,
					x: 0,
					transition: { repeat: 0, duration: 800, type: 'all', ease: 'easeIn' }
				}"
				md="6"
				cols="12"
				class="d-flex flex-wrap elevation-0 h-25 order-1 justify-center align-self-center"
			>
				<v-card-title>
					<h2>
						{{ category.name }}
					</h2>
				</v-card-title>
				<v-card-text class="text-center">
					<p style="font-size: 1.25rem">
						{{ category.description }}
					</p>
				</v-card-text>

				<v-hover>
					<template v-slot:default="{ isHovering, props }">
						<v-btn
							v-bind="props"
							:color="isHovering ? '#005490' : '#42c0f9'"
							class="text-white"
							variant="flat"
							:to="`/category/${category.id}/product/`"
						>
							{{ $t('categoryCard.detailsBtn') }}
						</v-btn>
					</template>
				</v-hover>
			</v-col>
		</v-layout>
	</v-container>
</template>
