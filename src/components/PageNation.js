export function PageNation(props) {
  return (
    <section className="pagination">
      <a href={'#' + (props.currentPage)} className="prev-page" onClick={() => {
        if (props.currentPage != 1) props.setCurrentPage(props.currentPage - 1)
      }}>&lt;</a>
      {
        props.pages.map((el, idx) => {
          return (
            <a href={'#' + (idx + 1)} key={idx} className={props.currentPage === el ? 'page-num active' : 'page-num'} onClick={() => {
              props.setCurrentPage(idx + 1)
            }}>{el}</a>
          )
        })
      }
      <a href={'#' + (props.currentPage)} className="next-page" onClick={() => {
        if (props.pages.length > props.currentPage) props.setCurrentPage(props.currentPage + 1)
      }}>&gt;</a>
    </section>
  )
}