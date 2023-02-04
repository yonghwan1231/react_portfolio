import { createSlice } from '@reduxjs/toolkit'

let localCart = createSlice({
  name: 'localCart',
  initialState: [],
  reducers: {
    addLocalCart(state, action) {
      !localStorage.getItem('cart') && localStorage.setItem('cart', '[]')
      if (action.payload) return [...action.payload]
      else return JSON.parse(localStorage.getItem('cart'))
    }
  }
})

export let { addLocalCart } = localCart.actions
export { localCart }