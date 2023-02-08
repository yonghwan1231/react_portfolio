import { Link } from "react-router-dom"

export function MainCsInfo() {

  return (
    <div className="cs-wrap">
      <h1 className="title">
        고객센터<img src={require('../assets/img/ic_cs.png')} /><span className="cs-number">1512-3456</span>
      </h1>
      <p className="cs-info">
        운영시간 : 평일 09:00~18:00 <br className="show-mobile" />(점심시간 : 12:00~13:00)<br />
        cs_xxx@xxxxx.co.kr
      </p>
      <div className="service-wrap">
        <div className="button-box">
          <Link to="/cs/write">1:1문의</Link>
          <Link to="/cs/history">FAQ</Link>
        </div>
        <div className="site-box">
          <Link to="#"><img src={require('../assets/img/ic_sns1.png')} alt="" /></Link>
          <Link to="#"><img src={require('../assets/img/ic_sns2.png')} alt="" /></Link>
          <Link to="#"><img src={require('../assets/img/ic_sns3.png')} alt="" /></Link>
          <Link to="#"><img src={require('../assets/img/ic_sns4.png')} alt="" /></Link>
        </div>
      </div>
    </div>
  )
}