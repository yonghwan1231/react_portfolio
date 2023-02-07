import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
//--------------------------------------------------------//
import { priceFormat } from '../utils/_utilsBunddle'
import { PostInput } from '../components/PostInput'
import { setOrderList } from '../stores/_reducerBundle'

export function Payment() {

  const dispatch = useDispatch()
  const loginUser = useSelector(state => { return state.loginUser })
  const localCart = useSelector(state => { return state.localCart })
  const orderList = useSelector(state => { return state.orderList })
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalDiscount, setTotalDiscount] = useState(0)

  const [openCouponBox, setOpenCouponBox] = useState(false)
  const [couponList, setCouponList] = useState([])
  const [couponTarget, setCouponTarget] = useState([])
  const [usedCouponList, setUsedCouponList] = useState([])

  const [userName, setUserName] = useState(['', false])
  const [userHp, setUserHp] = useState([['', '', ''], true])
  const [userAddr, setUserAddr] = useState({ zonecode: '', addr: '', detailAddr: '' })

  const [useSelectBox, setUseSelectBox] = useState(false)

  function discount() {
    if (!usedCouponList.length > 0) return setTotalDiscount(0)
    let total = usedCouponList.reduce((acc, curr) => {
      return acc + curr.price * (curr.coupon.percentage * 0.01)
    }, 0)
    setTotalDiscount(total)
  }

  function couponChk(name, option) {
    const result = usedCouponList.find((el) => {
      return el.name === name && el.selectOption === option
    })
    if (result) return result.coupon.percentage * 0.01
    else return false
  }

  function couponCancel(name, option) {
    let copy = [...usedCouponList]
    copy.forEach((el, idx) => {
      if (el.name === name && el.selectOption === option) {
        setCouponList([...couponList, el.coupon])
        copy.splice(idx, 1)
        return
      }
    })
    setUsedCouponList(copy)
  }

  function priceSum() {
    let totalCount = orderList.reduce((acc, curr) => {
      return acc + curr.price * curr.count
    }, 0)
    setTotalPrice(totalCount)
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

  useEffect(() => {
    return () => {
      dispatch(setOrderList([]))
    }
  }, [])

  useEffect(() => {
    if (loginUser.login) setCouponList([...loginUser.coupon])
  }, [loginUser, localCart])

  useEffect(() => {
    priceSum()
  }, [orderList])

  useEffect(() => {
    discount()
  }, [usedCouponList])

  return (
    <div className="mypage payment page-wrap">
      <nav className="page-nav">
        <h1>결제하기</h1>
      </nav>
      <h3>
        구매자 정보
      </h3>
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
            <tr className="user-hp">
              <td>전화번호<span className="input-level required">*</span></td>
              <td>
                <select
                  data-order={0}
                  value={userHp[0][0]}
                  disabled={useSelectBox}
                  onChange={(e) => {
                    userHpHandler(e)
                    setUseSelectBox(true)
                  }}>
                  <option value="">선택</option>
                  <option value="010">010</option>
                  <option value="011">011</option>
                  <option value="017">017</option>
                </select>
                <span className="hyphen">-</span>
                <input
                  type="text"
                  placeholder="필수입력"
                  data-order={1}
                  value={userHp[0][1]}
                  onChange={userHpHandler} />
                <span className="hyphen">-</span>
                <input
                  type="text"
                  placeholder="필수입력"
                  data-order={2}
                  value={userHp[0][2]}
                  onChange={userHpHandler} />
                {
                  !userHp[1] &&
                  <p className="desc">올바른 휴대폰 번호를 입력하세요.</p>
                }
              </td>
            </tr>
            <tr className="user-addr">
              <td>배송지<span className="input-level required">*</span></td>
              <td>
                <PostInput userAddr={userAddr} setUserAddr={setUserAddr} placeholder={'필수입력'}></PostInput>
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      <section className="page-contents-wrap payment">
        <table>
          <colgroup>
            <col width="10%" />
            <col width="30%" />
            <col width="20%" />
            <col width="20%" />
            <col width="20%" />
          </colgroup>
          <thead>
            <tr>
              <th>NO</th>
              <th>상품명(옵션)</th>
              <th>판매가</th>
              <th>수량</th>
              <th>할인</th>
            </tr>
          </thead>
          <tbody>
            {
              orderList.map((el, idx) => {
                return (
                  <tr key={idx}>
                    <td>
                      <div className="cart-contents-box">
                        {idx + 1}
                      </div>
                    </td>
                    <td className="cart-product-name">
                      <div className="cart-contents-box">
                        <figure className="cart-img-wrap">
                          <img src={require('../assets/img/' + el.imgURL + '.jpg')} alt="" />
                        </figure>
                        <p>
                          {el.name}
                          <span className="order-option">{el.selectOption}</span>
                          <strong className={
                            couponChk(el.name, el.selectOption)
                              ? "show-mobile sale"
                              : "show-mobile"
                          }>
                            {
                              couponChk(el.name, el.selectOption)
                                ? priceFormat((el.price * el.count) - (el.price * couponChk(el.name, el.selectOption)))
                                : priceFormat(el.price * el.count)
                            }
                          </strong>
                        </p>
                        <div className="cart-contents-box-mobile show-mobile">
                          <span>Qty : {el.count}</span>
                          <button className={
                            couponChk(el.name, el.selectOption)
                              ? 'cart-coupon dark'
                              : 'cart-coupon'
                          }
                            onClick={() => {
                              if (couponChk(el.name, el.selectOption)) {
                                couponCancel(el.name, el.selectOption)
                              }
                              else {
                                setCouponTarget(el)
                                setOpenCouponBox(true)
                              }
                            }}>
                            {
                              couponChk(el.name, el.selectOption)
                                ? '쿠폰취소'
                                : '쿠폰적용'
                            }
                          </button>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className={
                        couponChk(el.name, el.selectOption)
                          ? "cart-contents-box sale"
                          : "cart-contents-box"
                      }>
                        {
                          couponChk(el.name, el.selectOption)
                            ? priceFormat((el.price * el.count) - (el.price * couponChk(el.name, el.selectOption)))
                            : priceFormat(el.price * el.count)
                        }
                      </div>
                    </td>
                    <td>
                      <div className="cart-contents-box">
                        <span>Qty : {el.count}</span>
                      </div>
                    </td>
                    <td>
                      <div className="cart-contents-box">
                        <button className={
                          couponChk(el.name, el.selectOption)
                            ? 'cart-coupon dark'
                            : 'cart-coupon'
                        } onClick={() => {
                          if (couponChk(el.name, el.selectOption)) {
                            couponCancel(el.name, el.selectOption)
                          }
                          else {
                            setCouponTarget(el)
                            setOpenCouponBox(true)
                          }
                        }}>
                          {
                            couponChk(el.name, el.selectOption)
                              ? '쿠폰취소'
                              : '쿠폰적용'
                          }
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <ul className="order-wrap">
          <li className="order-price">
            총 {priceFormat(totalPrice - totalDiscount)}원
            {
              totalDiscount > 0
                ? <span className='discount'>(-{priceFormat(totalDiscount)})</span>
                : null

            }
          </li>
          <li className="order-button">
            <button className="dark" onClick={() => { alert('준비중입니다.') }}>결제하기</button>
          </li>
        </ul>
      </section>
      {
        openCouponBox &&
        <CouponBox
          setOpenCouponBox={setOpenCouponBox}
          couponTarget={couponTarget}
          couponList={couponList}
          setCouponList={setCouponList}
          usedCouponList={usedCouponList}
          setUsedCouponList={setUsedCouponList}
        />
      }
    </div>
  )
}

function CouponBox(props) {

  const { setOpenCouponBox, couponTarget, couponList, setCouponList, usedCouponList, setUsedCouponList } = props

  function loadCouponList(coupon) {

    let copyList = [...couponList]
    copyList.forEach((el, idx) => {
      if (el.name === coupon.name) {
        copyList.splice(idx, 1)
        return
      }
    })
    setCouponList(copyList)

    const applyTarget = {
      ...couponTarget,
      coupon
    }
    let copyUsed = [...usedCouponList]
    copyUsed.push(applyTarget)
    setUsedCouponList(copyUsed)
    setOpenCouponBox(false)
  }

  return (
    <aside className='coupon-wrap'>
      <div className='coupon-box'>
        <button className='button-close' onClick={() => { setOpenCouponBox(false) }}></button>
        <h1>쿠폰선택</h1>
        <div className='coupon-list'>
          <table>
            <colgroup>
              <col width="40%" />
              <col width="20%" />
              <col width="20%" />
              <col width="20%" />
            </colgroup>
            <thead>
              <tr>
                <th>쿠폰명</th>
                <th>할인율</th>
                <th>기한</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                couponList.map((el, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{el.name}</td>
                      <td>{el.percentage}%</td>
                      <td>{el.period}</td>
                      <td><button className='dark'
                        onClick={() => { loadCouponList(el) }}
                      >적용</button></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </aside >
  )
}
