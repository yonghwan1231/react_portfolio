import { Link } from 'react-router-dom'

export function PageNation(props) {
  return (
    <section className="pagination">
      <Link to={'#' + (props.currentPage)} className="prev-page" onClick={() => {
        if (props.currentPage != 1) props.setCurrentPage(props.currentPage - 1)
      }}>&lt;</Link>
      {
        props.pages.map((el, idx) => {
          return (
            <Link to={'#' + (idx + 1)} key={idx} className={props.currentPage === el ? 'page-num active' : 'page-num'} onClick={() => {
              props.setCurrentPage(idx + 1)
            }}>{el}</Link>
          )
        })
      }
      <Link to={'#' + (props.currentPage)} className="next-page" onClick={() => {
        if (props.pages.length > props.currentPage) props.setCurrentPage(props.currentPage + 1)
      }}>&gt;</Link>
    </section>
  )
}