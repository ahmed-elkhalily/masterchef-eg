<style>
/* .img-welcome-2 */

.main-imgs-contianer {
	position: relative;
	min-height: 500px;
	overflow: hidden;
}
.main-imgs-contianer .main-title {
	position: relative;
}

.main-imgs-contianer p {
	position: absolute;
	top: 55%;
	transform: translateY(-50%);
}

.main-imgs-contianer .main-img {
	margin-top: 120px;
}

.main-imgs-contianer .sec-img {
	position: absolute;
	top: 2%;
	left: 50%;
	width: 80%;
	transform: translateX(-50%);
	height: 300px;
	z-index: 999;
}

.main-title {
	align-items: center;
	margin-top: 22%;
}

@media (max-width: 992px) {
	.main-imgs-contianer .main-title {
		display: none !important;
	}
	.main-imgs-contianer .main-img {
		/* display: none !important; */
		/* border: 1px solid red; */
	}
}

@media (max-width: 552px) {
	.img-welcome-2 {
		width: 100% !important;
		height: 100% !important;
		object-fit: contain;
		object-position: bottom;
	}
}
</style>

<template>
	<v-container>
		<v-row class="main-imgs-contianer mb-10">
			<Transition name="horizontalPicMobile" appear>
				<v-img class="sec-img" src="./welcome2.jpg" />
			</Transition>
			<v-col md="6" cols="12" class="d-flex main-title">
				<p>
					{{ $t('main') }}
				</p>
			</v-col>

			<v-col md="6" cols="12">
				<div class="image-container">
					<Transition name="verticalPic" appear>
						<v-img class="main-img" src="./welcome1.jpg" alt="welcome" />
					</Transition>
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<style scoped>
.verticalPic-enter-from {
	opacity: 0;
	transform: translateX(-110%);
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
	transform: translateX(50%);
}

.horizontalPicMobile-enter-to {
	opacity: 1;
	transform: translateX(-50%);
}

.horizontalPicMobile-enter-active {
	transition: all 1s ease;
}
</style>
