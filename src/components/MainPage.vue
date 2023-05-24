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
									src="./welcome2.jpg"
								></v-img>
							</swiper-slide>
							<swiper-slide>
								<v-img
									cover
									style="width: 100%; height: 100%"
									class="img"
									src="./welcome2.jpg"
								></v-img>
							</swiper-slide>
							<swiper-slide>
								<v-img
									cover
									style="width: 100%; height: 100%"
									class="img"
									src="./welcome2.jpg"
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
									src="./welcome2.jpg"
								></v-img>
							</swiper-slide>
							<swiper-slide>
								<v-img
									cover
									style="width: 100%; height: 100%"
									class="img"
									src="./welcome2.jpg"
								></v-img>
							</swiper-slide>
							<swiper-slide>
								<v-img
									cover
									style="width: 100%; height: 100%"
									class="img"
									src="./welcome2.jpg"
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
								class="img"
								src="./welcome2.jpg"
							></v-img>
						</swiper-slide>
						<swiper-slide>
							<v-img
								cover
								style="width: 100%; height: 100%"
								class="img"
								src="./welcome2.jpg"
							></v-img>
						</swiper-slide>
						<swiper-slide>
							<v-img
								cover
								style="width: 100%; height: 100%"
								class="img"
								src="./welcome2.jpg"
							></v-img>
						</swiper-slide>
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
									src="./welcome2.jpg"
								></v-img>
							</swiper-slide>
							<swiper-slide>
								<v-img
									cover
									style="width: 100%; height: 100%"
									class="img"
									src="./welcome2.jpg"
								></v-img>
							</swiper-slide>
							<swiper-slide>
								<v-img
									cover
									style="width: 100%; height: 100%"
									class="img"
									src="./welcome2.jpg"
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
									src="./welcome2.jpg"
								></v-img>
							</swiper-slide>
							<swiper-slide>
								<v-img
									cover
									style="width: 100%; height: 100%"
									class="img"
									src="./welcome2.jpg"
								></v-img>
							</swiper-slide>
							<swiper-slide>
								<v-img
									cover
									style="width: 100%; height: 100%"
									class="img"
									src="./welcome2.jpg"
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
</style>
