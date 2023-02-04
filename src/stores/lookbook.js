import { createSlice } from '@reduxjs/toolkit'

let lookbook = createSlice({
  name: 'lookbook',
  initialState: null,
  reducers: {
    lookbookAxios(state, action) {
      return action.payload
    }
  }
})

export let { lookbookAxios } = lookbook.actions
export { lookbook }