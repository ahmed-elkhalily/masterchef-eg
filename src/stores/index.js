import connectors from '../connectors/index.js'
import createCategoryStore from './category.js'
import createProductStore from './product.js'
import createAddressStore from './address.js'
import createAuthStore from './auth.js'
import createBlogStore from './blog.js'
import createCartStore from './cart.js'
import createOrderStore from './order.js'
import createWishListStore from './wishlist.js'
import createOfferStore from './offers.js'
import createSettingStore from './settings.js'

const useProductStore = () => {
  const store = createProductStore(connectors().productConnectors)
  return store()
}

const useCategoryStore = () => {
  const store = createCategoryStore(connectors().categoryConnectors)
  return store()
}

const useAddressStore = () => {
  const store = createAddressStore(connectors().addressConnectors)
  return store()
}

const useAuthStore = () => {
  const store = createAuthStore(connectors().userConnectors)
  return store()
}
const useBlogStore = () => {
  const store = createBlogStore(connectors().blogConnectors)
  return store()
}

const useCartStore = () => {
  const store = createCartStore(connectors().cartConnectors)
  return store()
}
const useOrderStore = () => {
  const store = createOrderStore(connectors().orderConnectors)
  return store()
}

const useWishListStore = () => {
  const store = createWishListStore(connectors().wishListConnectors)
  return store()
}

const useOfferStore = () => {
  const store = createOfferStore(connectors().offersConnectors)
  return store()
}

const useSettingStore = () => {
  const store = createSettingStore(connectors().settingsConnectors)
  return store()
}

export { useProductStore, useCategoryStore, useAddressStore, useAuthStore, useBlogStore, useCartStore, useOrderStore, useWishListStore, useOfferStore, useSettingStore }
