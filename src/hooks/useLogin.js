import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import axios from "axios";
//--------------------------------------------------------//
import { loadUserData } from '../stores/_reducerBundle'

export function useLogin(id, pw) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const login = (e) => {
    e.preventDefault()
    return axios({
      url: 'https://port-0-portfolio-server-private-4y6tt2blds7g9x0.sel3.cloudtype.app//api/login',
      method: 'POST',
      withCredentials: true,
      data: { id, pw }
    })
      .catch(() => {
        alert('아이디 혹은 비밀번호를 다시 확인해 주세요.')
      })
      .then((res) => {
        alert(res.data.name + '님 로그인 되었습니다.')
        navigate('/')
        dispatch(loadUserData({ login: true, ...res.data }))
      })
  }
  return login
}