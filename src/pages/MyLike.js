import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
//--------------------------------------------------------//
import { priceFormat } from '../utils/_utilsBunddle'
import { usePageNation, usePushLike } from '../hooks/_customHookBundle'
import { PageNation } from '../components/_ComponentBundle'

export function MyLike() {

  const loginUser = useSelector(state => { return state.loginUser })
  const product = useSelector(state => { return state.product })
  const [likeList, setLikeList] = useState([])
  const pushLike = usePushLike()
  const navigete = useNavigate()

  let [pageItem, pages, currentPage, setCurrentPage] = usePageNation(likeList, 12)

  function loadWatchedList() {
    if (!loginUser.login) return;
    let userLike = [...loginUser.like]
    let list = []
    userLike.forEach((el) => {
      product.product.forEach((el2) => {
        let _break = false
        el2.itemList.forEach((el3) => {
          if (el3.name === el) {
            list.push(el3)
            return _break = true
          }
        })
        if (_break) return
      })
    })
    setLikeList(list)
  }

  useEffect(() => {
    loadWatchedList()
  }, [loginUser, product])

  return (
    <>
      <section className="page-contents-wrap">
        <ul className="page-list">
          {
            pageItem.map((el, idx) => {
              return (
                <li key={idx}>
                  <button className="button-close" onClick={() => { pushLike(el.name, el.type) }}></button>
                  <figure className="item-img" onClick={() => { navigete('/product/' + el.type + '/' + el.name) }}>
                    <img src={require('../assets/img/' + el.imgURL + '.jpg')} alt="" />
                  </figure>
                  <h3>{el.name}</h3>
                  <p>{priceFormat(el.price)}</p>
                  {
                    loginUser.login && loginUser.like.includes(el.name)
                      ? <p className="like">💗+{el.like}</p>
                      : <p className="like">🤍+{el.like}</p>
                  }
                </li>
              )
            })
          }
        </ul>
      </section>
      <PageNation pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} />

    </>
  )
}