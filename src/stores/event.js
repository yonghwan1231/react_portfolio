import { createSlice } from '@reduxjs/toolkit'
import axios from "axios"

let event = createSlice({
  name: 'event',
  initialState: null,
  reducers: {
    eventAxios(state, action) {
      return action.payload
    },
    eventUpdate(state, action) {
      let todayY = new Date().getFullYear()
      let todayM = new Date().getMonth() + 1
      let todayD = new Date().getDate()
      state.ing.forEach((el, idx) => {
        if (new Date(el.date) < new Date(todayY + '-' + todayM + '-' + todayD)) {
          let copy = { ...state }
          copy.end.unshift(el)
          copy.ing.splice(idx, 1)
          eventAxios(copy)
          axios.defaults.withCredentials = true
          axios.post('https://port-0-portfolio-server-private-4y6tt2blds7g9x0.sel3.cloudtype.app/api/event', copy)
            .then(() => {
              console.log('데이터 전송 완료')
            })
          return
        }
      })
    }
  }
})

export let { eventAxios, eventUpdate } = event.actions
export { event }