import { createSlice } from '@reduxjs/toolkit'

let searchWord = createSlice({
  name: 'searchWord',
  initialState: '',
  reducers: {
    sendSearchWord(state, action) {
      return action.payload
    }
  }
})

export let { sendSearchWord } = searchWord.actions
export { searchWord }