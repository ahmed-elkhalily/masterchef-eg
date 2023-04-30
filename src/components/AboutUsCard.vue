<script setup>

</script>

<template>
    <v-layout class="d-flex flex-wrap justify-center pa-md-12 bg-grey-darken-3 ">
        <Transition name="aboutUsSec" appear>
        <v-col cols="12" md="6" class="d-flex flex-wrap elevation-0 h-25 bg-grey-darken-3  justify-center align-self-center">
               <v-card-title >
                   {{ $t('aboutUsCard.title') }}
                </v-card-title>
                <v-card-text class="text-center">
                    {{ $t('aboutUsCard.body') }}    
                </v-card-text>
            </v-col>
        </Transition>
        </v-layout>
</template>
<style scoped>
.aboutUsSec-enter-from {
    opacity: 0;
}

.aboutUsSec-enter-to {
    opacity: 1;
}

.aboutUsSec-enter-active {
    transition: all 1.5s ease-in;
}

</style>