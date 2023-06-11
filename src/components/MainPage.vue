<template>
	<v-container>
		<div class="main-container">
			<div class="main-carusel">
				<div class="main-carusel__sec">
					<div class="main-carusel__item">
						<swiper-container
							lides-per-view="3"
							speed="500"
							loop="true"
							style="height: 100%"
							:autoplay="{
								delay: 1000
							}"
						>
							<swiper-slide>
								<v-img
									cover
									style="width: 100%; height: 100%"
									class="img"
									src="./to-delete/smallslider1(a).jpg"
								></v-img>
							</swiper-slide>
							<swiper-slide>
								<v-img
									cover
									style="width: 100%; height: 100%"
									class="img"
									src="./to-delete/smallslider1(b).jpg"
								></v-img>
							</swiper-slide>
						</swiper-container>
					</div>
					<div class="main-carusel__item">
						<swiper-container
							lides-per-view="3"
							speed="500"
							loop="true"
							style="height: 100%"
							:autoplay="{
								delay: 1000
							}"
						>
							<swiper-slide>
								<v-img
									cover
									style="width: 100%; height: 100%"
									class="img"
									src="./to-delete/smallslider1(c).jpg"
								></v-img>
							</swiper-slide>
							<swiper-slide>
								<v-img
									cover
									style="width: 100%; height: 100%"
									class="img"
									src="./to-delete/smallslider1(d).jpg"
								></v-img>
							</swiper-slide>
						</swiper-container>
					</div>
				</div>
				<div class="main-carusel__main">
					<swiper-container
						lides-per-view="3"
						speed="500"
						loop="true"
						style="height: 100%"
						:autoplay="{
							delay: 1000
						}"
					>

						<swiper-slide style="position: relative">
							<v-img
								cover
								style="width: 100%; height: 100%"
								class="img hidden-xs-and-down"
									src="./to-delete/slider-big-1.jpg"
							></v-img>
							<v-img
							contain
								style="width: 100%; height: 100%"
								class="img hidden-sm-and-up"
									src="./to-delete/slider-big-1.jpg"
							></v-img>
						</swiper-slide>
						<!-- <swiper-slide>
							<v-img
								cover
								style="width: 100%; height: 100%"
								class="img"
									src="./to-delete/slider-big-2.jpg"
							></v-img>
						</swiper-slide> -->
					</swiper-container>
				</div>
				<div class="main-carusel__sec">
					<div class="main-carusel__item">
						<swiper-container
							lides-per-view="3"
							speed="500"
							loop="true"
							style="height: 100%"
							:autoplay="{
								delay: 1000
							}"
						>
							<swiper-slide>
								<v-img
									cover
									style="width: 100%; height: 100%"
									class="img"
									src="./to-delete/smallslider2(a).jpg"
								></v-img>
							</swiper-slide>
							<swiper-slide>
								<v-img
									cover
									style="width: 100%; height: 100%"
									class="img"
									src="./to-delete/smallslider2(b).jpg"
								></v-img>
							</swiper-slide>
						</swiper-container>
					</div>
					<div class="main-carusel__item">
						<swiper-container
							lides-per-view="3"
							speed="500"
							loop="true"
							style="height: 100%"
							:autoplay="{
								delay: 1000
							}"
						>
							<swiper-slide>
								<v-img
									cover
									style="width: 100%; height: 100%"
									class="img"
									src="./to-delete/smallslider2(c).jpg"
								></v-img>
							</swiper-slide>
							<swiper-slide>
								<v-img
									cover
									style="width: 100%; height: 100%"
									class="img"
									src="./to-delete/smallslider2(d).jpg"
								></v-img>
							</swiper-slide>
						</swiper-container>
					</div>
				</div>
			</div>
		</div>
	</v-container>
</template>

<style lang="scss" scoped>
.main-carusel {
	height: 60vh;
	min-height: 450px;
	margin-block: 2rem;
	display: flex;
	&__main {
		width: 50%;
	}
	&__main,
	&__sec {
		margin-inline-end: 2%;
		&:last-of-type {
			margin-inline-end: 0;
		}
	}
	&__sec {
		width: 23%;
		height: 100%;
	}

	&__sec {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	&__item {
		height: 46%;
	}
}
@media (min-width: 320px) and (max-width: 599px) {
.main-carusel {
	height: 60vh;
	min-height: 450px;
	margin-block: 2rem;
	display: flex;
	&__main {
		width: 100%;
		.v-img__img.v-img__img--cover{
			object-fit: contain !important;
		}
	}
	// &__main,
	// &__sec {
	// 	margin-inline-end: 2%;
	// 	&:last-of-type {
	// 		margin-inline-end: 0;
	// 	}
	// }

	&__sec {
		display: none;
	}

	// &__sec {
	// 	height: 100%;
	// 	display: flex;
	// 	flex-direction: column;
	// 	justify-content: space-between;
	// }
	// &__item {
	// 	height: 46%;
	// }
}
}
</style>
