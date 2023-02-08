import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
//--------------------------------------------------------//
import { CouponBox } from '../components/_ComponentBundle'
import { priceFormat, priceSum } from '../utils/_utilsBunddle'
import { UserInfoForm } from '../components/_ComponentBundle'
import { setOrderList } from '../stores/_reducerBundle'

export function Payment() {

  const dispatch = useDispatch()
  const loginUser = useSelector(state => { return state.loginUser })
  const localCart = useSelector(state => { return state.localCart })
  const orderList = useSelector(state => { return state.orderList })
  const [totalDiscount, setTotalDiscount] = useState(0)

  const [openCouponBox, setOpenCouponBox] = useState(false)
  const [couponList, setCouponList] = useState([])
  const [couponTarget, setCouponTarget] = useState([])
  const [usedCouponList, setUsedCouponList] = useState([])

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

  useEffect(() => {
    return () => {
      dispatch(setOrderList([]))
    }
  }, [])

  useEffect(() => {
    setUseSelectBox(false)
  }, [useSelectBox])

  useEffect(() => {
    if (loginUser.login) setCouponList([...loginUser.coupon])
  }, [loginUser, localCart])

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
      <UserInfoForm name={true} hp={true} addr={true} />

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
            총 {priceFormat(priceSum(orderList) - totalDiscount)}원
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
      </section>
    </div>
  )
}
