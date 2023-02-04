import { useState, useEffect } from "react"

export function usePageNation(data, showLength, reverse = false) {

  let [pageItem, setPageItem] = useState([])
  let [pages, setPages] = useState([])
  let [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    let pageNum = Math.ceil(data.length / showLength)
    setPages([...Array(pageNum)].map((el, idx) => {
      return idx + 1
    }))
    setPageItem(
      reverse
        ? [...data].reverse().slice(showLength * (currentPage - 1), showLength * currentPage)
        : data.slice(showLength * (currentPage - 1), showLength * currentPage)
    )
  }, [data, currentPage])


  return [pageItem, pages, currentPage, setCurrentPage]
}