import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
//--------------------------------------------------------//
import { CouponBox } from '../components/_ComponentBundle'
import { priceFormat, priceSum } from '../utils/_utilsBunddle'
import { useChangeCart, useDeleteCart } from '../hooks/_customHookBundle'
import { setOrderList } from '../stores/_reducerBundle'

export function MyCart() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loginUser = useSelector(state => { return state.loginUser })
  const localCart = useSelector(state => { return state.localCart })
  const [cartList, setCartList] = useState([])
  const [totalDiscount, setTotalDiscount] = useState(0)

  const [openCouponBox, setOpenCouponBox] = useState(false)
  const [couponList, setCouponList] = useState([])
  const [couponTarget, setCouponTarget] = useState([])
  const [usedCouponList, setUsedCouponList] = useState([])

  const changeCart = useChangeCart()
  const deleteCart = useDeleteCart()

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

  function cartData() {
    let copy = loginUser.login ? [...loginUser.cart] : [...localCart]
    copy.sort((a, b) => {
      return a.name.localeCompare(b.name, undefined, {
        numeric: true,
        sensitivity: 'base',
      });
    })
    setCartList(copy)
  }

  useEffect(() => {
    cartData()
    if (loginUser.login) setCouponList([...loginUser.coupon])
  }, [loginUser, localCart])

  useEffect(() => {
    discount()
  }, [usedCouponList])

  return (
    <section className="page-contents-wrap">
      <table>
        <colgroup>
          <col width="8%" />
          <col width="36%" />
          <col width="14%" />
          <col width="14%" />
          <col width="14%" />
          <col width="14%" />
        </colgroup>
        <thead>
          <tr>
            <th>NO</th>
            <th>상품명(옵션)</th>
            <th>판매가</th>
            <th>수량</th>
            <th>할인</th>
            <th>주문관리</th>
          </tr>
        </thead>
        <tbody>
          {
            cartList.map((el, idx) => {
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
                        <div className="up-down-button">
                          <button className="count-up"
                            onClick={(e) => {
                              e.preventDefault()
                              changeCart({ type: '-', name: el.name, option: el.selectOption })
                            }}
                          >-</button>
                          <span className="buy-count">{el.count}</span>
                          <button className="count-down"
                            onClick={(e) => {
                              e.preventDefault()
                              changeCart({ type: '+', name: el.name, option: el.selectOption })
                            }}
                          >+</button>
                        </div>
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
                        <button className="cart-delete dark"
                          onClick={() => {
                            deleteCart(cartList, el.name)
                          }}>삭제</button>
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
                      <div className="up-down-button">
                        <button className="count-up"
                          onClick={(e) => {
                            e.preventDefault()
                            changeCart({ type: '-', name: el.name, option: el.selectOption })
                          }}
                        >-</button>
                        <span className="buy-count">{el.count}</span>
                        <button className="count-down"
                          onClick={(e) => {
                            e.preventDefault()
                            changeCart({ type: '+', name: el.name, option: el.selectOption })
                          }}
                        >+</button>
                      </div>
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
                  <td>
                    <div className="cart-contents-box">
                      <button className="cart-delete dark"
                        onClick={() => {
                          deleteCart(cartList, el.name)
                        }}
                      >삭제</button>
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
          총 {priceFormat(priceSum(cartList) - totalDiscount)}원
          {
            totalDiscount > 0
              ? <span className='discount'>(-{priceFormat(totalDiscount)})</span>
              : null

          }
        </li>
        <li className="order-button">
          <button className="dark" onClick={() => {
            if (cartList.length > 0) {
              dispatch(setOrderList([...cartList]))
              navigate('/payment')
            }
            else {
              alert('구매할 상품이 없습니다.')
            }
          }}>구매하기</button>
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
  )
}