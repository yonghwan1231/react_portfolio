import axios from "axios"
import { useDispatch } from 'react-redux'
//--------------------------------------------------------//
import { loadUserData } from '../stores/_reducerBundle'

export function useLogout() {
  const dispatch = useDispatch()
  const logout = (e) => {
    e.preventDefault()
    axios({
      url: 'http://localhost:8080/api/logout',
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