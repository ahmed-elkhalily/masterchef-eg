<script setup>

const props = defineProps({
    data: Array
})
</script>

<template>

    <v-col md="6" cols="10" class="d-flex flex-wrap ma-auto justify-center align-self-center ">
                <v-card v-for="(offer, i) in props.data" :key="i" class="mx-2 my-3 w-100  elevation-0" >
                    <router-link :to="`/offer/${offer.slug}`">
                        <v-img class="pulse" :src="offer.banner" height="300"  />
                    </router-link>
                    <v-card-title class=" text-start ml-0 pl-0">
                        <p>{{ offer.title }}</p>
                        <v-card-subtitle class="ml-0 pl-0">
                            <span> {{  new Date(offer.start_date).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"})  }} -> </span>
                            <span> {{  new Date(offer.end_date).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"})  }}  </span>
                        </v-card-subtitle>
                    </v-card-title>
                        <v-btn class="ml-0 pl-0" color="blue" variant="text" :to="`/offer/${offer.slug}`"> {{ $t('offerList.exploreBtn') }} </v-btn>
                </v-card>
    </v-col>
</template>
