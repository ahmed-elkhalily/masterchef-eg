<script setup>
const props = defineProps({
    data: Object
})
</script>

<template>
    <v-layout class="d-flex flex-wrap ma-auto justify-center align-self-center ">
        <v-col cols="10" md="7" class="mx-2 my-12 elevation-0">
         
                <v-img class="pulse" :src="props.data.banner" height="300" cover />
          
            <v-card-title class=" text-start ml-0 pl-0">
                <p>{{ props.data.title }}</p>
                <v-card-subtitle class="ml-0 pl-0">
                    <span> {{  props.data.created_at  }} /</span>
                    <span class="text-info"> </span>
                </v-card-subtitle>
            </v-card-title>
            <v-card-text class="ml-0 pl-0">
               {{ props.data.body }}
            </v-card-text>
            <v-divider />
        </v-col>
    </v-layout>
</template>
