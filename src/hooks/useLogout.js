import axios from "axios"
import { useDispatch } from 'react-redux'
//--------------------------------------------------------//
import { loadUserData } from '../stores/_reducerBundle'

export function useLogout() {
  const dispatch = useDispatch()
  const logout = (e) => {
    e.preventDefault()
    axios({
      url: 'https://port-0-portfolio-server-private-4y6tt2blds7g9x0.sel3.cloudtype.app//api/logout',
      method: 'POST',
      withCredentials: true
    })
      .then((res) => {
        dispatch(loadUserData({ login: false }))
        alert('로그아웃 되었습니다.')
      })
  }
  return logout
}