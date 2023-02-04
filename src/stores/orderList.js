import { createSlice } from '@reduxjs/toolkit'

let orderList = createSlice({
  name: 'pricorderListeFilter',
  initialState: [],
  reducers: {
    setOrderList(state, action) {
      return action.payload
    }
  }
})

export let { setOrderList } = orderList.actions
export { orderList }