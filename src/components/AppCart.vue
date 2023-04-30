<script setup>
import { useCartStore } from '../stores/index.js';
import alerts from '../alerts/alert.js'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()
const alert = alerts()
const cartStore = useCartStore()
await cartStore.load()


const updateQty = async (id, operation, limit) => {
  const res = await cartStore.changeQty(id, operation, limit)
  if (res) {
    alert.message('changed successfully')
  }
}
const remove = async (id) => {
  const res = await cartStore.remove(id)
  if (res) {
    alert.message('removed successfully')
  }
}

</script>
<template >
  <v-navigation-drawer v-model="cartStore.cartLoaded" fixed temporary hide-overlay right clipped :class=" mobile? 'w-100': 'w-25'">
    <v-card class="d-flex flex-colum elevation-0 justify-center align-self-center">
      <v-card-title>
        <v-icon size="40" class="pa-4 ma-3 text-right text-blue">mdi-cart-outline</v-icon>
        {{ cartStore.items.length }} {{ $t('appCart.qtyLabel') }}
      </v-card-title>
      <v-spacer />
      <v-card-title>
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            <v-icon v-bind="props" size="30" @click="cartStore.cartLoaded = false"
              :class="`pa-4 ma-3 text-right ${isHovering ? 'text-red' : ''}`">mdi-close</v-icon>
          </template>
        </v-hover></v-card-title>
    </v-card>
    <v-divider />
    <v-list density="compact" class="overflow-y-auto h-75 " nav>
      <v-list-item v-for=" (item, i) in cartStore.items" :key="i">
        <v-card class="d-flex flex-wrap elevation-0 justify-center align-self-center">
          <v-row>
            <v-col cols="5" md="3" class="pr-0">
              <router-link :to="`/product/${item.slug}`">
                <v-img class="pulse" :src="item.thumbnail" height="100%" width="100%"></v-img>
              </router-link>
            </v-col>
            <v-col class="pl-3 justify-start align-self-start">
              <tbody>
      <tr>
        <td colspan="2" class="pa-2">{{ item.name }}</td>
      </tr>
      <tr>
        <td class="w-50 pa-2">{{ $t('appCart.qtyLabel') }}: </td>
        <td>{{ item.qty }}</td>
      </tr>
      <tr>
        <td class="w-50 pa-2">{{$t('appCart.priceLabel')}}:  </td>  
        <td>{{ item.regular_price }} {{$t('currencyLabel')}}</td>
      </tr>
      <tr>
        <td colspan="2" class="pa-2">
          <v-row>
          <v-col cols="4" class="text-center">
            <v-icon @click="updateQty(item.cart_id, item.qty, 'minus', item.min_qty)" size="20"
              color="blue">
              mdi-minus
            </v-icon>
          </v-col>
<v-col cols="4" class="text-center">
  <span class="pa-2 pa-md-4">{{ item.qty }}</span>
</v-col>
<v-col cols="4" class="text-center">

  <v-icon @click="updateQty(item.cart_id, item.qty, 'plus', item.max_qty)" size="20" color="blue">
    mdi-plus
  </v-icon>
</v-col>
</v-row>

        </td>
      </tr>
    </tbody>
            </v-col>
            <v-col cols="2" class=" d-flex flex-wrap justify-end align-self-start">
              <v-icon @click="remove(item.cart_id)" color="red">
                mdi-trash-can-outline
              </v-icon>
            </v-col>
          </v-row>
        </v-card>
        <v-divider class="my-3" />
      </v-list-item>
    </v-list>
    <v-divider />
    <v-card class="d-flex flex-wrap elevation-0 pa-4">
      <v-col cols="12" md="3" class="pa-0">
        <p class="ma-auto font-weight-black text-body-2 ">{{ $t('appCart.couponTitle') }} </p>
      </v-col>
      <v-col cols="8" md="6" class="pa-0">
        <v-text-field hide-details class="ml-2" density="compact" :label="$t('appCart.couponCode')" variant="outlined"
          color="blue"></v-text-field>
      </v-col>
      <v-col cols="4" md="3" class="pa-0">
        <v-btn color="blue" class="ml-2 ma-auto"> {{ $t('appCart.couponSubmitBtn') }} </v-btn>
      </v-col>

    </v-card>
    <v-btn color="blue" to="/checkOut" block> {{$t('appCart.checkOutBtn')}} {{ cartStore.totalPrice }} {{$t('currencyLabel')}} </v-btn>
  </v-navigation-drawer>
</template>
