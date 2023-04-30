<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAddressStore } from "../stores/index.js";
import AddressDialog from './AddressDialog.vue';
const addressStore = useAddressStore()
const addressDialogStatus = ref(false)
await addressStore.load()
const route = useRoute()

const ChoosedAddress = ref(0)
const ChooseAddressHandler = (id) => {
  ChoosedAddress.value = id
}
</script>
<template>
<div class="w-100">
<AddressDialog :open="addressDialogStatus" />
    <v-layout class="d-flex flex-wrap justify-left align-self-left ">
        <v-col cols="11" md="3" v-for="(item, i) in addressStore.items" :key="i" class="mx-2 my-5 pa-4  elevation-5">
            <v-card-text v-if="route.path !== '/checkOut'" class=" pa-0 ma-0 text-right">
                <v-hover>
                    <template v-slot:default="{ isHovering, props }">
                        <v-icon v-bind="props" @click="addressStore.remove(item.id)" size="20"
                            :class="`pa-0 ma-0 text-right ${isHovering ? 'text-red' : ''}`">mdi-close</v-icon>
                    </template>
                </v-hover>
            </v-card-text>
            <v-card-text class=" text-h6 text-left">
                <p> {{ item.address }} </p>
            </v-card-text>
            <v-card-subtitle>
                <span> <span class=" hidden-sm-and-down">{{ $t('addressList.countryLabel') }} /</span> {{ item.country }} </span><br />
                <span> <span class=" hidden-sm-and-down">{{ $t('addressList.stateLabel') }} /</span> {{ item.state }} </span><br />
                <span><span class=" hidden-sm-and-down"> {{ $t('addressList.cityLabel') }} /</span> {{ item.city }} </span><br />
                <span><span class=" hidden-sm-and-down"> {{ $t('addressList.postCodeLabel') }} /</span> {{ item.postal_code }} </span><br />
                <span><span class=" hidden-sm-and-down"> {{ $t('addressList.phoneNumberLabel') }} /</span> {{ item.phone }} </span>
            </v-card-subtitle>

            <v-hover v-if="route.path === '/checkOut'">
                <template v-slot:default="{ isHovering, props }">
                    <v-btn v-bind="props" @click="ChooseAddressHandler(i); $emit('ChooseAddressHandler', item.id)"
                        :color="`${isHovering || (ChoosedAddress === i) ? 'info' : 'grey'}`" class="mt-4" block>
                        {{ $t('addressList.chooseBtn') }}
                    </v-btn>
                </template>
            </v-hover>
        </v-col>
        <v-col cols="11" md="3" class="mx-2 my-5 pa-4 elevation-5" @click="addressDialogStatus = !addressDialogStatus" >
            <v-card-text class="text-center">
                <v-icon size="50" class="text-info"> mdi-plus-circle-outline </v-icon>
            </v-card-text>
            <v-card-title class="text-center text-info">
                {{ $t('addressList.addBtn') }}
            </v-card-title>
        </v-col>
    </v-layout>
</div>
</template>
