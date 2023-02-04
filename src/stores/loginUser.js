import { createSlice } from '@reduxjs/toolkit'

let loginUser = createSlice({
  name: 'loginUser',
  initialState: { login: false },
  reducers: {
    loadUserData(state, action) {
      return action.payload
    },
  }
})

export let { loadUserData } = loginUser.actions
export { loginUser }