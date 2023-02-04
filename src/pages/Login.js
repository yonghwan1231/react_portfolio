
import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie'
import axios from "axios"
//--------------------------------------------------------//
import { useSelector } from 'react-redux'
import { useLogin } from '../hooks/_customHookBundle'

function Login() {

  let loginState = useSelector(state => { return state.loginUser.login })
  const navigate = useNavigate()
  const [userId, setUserId] = useState('')
  const [userPw, setUserPw] = useState('')
  const [saveId, setSaveId] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies()
  const login = useLogin(userId, userPw)

  useEffect(() => {
    if (loginState) {
      alert('이미 로그인 상태 입니다.')
      navigate(-1)
    }
    if (cookies.saveId) {
      setSaveId(true)
      setUserId(cookies.saveId)
    }
  }, [])

  return (
    <div className="login page-wrap">
      <nav className="page-nav">
        <h1>로그인</h1>
      </nav>

      <section className="page-contents-wrap">
        <form className="login-input-wrap">
          <div className="login-input-box">
            <input
              type="text"
              placeholder="아이디"
              value={userId}
              onChange={(e) => {
                setUserId(e.target.value)
              }} />
            <input
              type="password"
              placeholder="비밀번호"
              onChange={(e) => {
                setUserPw(e.target.value)
              }} />
          </div>
          <button type="submit" className="login-button dark" onClick={(e) => {
            login(e)
              .then(() => {
                if (saveId) {
                  let date = new Date()
                  let setDate = date.setFullYear(date.getFullYear() + 1)
                  setCookie('saveId', userId, { path: '/', expires: new Date(setDate) })
                }
                else {
                  removeCookie('saveId', { path: '/' })
                }
              })
          }
          }>로그인</button>
        </form>

        <div className="login-set-wrap">
          <p className="login-save-id">
            <input type="checkbox" name="" id="saveId" checked={saveId}
              onChange={() => {
                setSaveId(!saveId)
              }} />
            <label htmlFor="saveId">ID 저장</label>
          </p>
          <Link to="#" className="find-account">ID/PW 찾기</Link>
        </div>

        <div className="login-join-wrap">
          <p className="login-join-txt">
            <strong>아직 회원이 아니세요?</strong>
            <span>회원이 되시면 할인쿠폰,<br />이벤트 참여 등 다양한 혜택을 누리실 수 있습니다.</span>
          </p>
          <button className="login-join-button" onClick={() => { navigate('/join') }}>신규회원가입</button>
        </div>
      </section>
    </div>
  )
}

export { Login }