import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'
//--------------------------------------------------------//
import { priceFormat } from '../utils/_utilsBunddle'

export function MainBestItem(props) {

  const navigate = useNavigate()
  const loginUser = useSelector(state => { return state.loginUser })
  const productData = useSelector(state => { return state.product })
  const [activeProductTab, setActiveProductTab] = useState('전체')
  const [bestItemList, setBestItemList] = useState([])

  function activeChk(state, target) {
    return state === target ? 'active' : ''
  }

  function changeBestItem() {
    let targetData = []
    productData.product.forEach((el) => {
      if (el.category === activeProductTab) {
        targetData = [...el.itemList]
        return
      }
      else if (activeProductTab === '전체') {
        targetData = [...targetData, ...el.itemList]
      }
    })
    targetData
      .sort((a, b) => {
        return b.like - a.like
      })
      .length = 10
    setBestItemList(targetData)
  }

  useEffect(() => {
    changeBestItem()
  }, [activeProductTab])

  return (
    <div className="product-best-wrap">
      <h1>베스트 상품</h1>
      <ul className="product-best-nav">
        <li
          className={activeChk(activeProductTab, '전체')}
          onClick={() => {
            setActiveProductTab('전체')
          }}
        >전체</li>
        {
          productData.product.map((el, idx) => {
            return <li
              key={idx}
              className={activeChk(activeProductTab, el.category)}
              onClick={(e) => {
                setActiveProductTab(el.category)
              }}
            >{el.category}</li>
          })
        }
      </ul>
      <ul className="product-best-list">
        {
          bestItemList.map((el, idx) => (
            <li key={idx}>
              <figure
                className="product-best-img"
                onClick={() => {
                  navigate('/product/' + el.type + '/' + el.name)
                }}
              >
                <img src={require('../assets/img/' + el.imgURL + '.jpg')} alt="" />
                <span className="ranking">{idx + 1}위</span>
              </figure>
              <h3>{el.name}</h3>
              <p>{priceFormat(el.price)}</p>
              {loginUser.login && loginUser.like.includes(el.name)
                ? <p className="like">💗+{el.like}</p>
                : <p className="like">🤍+{el.like}</p>
              }
            </li>
          ))
        }
      </ul>
    </div>
  )
}