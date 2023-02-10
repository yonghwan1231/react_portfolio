import { useEffect } from 'react';
import { Link, useParams, useNavigate, Outlet } from "react-router-dom"
import { useSelector } from 'react-redux';
import axios from 'axios';

export function CsCenter() {

  let { id } = useParams()
  const navigate = useNavigate()
  const loginUser = useSelector(state => { return state.loginUser })

  useEffect(() => {
    axios({
      url: 'http://localhost:8080/api/accesstoken',
      method: 'GET',
      withCredentials: true
    })
      .then((res) => {
        console.log('로그인체크 응답성공')
      })
      .catch(() => {
        alert('로그인 후 이용 가능합니다.')
        navigate('/')
      })
  }, [loginUser])

  return (
    <div className='cs-center page-wrap'>
      <nav className="page-nav">
        <h1>고객센터</h1>
        <ul>
          <li className={id === 'write' ? 'active' : null}>
            <Link to="/cs/write">문의접수</Link>
          </li>
          <li className={id === 'history' ? 'active' : null}>
            <Link to="/cs/history">문의내역</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}