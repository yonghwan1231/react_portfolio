import { useSelector } from 'react-redux'
//--------------------------------------------------------//
import { usePageNation } from '../hooks/_customHookBundle'
import { PageNation } from '../components/_ComponentBundle'

function LookBook() {

  let lookbookData = useSelector(state => { return state.lookbook })
  let [pageItem, pages, currentPage, setCurrentPage] = usePageNation(lookbookData.lookbook, 9)

  return (
    <div className="lookbook page-wrap">

      <nav className="page-nav">
        <h1>룩북</h1>
      </nav>

      <section className="page-contents-wrap">
        <ul className="page-list">
          {
            pageItem.map((el, idx) => {
              return (
                <li key={idx}>
                  <figure className="item-img">
                    <img src={require('../assets/img/' + el.imgURL + '.jpg')} alt="" />
                  </figure>
                  <h3 className="lookbook-title">{el.title}</h3>
                </li>
              )
            })
          }
        </ul>
      </section>

      <PageNation pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  )
}

export { LookBook }