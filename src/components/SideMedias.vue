<template>
	<div class="bottom-navigation">
		<v-btn
			class="social-link facebook"
			icon
			href="https://www.facebook.com/Masterchefegy.official/"
		>
			<v-icon>mdi-facebook</v-icon>
		</v-btn>
		<v-btn
			class="social-link instagram"
			icon
			href="https://www.instagram.com/masterchef_eg/"
		>
			<v-icon>mdi-instagram</v-icon>
		</v-btn>
		<v-btn class="social-link whatsapp" icon href="https://wa.me/201018964915">
			<v-icon>mdi-whatsapp</v-icon>
		</v-btn>
	</div>
</template>

<style>
.bottom-navigation {
	position: fixed;
	bottom: 0;
	inset-inline-start: 0;
	padding: 8px;
	z-index: 999;
	display: flex;
	flex-direction: column;
}

.social-link {
	padding: 0;
	background-color: #4caf50;
	border-radius: 50%;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.26);
	transition: transform 0.2s;
	margin-bottom: 0.25rem;
}

.social-link:hover {
	transform: scale(1.1);
}

.social-link .v-btn__content {
	width: 40px;
	height: 40px;
	padding: 8px;
	display: flex;
	justify-content: center;
	align-items: center;
}

.social-link .v-icon {
	font-size: 24px;
	color: #fff;
}

.facebook {
	background-color: #4267b2;
}

.instagram {
	background-color: #e1306c;
}

.whatsapp {
	background-color: #25d366;
}
</style>
