import product from './product'
import category from './category'
import wishList from './wishList'
import cart from './cart'
import blog from './blog'
import address from './address'
import order from './order'
import offers from './offers'
import user from './user'
import settings from './settings'

export default function () {
  const productConnectors = product()
  const categoryConnectors = category()
  const wishListConnectors = wishList()
  const cartConnectors = cart()
  const blogConnectors = blog()
  const addressConnectors = address()
  const orderConnectors = order()
  const offersConnectors = offers()
  const userConnectors = user()
  const settingsConnectors = settings()





  return { productConnectors, categoryConnectors, wishListConnectors, cartConnectors, blogConnectors, addressConnectors, orderConnectors, offersConnectors, userConnectors, settingsConnectors }
}
