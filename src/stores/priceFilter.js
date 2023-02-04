import { createSlice } from '@reduxjs/toolkit'

let priceFilter = createSlice({
  name: 'priceFilter',
  initialState: [],
  reducers: {
    setPriceFilter(state, action) {
      return action.payload
    }
  }
})

export let { setPriceFilter } = priceFilter.actions
export { priceFilter }