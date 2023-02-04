function Footer() {
  return (
    <footer>
      <div className="border">
        <div className="link-wrap">
          <nav className="footer-nav">
            <ul>
              <li>회사소개<span className="between-line">|</span></li>
              <li>공지사항<span className="between-line">|</span></li>
              <li>이메일무단수집거부<span className="between-line">|</span></li>
              <li>이용약관<span className="between-line">|</span></li>
              <li>개인정보처리방침</li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="border grey">
        <div className="company-info">
          <h1 className="logo-wrap">DRESS SHOP</h1>
          <section className="address-wrap">
            <p>상호 : (주)업체명<span className="between-line">|</span>대표이사 : 홍길동<span className="between-line">|</span>주소 : 경기도 성남시 중원구
              성남동
              지번 호수<br />
              사업자 등록번호 : 000-00-00000<span className="between-line">|</span>통신 판매업 신고 : 제2022-성남중원-00000호<br />
              개인정보관리 책임 및 청소년보호 책임자 : 홍길동(xxx@xxxxx.co.kr)<span className="between-line">|</span>고객센터 : 031-000-0000, Fax :
              031-000-0000, xxx@xxxxx.co.kr<br />
            </p>
            <p>COPYRIGHTS &copy; 2022 YONGHWAN CO.LTD. ALL RIGHTS RESERVED.</p>
          </section>
        </div>
      </div>
    </footer>
  )
}

export { Footer }