<script setup>
import { ref } from "vue";
const emit = defineEmits(['changePageHandle'])
const props = defineProps({
    data: Array,
    totalPage: Number
})
const page = ref(1)

</script>

<template>

    <v-col md="6" cols="10" class="d-flex flex-wrap ma-auto justify-center align-self-center ">
                <v-card v-for="(blog, i) in props.data" :key="i" class="mx-2 my-3 w-100  elevation-0" >
                    <router-link :to="`/blog/${blog.id}`">
                        <v-img class="pulse" :src="blog.banner" height="300"/>
                    </router-link>
                    <v-card-title class=" text-start ml-0 pl-0">
                        <p>{{ blog.title }}</p>
                        <v-card-subtitle class="ml-0 pl-0">
                            <span> {{ blog.created_at }} / </span>
                            <span class="text-info"> {{ blog.author }}</span>
                        </v-card-subtitle>
                    </v-card-title>
                    <v-card-text class="ml-0 pl-0" >
                      {{ blog.short_description}}...
                    </v-card-text>
                        <v-btn class="ml-0 pl-0" color="blue" variant="text" :to="`/blog/${blog.id}`"> --- Read More </v-btn>
                </v-card>
                <div v-if="props.totalPage" class="text-center">
        <v-pagination v-model="page" :total-visible="6" @update:modelValue="res => changePageHandle(res)" :length="props.totalPage" prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"></v-pagination>
    </div>
    </v-col>
</template>
