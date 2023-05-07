<script setup></script>

<template>
	<v-layout
		class="d-flex flex-wrap justify-center pa-md-12"
		style="background-color: #005490; color: white"
	>
		<Transition name="aboutUsSec" appear>
			<v-container class="text-center">
				<v-card-title>
					<h2>
						{{ $t('aboutUsCard.title') }}
					</h2>
				</v-card-title>
				<v-card-text class="text-center">
					<p class="mb-2" style="font-size: 1.25rem">
						{{ $t('aboutUsCard.about1') }}
					</p>
					<p class="mb-2" style="font-size: 1.25rem">
						{{ $t('aboutUsCard.about2') }}
					</p>
					<p class="mb-2" style="font-size: 1.25rem">
						{{ $t('aboutUsCard.about3') }}
					</p>
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
