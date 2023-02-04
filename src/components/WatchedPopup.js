import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

export function WatchedPopup() {

  const product = useSelector(state => { return state.product.product })
  const [watchedItem, setWatchedItem] = useState()

  function justWatched() {
    !localStorage.getItem('watched') && localStorage.setItem('watched', '[]')
    product.forEach((el) => {
      const item = el.itemList.find((el) => {
        return el.name === JSON.parse(localStorage.getItem('watched'))[0]
      })
      if (item) {
        setWatchedItem(item)
        return
      }
    })
  }

  useEffect(() => {
    justWatched()
  })

  return (
    <aside className="watched-wrap">
      <p className="watched-title"><Link to='/mypage/watched'>최근본상품</Link></p>
      {
        watchedItem &&
        <Link to={'/product/' + watchedItem.type + '/' + watchedItem.name}>
          <img src={require('../assets/img/' + watchedItem.imgURL + '.jpg')} alt="" />
        </Link>
      }
    </aside>
  )
}