import { useEffect, useState, useRef } from "react"
import { useParams, useNavigate, useOutletContext } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
//--------------------------------------------------------//
import { priceFormat, priceSum, watchedSave } from '../utils/_utilsBunddle'
import { useAddCart, usePushLike } from '../hooks/_customHookBundle'
import { setOrderList } from '../stores/_reducerBundle'

function ProductDetail(props) {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const productData = useSelector(state => { return state.product })
  const loginUser = useSelector(state => { return state.loginUser })
  const { id } = useParams()
  const { setDetailPage } = useOutletContext()
  const [currentItem, setCurrentItem] = useState()
  const [selectItem, setSelectItem] = useState([])
  const [useSelectBox, setUseSelectBox] = useState(false)
  const addCart = useAddCart()
  const pushLike = usePushLike()

  const detailInfoRef = useRef()
  const reviewRef = useRef()
  const qaRef = useRef()
  const tabRef = [detailInfoRef, reviewRef, qaRef]
  const tabMenuList = ['detail-info', 'review', 'qa']

  function loadDetailItem(data) {
    data.forEach((el) => {
      el.itemList.forEach((el2) => {
        if (el2.name === id) {
          setCurrentItem(el2);
          return
        }
      })
    })
  }

  useEffect(() => {
    setDetailPage(true);
    return () => {
      setDetailPage(false);
    }
  }, [])

  useEffect(() => {
    setUseSelectBox(false)
  }, [useSelectBox])

  useEffect(() => {
    loadDetailItem(productData.product)
  }, [productData])

  useEffect(() => {
    watchedSave(currentItem, props)
  }, [currentItem])

  if (currentItem) return (
    <div className="product-detail page-wrap">
      <section className="page-contents-wrap product-picked">
        <figure className="product-picked-img">
          <img src={require('../assets/img/' + currentItem.imgURL + '.jpg')} alt="" />
        </figure>
        <div className="product-info-wrap">
          <h1 className="product-info product-title">{currentItem.name}</h1>
          <p className="product-info">
            <span>상품가</span>
            <span>{priceFormat(currentItem.price)}원</span>
          </p>
          <p className="product-info">
            <span>배송비</span>
            <span>3,500원</span>
          </p>
          <p className="product-info">
            <span>적립혜택</span>
            <span>최대 1% 적립</span>
          </p>
          <p className="product-info">
            <span>구매옵션</span>
            <select
              value='옵션 선택'
              disabled={useSelectBox}
              onChange={(e) => {
                setUseSelectBox(true)
                if (e.target.value !== 'none') {
                  let copy = [...selectItem]
                  let dupChk = copy.findIndex((el) => {
                    return el.selectOption === e.target.value
                  })
                  if (dupChk === -1) {
                    copy.push({
                      name: currentItem.name,
                      selectOption: e.target.value,
                      count: 1,
                      imgURL: currentItem.imgURL,
                      price: currentItem.price
                    })
                    setSelectItem(copy)
                  }
                  else return
                }
              }}>
              <option value='none'>옵션 선택</option>
              {
                currentItem.option.map((el, idx) => {
                  return (
                    <option value={el} key={idx}>
                      {el}
                    </option>
                  )
                })
              }
            </select>
          </p>
          <div className="product-info buy-info">
            {
              selectItem.map((el, idx) => {
                return (
                  <div className="select-option" key={idx}>
                    <p className="select-option-name">{el.name + ' [' + el.selectOption + ']'}</p>
                    <p className="select-option-price">
                      {priceFormat(el.count * el.price)}원
                    </p>
                    <div className="up-down-button">
                      <button className="count-down" onClick={() => {
                        let copy = [...selectItem]
                        if (copy[idx].count > 1) {
                          copy[idx].count--
                          setSelectItem(copy)
                        }
                        else {
                          copy.splice(idx, 1)
                          setSelectItem(copy)
                        }
                      }}>-</button>
                      <span className="buy-count">{el.count}</span>
                      <button className="count-up" onClick={() => {
                        let copy = [...selectItem]
                        copy[idx].count++
                        setSelectItem(copy)
                      }}>+</button>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <p className="product-info">
            <span>결제금액</span>
            <strong className="payment-amount">총 {priceFormat(priceSum(selectItem))}원</strong>
          </p>
          <div className="product-info button-buy-wrap">
            <button
              className={
                loginUser.login && loginUser.like.includes(currentItem.name)
                  ? 'button-like push'
                  : 'button-like'
              }
              onClick={() => { pushLike(currentItem.name, currentItem.type) }}>
              좋아요<span>&nbsp;{currentItem.like}</span>
            </button>
            <button className="button-cart" onClick={() => {
              if (selectItem.length > 0) {
                addCart(selectItem)
                alert('장바구니에 저장 되었습니다.')
                setSelectItem([])
              }
            }}>장바구니</button>
            <button className="button-buy" onClick={() => {
              dispatch(setOrderList(selectItem))
              navigate('/payment')
            }}>구매하기</button>
          </div>
        </div>
      </section>

      <section className="page-contents-wrap product-guide">
        {
          tabMenuList.map((el, idx) => {
            return (
              <section className={'product-' + el} ref={tabRef[idx]} key={idx}>
                <div
                  className={'tab-button' + (el === 'detail-info' ? ' active' : '')}
                  onClick={() => { detailInfoRef.current.scrollIntoView(true) }}
                >
                  상세정보
                </div>
                <div
                  className={'tab-button' + (el === 'review' ? ' active' : '')}
                  onClick={() => { reviewRef.current.scrollIntoView(true) }}
                >
                  상품평
                </div>
                <div
                  className={'tab-button' + (el === 'qa' ? ' active' : '')}
                  onClick={() => { qaRef.current.scrollIntoView(true) }}
                >
                  상품문의
                </div>
                <div className="tab-content">
                  {
                    [
                      <section>
                        <div>{currentItem.name}<br />상세정보 이미지</div>
                        <div>{currentItem.name}<br />상세정보 이미지</div>
                        <div>{currentItem.name}<br />상세정보 이미지</div>
                      </section>
                      ,
                      '작성된 문의글이 없습니다.',
                      '작성된 문의글이 없습니다.'
                    ][idx]
                  }
                </div>
              </section>
            )
          })
        }
      </section>
    </div>
  )
}

export { ProductDetail }