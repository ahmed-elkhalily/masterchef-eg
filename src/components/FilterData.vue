<script setup>
import { ref, watch } from 'vue';
import { useCategoryStore } from '../stores/index.js';

const props = defineProps({
    open: Boolean
})

const categioryStore = useCategoryStore()
await categioryStore.load()

const open = ref(false)
const filter = ref({})
const checkbox = ref({})
categioryStore.items.map(ele =>  checkbox.value[ele.slug] = true)

const emit = defineEmits(['filterHandler'])

watch(props, ()=>{
    open.value = !open.value
})

const submitFilter = async ()=>{
    filter.value.category_slug = Object.keys(checkbox.value).filter((key) =>  checkbox.value[key]).toString()
    emit('filterHandler', filter.value)
}

</script>
<template >
     <v-navigation-drawer v-model="open" fixed temporary hide-overlay location="top" clipped class="h-auto" >
        <v-col cols="12" md="8" class="d-flex flex-colum justify-center align-self-center mt-5 ma-auto pa-4">
           <p class="ma-auto font-weight-black text-body-2 ">{{ $t('filterData.priceLabel') }}: </p>
           <v-text-field v-model="filter.min_price" hide-details class="ml-2" density="compact" :label="$t('filterData.fromLabel')" variant="outlined"
           color="info"></v-text-field>
           <p class="ma-auto pa-4 text-body-2 "> {{ $t('filterData.toLabel') }}</p>
           <v-text-field v-model="filter.max_price" hide-details class="ml-2" density="compact" :label="$t('filterData.toLabel')" variant="outlined"
           color="info"></v-text-field>
        </v-col>
        <v-col cols="10" md="4" class="d-flex flex-colum justify-center align-self-center ma-auto">
        <p class="ma-auto font-weight-black text-body-2 w-100">{{$t('filterData.categoryTitle')}}: </p>
        <v-col cols="12" md="9" class="d-flex flex-colum justify-center align-self-center ma-auto">
            <v-checkbox v-for="ele in categioryStore.items" hide-details  density="compact"  color="blue"  v-model="checkbox[ele.slug]" >
                <template v-slot:label>
                    {{ ele.name }} 
                </template>
            </v-checkbox>
        </v-col>
    </v-col>
        <v-col cols="5"  class="d-flex flex-colum justify-center align-self-center ma-auto">
            <v-btn color="info" class="ml-2 ma-auto " @click="submitFilter" block> {{ $t('filterData.submitBtn') }} </v-btn>
            </v-col>
</v-navigation-drawer>
</template>
