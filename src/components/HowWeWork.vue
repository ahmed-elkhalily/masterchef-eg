<script setup>

</script>

<template>
    <v-layout class="d-flex flex-wrap justify-center ma-md-12 pa-md-12 ">
        <Transition name="howWeWork" appear>
            <v-col cols="12" md="3" class=" d-flex flex-wrap elevation-0 h-25  justify-center align-self-center">
                <v-card-title>
                    {{ $t('howWeWork.firstCard.title') }}
                </v-card-title>
                <v-card-text class="text-center">
                    {{ $t('howWeWork.firstCard.body') }}
                </v-card-text>
            </v-col>
        </Transition>
        <v-divider class="border-opacity-100 hidden-sm-and-down  ma-12" color="info" vertical />
        <v-divider class="border-opacity-100 hidden-md-and-up  ma-4" color="info" />
        <Transition name="howWeWork" appear>
            <v-col cols="12" md="3" class="d-flex flex-wrap elevation-0 h-25  justify-center align-self-center">
                <v-card-title>
                    {{ $t('howWeWork.secondCard.title') }}
                </v-card-title>
                <v-card-text class="text-center">
                    {{ $t('howWeWork.secondCard.body') }}
                </v-card-text>
            </v-col>
        </Transition>
        <v-divider class="border-opacity-100 hidden-sm-and-down ma-12" color="info" vertical></v-divider>
        <v-divider class="border-opacity-100 hidden-md-and-up ma-4" color="info"></v-divider>
        <Transition name="howWeWork" appear>
            <v-col cols="12" md="3" class="d-flex flex-wrap elevation-0 h-25  justify-center align-self-center">
                <v-card-title>
                    {{ $t('howWeWork.thirdCard.title') }}
                </v-card-title>
                <v-card-text class="text-center">
                    {{ $t('howWeWork.thirdCard.body') }}
                </v-card-text>
            </v-col>
        </Transition>
    </v-layout>
</template>
<style scoped>
.howWeWork-enter-from {
    opacity: 0;
}

.howWeWork-enter-to {
    opacity: 1;
}

.howWeWork-enter-active {
    transition: all 2s ease;
}
</style>