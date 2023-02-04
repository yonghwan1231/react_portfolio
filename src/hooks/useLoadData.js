import axios from "axios"
import { useState } from "react"
import { useDispatch } from 'react-redux'
//--------------------------------------------------------//
import { productAxios, eventAxios, lookbookAxios } from '../stores/_reducerBundle'

export function useLoadData() {

  let [axiosComplete, setAxiosComlete] = useState(false)
  let dispatch = useDispatch();
  let axiosReq = () => {
    axios
      .all([
        axios.get('http://localhost:8080/api/product'),
        axios.get('http://localhost:8080/api/event'),
        axios.get('http://localhost:8080/api/lookbook')
      ])
      .then(axios.spread((res1, res2, res3) => {
        dispatch(productAxios(res1.data))
        dispatch(eventAxios(res2.data))
        dispatch(lookbookAxios(res3.data))
      }))
      .then(() => {
        console.log('axios complete')
        setAxiosComlete(true)
      })
  }

  return [axiosComplete, axiosReq]
}