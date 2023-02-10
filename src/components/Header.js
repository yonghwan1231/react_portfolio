import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
//--------------------------------------------------------//
import { sendSearchWord, addLocalCart } from '../stores/_reducerBundle'
import { useLogout, useAddCart } from '../hooks/_customHookBundle'
import { textLengthLimit } from '../utils/_utilsBunddle'

function Header(props) {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { pathname } = useLocation()
  const productData = useSelector(state => { return state.product })
  const loginState = useSelector(state => { return state.loginUser.login })
  const localCart = useSelector(state => { return state.localCart })
  const userCart = useSelector(state => { return state.loginUser.cart })
  const [mobileMenu, setMobileMenu] = useState(false)
  const [selectMenu, setSelectMenu] = useState('')
  const [wordUpdate, setWordUpdate] = useState('')
  const logout = useLogout()
  const addCart = useAddCart()

  useEffect(() => {
    if (!pathname.includes('product')) {
      setWordUpdate('')
      dispatch(sendSearchWord(''))
    }
  }, [pathname])

  useEffect(() => {
    if (loginState && localStorage.getItem('cart')) {
      addCart(JSON.parse(localStorage.getItem('cart')))
      localStorage.setItem('cart', '[]')
      dispatch(addLocalCart([]))
    }
  }, [loginState])

  return (
    <header>
      <div className="logo-wrap">
        <h1><Link to='/'>DRESS SHOP</Link></h1>
        <div className="search-bar show-desktop">
          <form action="">
            <input type="text" placeholder="검색어를 입력해 주세요." value={wordUpdate} onChange={(e) => {
              textLengthLimit(e, 20)
              setWordUpdate(e.target.value)
            }} />
            <button type="submit" onClick={(e) => {
              e.preventDefault()
              if (!wordUpdate) alert('검색어를 입력해 주세요.')
              else {
                dispatch(sendSearchWord(wordUpdate.trim()))
                navigate('/product/search')
              }
            }}><img src={require('../assets/img/ic_search.png')} alt="" /></button>
          </form>
        </div>
        <nav className="quick-nev">
          <ul>
            <li><Link to='/mypage/watched'><img src={require('../assets/img/ic_user.png')} alt="" /></Link></li>
            <li>
              <Link to='/mypage/cart'><img src={require('../assets/img/ic_basket.png')} alt="" />
                <span>
                  {
                    userCart
                      ? userCart.length
                      : localCart.length
                  }
                </span>
              </Link>
            </li>
            <li onClick={() => { alert('준비중입니다.') }}><img src={require('../assets/img/ic_delivery.png')} alt="" /></li>
          </ul>
        </nav>
      </div>
      <div className="border both grey">
        <div className="gnb-wrap">
          <nav className="side-nav">
            <img src={require('../assets/img/ic_menu.png')} alt="" className='show-desktop' />
            <img src={require('../assets/img/ic_menu.png')} alt="" className='show-mobile'
              onClick={() => { setMobileMenu(true) }} />
            <span className="show-desktop"><Link to='/product/all'>전체카테고리</Link></span>
            <figure className="category-wrap show-desktop">
              <ul className="category-main">
                {
                  productData.product.map((el, idx) => {
                    return (
                      <li key={idx}><Link to={'/product/' + el.urlParam}>{el.category}</Link></li>
                    )
                  })
                }
              </ul>
            </figure>
            <figure className={
              mobileMenu
                ? "category-wrap show-mobile active"
                : "category-wrap show-mobile"
            }>
              <button className="button-close" onClick={() => { setMobileMenu(false) }}></button>
              <div className="search-bar">
                <form action="">
                  <button type="submit" onClick={(e) => {
                    e.preventDefault()
                    if (!wordUpdate) alert('검색어를 입력해 주세요.')
                    else {
                      dispatch(sendSearchWord(wordUpdate.trim()))
                      setMobileMenu(false)
                      navigate('/product/search')
                    }
                  }}><img src={require('../assets/img/ic_search.png')} alt="" /></button>
                  <input type="text" placeholder="검색어를 입력해 주세요." value={wordUpdate} onChange={(e) => {
                    setWordUpdate(e.target.value)
                  }} />
                </form>
              </div>
              <nav className="quick-nav">
                <ul>
                  {
                    loginState
                      ? <li onClick={(e) => {
                        navigate('/');
                        logout(e)
                        setMobileMenu(false)
                      }}>
                        <img src={require('../assets/img/ic_mobile_login.png')} alt="" />
                        <span>로그아웃</span>
                      </li>
                      : <li onClick={() => {
                        navigate('/login'); setMobileMenu(false)
                      }}>
                        <img src={require('../assets/img/ic_mobile_login.png')} alt="" />
                        <span>로그인</span>
                      </li>
                  }
                  <li onClick={() => { navigate('/mypage/cart'); setMobileMenu(false) }}>
                    <img src={require('../assets/img/ic_mobile_basket.png')} alt="" />
                    <span>장바구니</span>
                  </li>
                  <li onClick={() => { alert('준비중입니다.'); }}>
                    <img src={require('../assets/img/ic_mobile_delivery.png')} alt="" />
                    <span>배송조회</span>
                  </li>
                </ul>
              </nav>
              <ul className="category-main">
                <li className={selectMenu === 'product' ? 'active' : ''}
                  onClick={() => { selectMenu === 'product' ? setSelectMenu('') : setSelectMenu('product') }}>
                  <Link to="#">카테고리</Link>
                  <ul className="category-sub">
                    {
                      productData.product.map((el, idx) => {
                        return (
                          <li key={idx} onClick={() => { setMobileMenu(false) }}>
                            <Link to={'/product/' + el.urlParam}>{el.category}</Link>
                          </li>
                        )
                      })
                    }
                  </ul>
                </li>
                <li className={selectMenu === 'event' ? 'active' : ''}
                  onClick={() => { selectMenu === 'event' ? setSelectMenu('') : setSelectMenu('event') }}>
                  <Link to='#'>이벤트</Link>
                  <ul className="category-sub">
                    <li onClick={() => { setMobileMenu(false) }}>
                      <Link to='/event/ing'>진행이벤트</Link>
                    </li>
                    <li onClick={() => { setMobileMenu(false) }}>
                      <Link to='/event/end'>종료이벤트</Link>
                    </li>
                  </ul>
                </li>
                <li className={selectMenu === 'lookbook' ? 'active' : ''}
                  onClick={() => { selectMenu === 'lookbook' ? setSelectMenu('') : setSelectMenu('lookbook') }}>
                  <Link to="#">룩북</Link>
                  <ul className="category-sub">
                    <li onClick={() => { setMobileMenu(false) }}>
                      <Link to='/lookbook'>룩북</Link>
                    </li>
                  </ul>
                </li>
                <li className={selectMenu === 'cs' ? 'active' : ''}
                  onClick={() => { selectMenu === 'cs' ? setSelectMenu('') : setSelectMenu('cs') }}>
                  <Link to="#">고객센터</Link>
                  <ul className="category-sub">
                    <li onClick={() => { setMobileMenu(false) }}>
                      <Link to='/cs/write'>문의접수</Link>
                    </li>
                    <li onClick={() => { setMobileMenu(false) }}>
                      <Link to='/cs/history'>문의내역</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </figure>
          </nav>
          <nav className="event-nav">
            <ul>
              <li><Link to='/event/ing'>이벤트</Link></li>
              <li><Link to='/lookbook'>룩북</Link></li>
              {/* <li>오프라인</li> */}
            </ul>
          </nav>
          <nav className="user-nav show-desktop">
            <ul>
              {
                loginState
                  ?
                  <li onClick={logout}><Link to='/'>로그아웃</Link></li>
                  :
                  <>
                    <li><Link to='/join'>회원가입</Link></li>
                    <li><Link to='/login'>로그인</Link></li>
                  </>
              }
              <li><Link to='/cs/write'>고객센터</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header >
  )
}

export { Header }