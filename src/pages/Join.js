import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
//--------------------------------------------------------//
import { PostInput } from '../components/_ComponentBundle'

function Join(props) {

  const navigate = useNavigate()
  const [userName, setUserName] = useState(['', false])
  const [userId, setUserId] = useState(['', false])
  const [dupChk, setDupChk] = useState(false)
  const [userPw, setUserPw] = useState(['', false])
  const [userPwCfm, setUserPwCfm] = useState(['', false])
  const [userEmail, setUserEmail] = useState(['', true])
  const [userHp, setUserHp] = useState([['', '', ''], true])
  const [userAddr, setUserAddr] = useState({ zonecode: '', addr: '', detailAddr: '' })
  const [agreement1, setAgreement1] = useState(false)
  const [agreement2, setAgreement2] = useState(false)

  const userData = {
    name: userName[0],
    id: userId[0],
    pw: userPw[0],
    email: userEmail[0],
    hp: userHp[0].join(),
    addr: userAddr,
    cart: [],
    like: [],
    watch: [],
    coupon: []
  }

  // console.log(dupChk)

  const formChk = (agree1, agree2, dupChk, ...rest) => {
    const agreeChk = agree1 && agree2 && dupChk
    const valueChk = !rest.some((el) => {
      return el[1] === false
    })
    return agreeChk && valueChk
  }

  const userNameHandler = (e) => {
    const regex = /^[가-힣]+$/
    const value = e.target.value.replace(/ /g, '')
    if (value !== '' && regex.test(value)) {
      setUserName([value, true])
    }
    else {
      setUserName([value, false])
    }
  }

  const userIdHandler = (e) => {
    const regex = /^[A-za-z0-9]{5,15}$/g;
    const value = e.target.value.replace(/ /g, '')
    if (value !== '' && regex.test(value)) {
      setUserId([value, true])
    }
    else {
      setUserId([value, false])
    }
    setDupChk(false)
  }

  const userPwHandler = (e) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
    const value = e.target.value.replace(/ /g, '')
    if (value !== '' && regex.test(value)) {
      setUserPw([value, true])
    }
    else {
      setUserPw([value, false])
    }
  }

  const userPwCfmHandler = (e) => {
    if (userPw[0] === e.target.value) {
      setUserPwCfm([e.target.value, true])
    }
    else {
      setUserPwCfm([e.target.value, false])
    }
  }

  const userEmailHandler = (e) => {
    const regex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    const value = e.target.value.replace(/ /g, '')
    if (value === '' || regex.test(value)) {
      setUserEmail([value, true])
    }
    else {
      setUserEmail([value, false])
    }
  }

  const userHpHandler = (e) => {
    const regex = {
      0: /^[0-9]+$/,
      1: /^[0-9]{3,4}$/,
      2: /^[0-9]{4,4}$/
    }
    const order = e.target.dataset.order
    const value = e.target.value.slice(0, 4).replace(/ /g, '')
    let copy = [...userHp]
    copy[0][order] = value
    copy[1] = true
    copy[0].forEach((el, idx) => {
      if (el === '' || !regex[idx].test(el)) {
        copy[1] = !copy[0].some((el) => {
          return el !== ''
        })
      }
    })
    setUserHp(copy)
  }

  const userAddrHandler = (e) => {
    setUserAddr(e.target.value)
  }

  return (
    <div className="join page-wrap">
      <nav className="page-nav">
        <h1>회원가입</h1>
      </nav>
      <section className="page-contents-wrap">
        <h3>회원정보입력</h3>

        <form action="">
          <table>
            <tbody>
              <tr className="user-name">
                <td>이름<span className="input-level required">*</span></td>
                <td>
                  <input
                    type="text"
                    placeholder="필수입력"
                    required
                    value={userName[0]}
                    onChange={userNameHandler} />
                  {
                    !userName[1] && userName[0].length !== 0 &&
                    <p className="desc">한글만 입력해 주세요.</p>
                  }
                </td>
              </tr>

              <tr className="user-id">
                <td>아이디<span className="input-level required">*</span></td>
                <td>
                  <input
                    type="text"
                    required placeholder="필수입력"
                    value={userId[0]}
                    onChange={userIdHandler} />
                  <button className="id-chk-button dark"
                    onClick={() => {
                      if (!userId[1]) return alert('사용 불가능한 아이디 입니다.')
                      axios({
                        url: 'https://port-0-portfolio-server-private-4y6tt2blds7g9x0.sel3.cloudtype.app/api/dupChk',
                        method: 'POST',
                        data: { userId: userId[0] }
                      })
                        .then((res) => {
                          setDupChk(res.data)
                          if (res.data) alert('사용 가능한 아이디 입니다.')
                          else alert('이미 사용중인 아이디 입니다.')
                        })
                    }}>중복확인</button>
                  {
                    !userId[1] && userId[0].length !== 0
                      ? <p className="desc">5자 이상 15자 이하의 영문 혹은 숫자만 입력하세요.</p>
                      : (userId[0] === '' || dupChk) || <p className="desc">아이디 중복확인을 해주세요.</p>
                  }
                </td>
              </tr>
              <tr className="user-pswd">
                <td>비밀번호<span className="input-level required">*</span></td>
                <td>
                  <input
                    type="password"
                    placeholder="필수입력"
                    required
                    value={userPw[0]}
                    onChange={userPwHandler} />
                  {
                    !userPw[1] && userPw[0].length !== 0 &&
                    <p className="desc">8자 이상 20자 이하의 영문, 숫자, 특수문자 조합의 비밀번호를 입력하세요.</p>
                  }
                </td>
              </tr>
              <tr className="user-pswd-chk">
                <td>비밀번호 확인<span className="input-level required">*</span></td>
                <td>
                  <input
                    type="password"
                    placeholder="필수입력"
                    required
                    value={userPwCfm[0]}
                    onChange={userPwCfmHandler} />
                  {
                    !userPwCfm[1] && userPwCfm[0].length !== 0 &&
                    <p className="desc">입력한 비밀번호와 일치하지 않습니다.</p>
                  }
                </td>
              </tr>
              <tr className="user-email">
                <td>이메일</td>
                <td>
                  <input
                    type="email"
                    placeholder="선택사항"
                    value={userEmail[0]}
                    onChange={userEmailHandler} />
                  {
                    !userEmail[1] && userEmail[0].length !== 0 &&
                    <p className="desc">입력을 생략하거나 올바른 이메일 주소를 입력하세요.</p>
                  }
                </td>
              </tr>
              <tr className="user-hp">
                <td>전화번호</td>
                <td>
                  <select
                    data-order={0}
                    value={userHp[0][0]}
                    onChange={userHpHandler}>
                    <option value="">선택</option>
                    <option value="010">010</option>
                    <option value="011">011</option>
                    <option value="017">017</option>
                  </select>
                  <span className="hyphen">-</span>
                  <input
                    type="text"
                    placeholder="선택사항"
                    data-order={1}
                    value={userHp[0][1]}
                    onChange={userHpHandler} />
                  <span className="hyphen">-</span>
                  <input
                    type="text"
                    placeholder="선택사항"
                    data-order={2}
                    value={userHp[0][2]}
                    onChange={userHpHandler} />
                  {
                    !userHp[1] &&
                    <p className="desc">입력을 생략하거나 올바른 휴대폰 번호를 입력하세요.</p>
                  }
                </td>
              </tr>
              <tr className="user-addr">
                <td>우편번호</td>
                <td>
                  <PostInput userAddr={userAddr} setUserAddr={setUserAddr}></PostInput>
                </td>
              </tr>
              <tr className="terms">
                <td>약관 동의 여부<span className="input-level required">*</span></td>
                <td>
                  <ul>
                    <li>
                      <input type="checkbox" id="agreement1" onChange={() => { setAgreement1(!agreement1) }}
                        checked={agreement1} readOnly />
                      <label htmlFor="agreement1"> 이용약관 동의</label>
                    </li>
                    <li>더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트
                      더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트
                      더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트
                      더미텍스트 더미텍스트 </li>
                  </ul>
                  <ul>
                    <li>
                      <input type="checkbox" id="agreement2" onChange={() => { setAgreement2(!agreement2) }}
                        checked={agreement2} readOnly />
                      <label htmlFor="agreement2"> 개인정보 수집 동의</label>
                    </li>
                    <li>더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트
                      더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트
                      더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트
                      더미텍스트 더미텍스트</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="user-reg">
            <input type="reset" value="초기화" onClick={(e) => {
              e.preventDefault()
              setUserName(['', false])
              setUserId(['', false])
              setUserPw(['', false])
              setUserPwCfm(['', false])
              setUserEmail(['', true])
              setUserHp([['', '', ''], true])
              setUserAddr({ zonecode: '', addr: '', detailAddr: '' })
              setAgreement1(false)
              setAgreement2(false)
            }} />
            <input type="submit" value="가입" onClick={(e) => {
              e.preventDefault()
              const chk = formChk(agreement1, agreement2, dupChk, userName, userId, userPw, userPwCfm, userEmail, userHp, agreement1, agreement2)
              if (chk) {
                axios({
                  url: 'https://port-0-portfolio-server-private-4y6tt2blds7g9x0.sel3.cloudtype.app/api/join',
                  method: 'POST',
                  data: { userData }
                })
                  .then((res) => {
                    alert(`회원가입이 완료 되었습니다.\n가입축하 쿠폰과 취업성공기원 쿠폰이 지급되었습니다.`)
                    navigate('/login')
                  })
              }
              else {
                alert('가입 정보를 입력 양식에 맞게 작성해 주세요.')
              }
            }} />
          </div>
        </form>
      </section>

    </div >
  )
}

export { Join }