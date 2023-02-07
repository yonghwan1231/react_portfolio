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
        axios({ url: 'https://port-0-portfolio-server-private-4y6tt2blds7g9x0.sel3.cloudtype.app/api/product', method: 'GET', withCredentials: true }),
        axios({ url: 'https://port-0-portfolio-server-private-4y6tt2blds7g9x0.sel3.cloudtype.app/api/event', method: 'GET', withCredentials: true }),
        axios({ url: 'https://port-0-portfolio-server-private-4y6tt2blds7g9x0.sel3.cloudtype.app/api/lookbook', method: 'GET', withCredentials: true })
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