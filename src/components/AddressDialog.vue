<script setup>
import { ref, watch } from 'vue';
import { useAddressStore } from "../stores/index.js";
import alerts from '../alerts/alert.js'
const addressStore = useAddressStore()

const props = defineProps({
    open: Boolean
})

const alert = alerts()
const open = ref(false)
const form = ref({})
const countries = ref(await addressStore.allCountries())
const states = ref([])
const cities = ref([])

const getStates = async (id) => {
    form.value.country = id
    states.value = await addressStore.allStates(id)
}

const getCities = async (id) => {
    form.value.state = id
    cities.value = await addressStore.allCities(id)
}

watch(props, () => {
    open.value = !open.value
})

const submitForm = async () => {
    const res = await addressStore.add(form.value)
    if (res.success) {
        alert.message('Address added successfully')
        form.value = {}
        open.value = false
    }
}

</script>

<template>
    <v-navigation-drawer v-model="open" fixed temporary hide-overlay right clipped location="top" class="h-100">
        <v-card class="d-flex flex-colum justify-center align-center w-auto pa-4   ">

            <v-col cols="12" md="6" class="mb-6">
                <v-card-text class=" pa-0 ma-0 text-right">

                    <v-hover>
                        <template v-slot:default="{ isHovering, props }">
                            <v-icon v-bind="props" size="30" @click="open = false; form = {}"
                                :class="`pa-0 ma-0 text-right ${isHovering ? 'text-red' : ''}`">mdi-close</v-icon>
                        </template>
                    </v-hover>

                </v-card-text>
                <v-card-text>
                    <p class="mb-1 ">{{ $t('addressDialog.addressLabel') }}</p>
                    <v-textarea placeholder="address" v-model="form.address" hide-details density="compact" rows="2"
                        required outlined no-resize></v-textarea>
                </v-card-text>
                <v-card-text>
                    <p class="mb-1 ">{{ $t('addressDialog.postCodeLabel') }}</p>
                    <v-text-field placeholder="postCode" v-model="form.postCode" hide-details density="compact" required
                        outlined></v-text-field>
                </v-card-text>

                <v-card-text>
                    <p class="mb-1 ">{{ $t('addressDialog.countryLabel') }}</p>
                    <v-select hide-details  @update:modelValue="res => getStates(res)" density="compact" class="rounded" color="info" v-model="form.country"
                        :items="countries" item-title="name" item-value="id"></v-select>
                </v-card-text>

                <v-card-text>
                    <p class="mb-1 ">{{ $t('addressDialog.stateLabel') }}</p>
                    <v-select hide-details  @update:modelValue="res => getCities(res)" density="compact" class="rounded" color="info" v-model="form.state"
                        :items="states" item-title="name" item-value="id"></v-select>
                </v-card-text>


                <v-card-text>
                    <p class="mb-1 ">{{ $t('addressDialog.cityLabel') }}</p>
                    <v-select hide-details density="compact" class="rounded" color="info" v-model="form.city"
                        :items="cities" item-title="name" item-value="id"></v-select>
                </v-card-text>
              
                <v-card-text>
                    <p class="mb-1 ">{{ $t('addressDialog.phoneNumberLabel') }}</p>
                    <v-text-field hide-details density="compact" placeholder="phone number" type="number"
                        v-model="form.phoneNumber" required outlined></v-text-field>
                </v-card-text>
                <v-card-text>
                    <v-btn color="info" @click="submitForm" block> Submit </v-btn>
                </v-card-text>

            </v-col>

        </v-card>
    </v-navigation-drawer>
</template>

