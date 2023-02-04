import { useEffect, useState, useRef } from "react"
import { Link, useParams, useLocation, useNavigate, Outlet } from "react-router-dom"
import { useSelector } from 'react-redux'
//--------------------------------------------------------//
import { useFilterItem, usePageNation } from '../hooks/_customHookBundle'
import { PageNation, FilterBox } from '../components/_ComponentBundle'
import { priceFormat } from '../utils/_utilsBunddle'

function Product() {

  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { id } = useParams()
  const productData = useSelector(state => { return state.product })
  const loginUser = useSelector(state => { return state.loginUser })
  const searchWord = useSelector(state => { return state.searchWord })
  const [detailPage, setDetailPage] = useState(false)
  const contentRef = useRef()

  const [
    currentItem,
    currentCategory, setCurrentCategory,
    priceFilter, setPriceFilter,
    priceMax,
    priceSetRange, setPriceSetRange,
    setSortType] = useFilterItem()

  const [pageItem, pages, currentPage, setCurrentPage] = usePageNation(currentItem, 12)

  const fillterBoxProps = {
    priceMax,
    priceSetRange, setPriceSetRange,
    priceFilter, setPriceFilter,
    setSortType,
    setCurrentPage
  }

  useEffect(() => {
    contentRef.current?.scrollIntoView(true)
  }, [currentPage])

  return (
    <>
      <Outlet context={{ setDetailPage }} />
      {
        detailPage
          ? null
          :
          <div className="product page-wrap">

            <nav className="page-nav">
              {
                id === 'search'
                  ? <h1>"{searchWord}" 검색결과</h1>
                  : <h1>상품</h1>
              }
              {
                <ul>
                  <li className={currentCategory === 'all' ? 'active' : ''}>
                    <Link to={id === 'search' ? (pathname + '#all') : ('/product/all')}
                      onClick={() => {
                        setCurrentCategory('all')
                        setCurrentPage(1)
                      }}>전체</Link>
                  </li>
                  {
                    productData.product.map((el, idx) => {
                      return (
                        <li key={idx} className={currentCategory === el.urlParam ? 'active' : ''}>
                          <Link
                            to={id === 'search' ? (pathname + '#' + el.urlParam) : ('/product/' + el.urlParam)}
                            onClick={() => {
                              setCurrentCategory(el.urlParam)
                              setCurrentPage(1)
                            }}>{el.category}</Link>
                        </li>
                      )
                    })
                  }
                </ul>
              }
            </nav>

            <FilterBox {...fillterBoxProps} />

            <section className="page-contents-wrap" ref={contentRef}>
              <h4>총 {currentItem.length}개의 상품이 있습니다.</h4>
              <ul className="page-list">
                {
                  pageItem.map((el, idx) => {
                    return (
                      <li key={idx}>
                        <figure className="item-img" onClick={() => { navigate('/product/' + el.type + '/' + el.name) }}>
                          <img src={require('../assets/img/' + el.imgURL + '.jpg')} alt="" />
                          {/* <span className="add-cart"><a href=""><img src={require('../assets/img/ic_add_cart.png')}
                            alt="" /></a></span> */}
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

          </div>
      }
    </>
  )
}

export { Product }