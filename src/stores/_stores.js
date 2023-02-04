import { configureStore } from '@reduxjs/toolkit'
import { product } from './product'
import { event } from './event'
import { lookbook } from './lookbook'
import { searchWord } from './searchWord'
import { priceFilter } from './priceFilter'
import { loginUser } from './loginUser'
import { localCart } from './localCart'
import { orderList } from './orderList'

export default configureStore({
  reducer: {
    product: product.reducer,
    event: event.reducer,
    lookbook: lookbook.reducer,
    searchWord: searchWord.reducer,
    priceFilter: priceFilter.reducer,
    loginUser: loginUser.reducer,
    localCart: localCart.reducer,
    orderList: orderList.reducer
  }
})