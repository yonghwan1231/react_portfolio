import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'
//--------------------------------------------------------//'
import { tabActiveChk } from '../utils/_utilsBunddle'

export function MainEventTab(props) {

  const eventData = useSelector(state => { return state.event })
  const [activeEventTab, setActiveEventTab] = useState('진행이벤트')
  const [eventList, setEventList] = useState([])

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

  useEffect(() => {
    changeEventList()
  }, [activeEventTab])

  return (
    <div className="news-wrap">
      <h1 className="title">
        <ul>
          <li
            className={tabActiveChk(activeEventTab, '진행이벤트')}
            onClick={() => {
              setActiveEventTab('진행이벤트')
            }}>
            <Link to='#'>진행이벤트</Link>
          </li>
          <li
            className={tabActiveChk(activeEventTab, '종료이벤트')}
            onClick={() => {
              setActiveEventTab('종료이벤트')
            }}><Link to='#'>종료이벤트</Link>
          </li>
        </ul>
        <span className="view-more"><Link to="event/ing">+</Link></span>
      </h1>
      <article className="news-board">
        <ul>
          {
            eventList.map((el, idx) => {
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
      </article>
    </div>
  )
}