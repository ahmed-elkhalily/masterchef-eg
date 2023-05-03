<script setup></script>

<template>
	<v-layout
		class="d-flex flex-wrap justify-center pa-md-12"
		style="background-color: #005490; color: white"
	>
		<Transition name="aboutUsSec" appear>
			<v-container class="text-center">
				<v-card-title>
					{{ $t('aboutUsCard.title') }}
				</v-card-title>
				<v-card-text class="text-center">
					{{ $t('aboutUsCard.body') }}
				</v-card-text>
			</v-container>
		</Transition>
	</v-layout>
</template>
<style scoped>
.aboutUsSec-enter-from {
	opacity: 0;
}

.aboutUsSec-enter-to {
	opacity: 1;
}

.aboutUsSec-enter-active {
	transition: all 1.5s ease-in;
}
</style>
