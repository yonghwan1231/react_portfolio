import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export function MyWatched() {

  const navigete = useNavigate()
  const product = useSelector(state => { return state.product })
  const [watchedList, setWatchedList] = useState()

  function loadWatchedList() {
    let localWatched = JSON.parse(localStorage.getItem('watched'))
    let list = []
    localWatched.forEach((el) => {
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
    setWatchedList(list)
  }

  useEffect(() => {
    loadWatchedList()
  }, [product])

  return (
    <section className="page-contents-wrap">
      <ul className="page-list">
        {
          watchedList &&
          watchedList.map((el, idx) => {
            return (
              <li key={idx}>
                <figure className="item-img" onClick={() => { navigete('/product/' + el.type + '/' + el.name) }}>
                  <img src={require('../assets/img/' + el.imgURL + '.jpg')} alt="" />
                </figure>
                <h3>{el.name}</h3>
              </li>
            )
          })
        }
      </ul>
    </section>
  )
}