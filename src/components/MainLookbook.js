import { useEffect } from "react";
import { Link } from "react-router-dom"
import { useSelector, } from 'react-redux'

export function MainLookbook() {

  const lookbookData = useSelector(state => { return state.lookbook })

  useEffect(() => {
    let lbLength = (document.querySelectorAll('.lookbook-wrap>ul>li').length) / 2;
    document.documentElement.style.setProperty('--lbLength', `-${lbLength / 5 * 100}%`);
    document.documentElement.style.setProperty('--lbLengthMobile', `-${lbLength / 2 * 100}%`);
  })

  return (
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
  )
}