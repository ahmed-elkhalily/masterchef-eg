<script setup>
import { watchEffect, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useBlogStore } from '../stores/index.js'
import BlogList from '../components/BlogList.vue';
import BlogDetails from '../components/BlogDetails.vue';
import AppLoading from '../components/AppLoading.vue';
const route = useRoute()
const blogStore = useBlogStore()
const data = ref()
const details = ref()
const totalPage = ref(0)

async function loadData() {
    totalPage.value = 0
    if (route.params.blogId) {
        details.value = await blogStore.getOne(route.params.blogId)
    } else {
        await blogStore.load()
        data.value = blogStore.items
        totalPage.value = blogStore.totalPage
    }
}

async function changePageHandle(params) {
    await blogStore.load(params)
    data.value = blogStore.items
}

watchEffect(async () => {
    loadData()
})
</script>

<template>
    <Suspense>
        <AppLoading v-if="!data && !details" />
        <BlogDetails v-else-if="route.params.blogId && details" :data="details" />
        <BlogList v-else-if="data" :totalPage="totalPage" @changePageHandle=changePageHandle :data="data" />
    </Suspense>
</template>