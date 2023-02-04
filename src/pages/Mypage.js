import { Link, Outlet, useLocation } from 'react-router-dom'

function Mypage() {

  const { pathname } = useLocation()

  return (
    <div className="mypage page-wrap">
      <nav className="page-nav">
        <ul>
          <li className={pathname.includes('watched') ? 'active' : null}><Link to='/mypage/watched'>최근본상품</Link></li>
          <li className={pathname.includes('cart') ? 'active' : null}><Link to='/mypage/cart'>장바구니</Link></li>
          <li className={pathname.includes('like') ? 'active' : null}><Link to='/mypage/like'>좋아요</Link></li>
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}

export { Mypage }