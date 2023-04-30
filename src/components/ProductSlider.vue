<script setup>
	import { ref, watch } from "vue";
	import { useProductStore } from "../stores";

	const productStore = await useProductStore();

	const props = defineProps({
		id: Number,
	});

	const data = ref([]);
	async function loadData() {
		data.value = await productStore.listRelatedProducts(props.id);
	}

	watch(props, () => {
		loadData();
	});

	loadData();
</script>
<template>
	<v-layout class="d-flex align-self-center flex-wrap justify-center">
		<v-slide-group class="pa-4" show-arrows>
			<v-slide-group-item
				v-for="n in data"
				:key="n"
				v-slot="{ toggle, selectedClass }"
			>
				<v-card
					style="cursor: pointer"
					color="grey-lighten-1"
					:class="['ma-4  hidden-sm-and-down', selectedClass]"
					height="200"
					width="250"
				>
					<router-link :to="`/product/${n.slug}`">
						<v-img :src="n.thumbnail_image" cover></v-img>
					</router-link>
				</v-card>
				<v-card
					style="cursor: pointer"
					color="grey-lighten-1"
					:class="['ma-4  hidden-md-and-up', selectedClass]"
					height="100"
					width="50"
				>
					<router-link :to="`/product/${n.slug}`">
						<v-img :src="n.thumbnail_image" cover></v-img>
					</router-link>
				</v-card>
			</v-slide-group-item>
		</v-slide-group>
	</v-layout>
</template>
