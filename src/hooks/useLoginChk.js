import { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
//--------------------------------------------------------//
import { loadUserData } from '../stores/_reducerBundle'

export function useLoginChk() {
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const loginState = useSelector(state => { return state.loginUser.login })

  const loginChk = () => {
    console.log('로그인체크 실행')
    axios({
      url: 'http://localhost:8080/api/accesstoken',
      method: 'GET',
      withCredentials: true
    })
      .then((res) => {
        console.log('로그인체크 응답성공')
        axios({
          url: 'http://localhost:8080/api/refreshtoken',
          method: 'GET',
          withCredentials: true
        })
          .then(() => {
            !loginState && dispatch(loadUserData({ login: true, ...res?.data }))
            console.log('Access Token Recrated')
          })
      })
      .catch(() => {
        console.log('로그인체크 응답실패')
        dispatch(loadUserData({ login: false }))
      })
  }

  useEffect(() => {
    if (loginState && pathname !== '/') loginChk()
  }, [pathname])

  return loginChk
}