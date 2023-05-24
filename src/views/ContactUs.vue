<template>
	<v-container>
		<v-row style="width: 100%">
			<v-col xs="12" md="4">
				<v-card class="contact-card">
					<v-card-title class="contact-card-title">
						<v-icon class="contact-icon" size="24">mdi-email-outline</v-icon>
						<div>{{ $t('contactus.email') }}</div>
					</v-card-title>
					<v-card-text class="contact-card-text">
						<v-btn
							variant="text"
							:href="'mailto:' + $t('contactus.data.email')"
						>
							{{ $t('contactus.data.email') }}
						</v-btn>
					</v-card-text>
					<v-card-title class="contact-card-title">
						<v-icon class="contact-icon" size="24"
							>mdi-map-marker-outline</v-icon
						>
						<div>{{ $t('contactus.address') }}</div>
					</v-card-title>
					<v-card-text class="contact-card-text">
						<div>{{ $t('contactus.data.address') }}</div>
					</v-card-text>
					<v-card-title class="contact-card-title">
						<v-icon class="contact-icon" size="24">mdi-phone-outline</v-icon>
						<div dir="ltr">{{ $t('contactus.phone') }}</div>
					</v-card-title>
					<v-card-text class="contact-card-text">
						<div>
							<v-btn variant="text" :href="'tel:' + $t('contactus.data.phone')">
								{{ $t('contactus.data.phone') }}
							</v-btn>
						</div>
					</v-card-text>
					<v-card-title class="contact-card-title">
						<v-icon class="contact-icon" size="24">mdi-fax-outline</v-icon>
						<div dir="ltr">{{ $t('contactus.fax') }}</div>
					</v-card-title>
					<v-card-text class="contact-card-text">
						<div>{{ $t('contactus.data.fax') }}</div>
					</v-card-text>
					<v-card-title class="contact-card-title">
						<v-icon class="contact-icon" size="24">mdi-whatsapp</v-icon>
						<div style="direction: ltr">{{ $t('contactus.watsapp') }}</div>
					</v-card-title>
					<v-card-text class="contact-card-text">
						<v-btn variant="text" href="https://wa.me/201018964915">
							{{ $t('contactus.data.phone') }}
						</v-btn>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col xs="12" sm="8">
				<div class="h-100">
					<v-card class="map-card">
						<v-card-title
							class="map-card-title"
							style="display: flex; align-items: center"
						>
							<v-icon class="map-icon" size="24">mdi-map</v-icon>
							<div>{{ $t('contactus.location') }}</div>
						</v-card-title>
						<v-card-text class="map-card-text">
							<iframe
								src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3450.7981259009525!2d31.372271515117152!3d30.128589581851724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzDCsDA3JzQyLjkiTiAzMcKwMjInMjguMSJF!5e0!3m2!1sen!2seg!4v1684925957365!5m2!1sen!2seg"
								width="100%"
								height="473"
								frameborder="0"
								style="border: 0"
								allowfullscreen
							></iframe>
						</v-card-text>
					</v-card>
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<style>
/* new */
.contact-card {
	background-color: #f2f2f2;
	border-radius: 10px;
	padding: 20px;
	box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
}

.contact-card-title {
	display: flex;
	align-items: center;
	margin-bottom: 10px;
}

.contact-icon {
	margin-right: 10px;
}

/* new */
/* old */
/* .contact-card {
	padding: 24px;
	margin: 16px;
	border-radius: 8px;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
	background-color: #fff;
}
.contact-card-title {
	display: flex;
	align-items: center;
	font-weight: 500;
	margin-bottom: 8px;
}
.contact-icon {
	margin-right: 8px;
} */
.contact-card-text {
	margin-bottom: 16px;
}
.map-card {
	background-color: #f2f2f2;
}
</style>
