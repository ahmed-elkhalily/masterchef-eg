<template>
	<v-layout
		style="padding-top: 5%"
		class="d-flex flex-wrap ma-12 justify-center"
	>
		<Transition name="horizontalPic" appear>
			<v-img
				class="h-50 hidden-sm-and-down pulse"
				style="
					position: absolute;
					z-index: 3000;
					width: 35%;
					left: 25%;
					top: -10%;
				"
				src="./welcome2.jpg"
				height="450"
				width="500"
				cover
			></v-img>
		</Transition>
		<Transition name="horizontalPicMobile" appear>
			<v-img
				class="h-50 hidden-md-and-up pulse"
				style="position: absolute; z-index: 3000; width: 80%; top: -20%"
				src="./welcome2.jpg"
				height="450"
				width="500"
				cover
			></v-img>
		</Transition>

		<v-card
			style="padding-top: 5%"
			class="w-25 hidden-sm-and-down d-flex flex-wrap elevation-0 h-25 justify-left align-self-center"
		>
			<v-card-title class="hidden-sm-and-down">
				{{ $t('mainPage.title') }}
			</v-card-title>
			<v-card-text class="text-left hidden-sm-and-down">
				{{ $t('mainPage.body') }}
			</v-card-text>
		</v-card>
		<v-col cols="12" md="3" class="elevation-0 outer">
			<Transition name="verticalPic" appear>
				<v-img
					class="pulse"
					src="./welcome1.jpg"
					height="450"
					width="500"
					cover
				></v-img>
			</Transition>
		</v-col>
	</v-layout>
</template>

<style scoped>
.verticalPic-enter-from {
	opacity: 0;
	transform: translateX(110%);
}

.verticalPic-enter-to {
	opacity: 1;
}

.verticalPic-enter-active {
	transition: all 1s ease;
}

.horizontalPic-enter-from {
	opacity: 0;
	transform: translateX(-50%);
}

.horizontalPic-enter-to {
	opacity: 1;
}

.horizontalPic-enter-active {
	transition: all 1s ease;
}

.horizontalPicMobile-enter-from {
	opacity: 0;
	transform: translateY(-50%);
}

.horizontalPicMobile-enter-to {
	opacity: 1;
}

.horizontalPicMobile-enter-active {
	transition: all 1s ease;
}
</style>
