import { createSlice } from '@reduxjs/toolkit'

let product = createSlice({
  name: 'product',
  initialState: null,
  reducers: {
    productAxios(state, action) {
      return action.payload
    }
  },
})

export let { productAxios } = product.actions
export { product }