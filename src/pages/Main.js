import { useEffect, useState } from 'react'
import { useNavigate, Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
//--------------------------------------------------------//
import { eventUpdate } from '../stores/event'
import { priceFormat } from '../utils/priceFormat'

function Main(props) {

  // let lbLength = (document.querySelectorAll('.lookbook-wrap>ul>li').length) / 2;
  // document.documentElement.style.setProperty('--lbLength', `-${lbLength / 5 * 100}%`);
  // document.documentElement.style.setProperty('--lbLengthMobile', `-${lbLength / 2 * 100}%`);

  const dispatch = useDispatch()
  const productData = useSelector(state => { return state.product })
  const lookbookData = useSelector(state => { return state.lookbook })
  const eventData = useSelector(state => { return state.event })

  const [activeEventTab, setActiveEventTab] = useState('진행이벤트')
  const [activeProductTab, setActiveProductTab] = useState('전체')
  const [bestItemList, setBestItemList] = useState([])
  const [eventList, setEventList] = useState([])

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

  function changeEventList() {
    let targetData = []
    if (activeEventTab === '진행이벤트') {
      targetData = [...eventData.ing]
    }
    else {
      targetData = [...eventData.end]
    }
    setEventList(targetData)
  }

  function activeChk(state, target) {
    return state === target ? 'active' : ''
  }

  useEffect(() => {
    changeBestItem()
  }, [activeProductTab])

  useEffect(() => {
    changeEventList()
  }, [activeEventTab])

  useEffect(() => {
    dispatch(eventUpdate())
  })

  return (
    <div className="page-wrap home">
      <div>
        <img src={require('../assets/img/main_bg1.jpg')} alt="" className='main-banner' />
      </div>

      <section className="page-contents-wrap con-1">
        <div className="product-best-wrap">
          <h1>베스트 상품</h1>
          <ul className="product-best-nav">
            <li className={activeChk(activeProductTab, '전체')} onClick={() => {
              setActiveProductTab('전체')
            }}>전체</li>
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
          <BestItem bestItemList={bestItemList} />
        </div>
      </section>

      <section className="page-contents-wrap con-2">
        <div className="lookbook-wrap">
          <h1>LOOK BOOK</h1>
          <ul>
            {
              [...Array(2)].map(() => {
                return (
                  lookbookData.lookbook.map((el, idx) => {
                    return (
                      <li key={idx}>
                        <img src={require('../assets/img/' + el.imgURL + '.jpg')} alt="" />
                        <div className="lookbook-title">
                          <p>{el.title}
                            <Link to="/lookbook" className="show-desktop">VIEW MAGAZINE</Link>
                            <Link to="/lookbook" className="show-mobile">VIEW</Link>
                          </p>
                        </div>
                      </li>
                    )
                  })
                )
              })
            }
          </ul>
        </div>
      </section>

      <section className="page-contents-wrap con-3">
        <div className="news-wrap">
          <h1 className="title">
            <ul>
              <li
                className={activeChk(activeEventTab, '진행이벤트')}
                onClick={() => {
                  setActiveEventTab('진행이벤트')
                }}>
                <Link to='#'>진행이벤트</Link>
              </li>
              <li
                className={activeChk(activeEventTab, '종료이벤트')}
                onClick={() => {
                  setActiveEventTab('종료이벤트')
                }}><Link to='#'>종료이벤트</Link>
              </li>
            </ul>
            <span className="view-more"><Link to="event/ing">+</Link></span>
          </h1>
          <article className="news-board">
            <EventList eventList={eventList} />
          </article>
        </div>
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
      </section>
    </div>
  )
}

function BestItem(props) {

  const navigate = useNavigate()
  const loginUser = useSelector(state => { return state.loginUser })

  return (
    <ul className="product-best-list">
      {
        props.bestItemList.map((el, idx) => (
          <li key={idx}>
            <figure className="product-best-img" onClick={() => { navigate('/product/' + el.type + '/' + el.name) }}>
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
  )
}

function EventList(props) {

  return (
    <ul>
      {
        props.eventList.map((el, idx) => {
          if (idx >= 5) return;
          return (
            <li key={idx}>
              <a href="#" className="news-title">{el.title}</a>
              <span className="date">~{el.date}</span>
            </li>
          )
        })
      }
    </ul>
  )
}

export { Main }