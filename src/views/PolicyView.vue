<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useSettingStore } from '../stores/index.js'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const settingStore = useSettingStore()
const { locale } = useI18n({ useScope: 'global' })

if (settingStore.policy.length === 0) {
	await settingStore.getFooter()
}

const data = ref(
	settingStore.policy[route.params.id || 1].page_translations.find(
		(element) => element.lang === locale.value
	)
)
watch(route, () => {
	data.value = settingStore.policy[route.params.id || 1].page_translations.find(
		(element) => element.lang === locale.value
	)
})
</script>

<template>
	<v-locale-provider :rtl="locale === 'ar' ? true : false">
		<v-container>
			<v-img v-if="data.img" :src="data.img" height="300" cover />
			<h2 class="mt-12" v-html="data.title"></h2>
			<v-divider class="mb-4" />
			<!-- <v-card-text v-html="data.content"></v-card-text> -->
			<div v-html="data.content"></div>
		</v-container>
	</v-locale-provider>
</template>
