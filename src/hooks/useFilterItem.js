import { useEffect, useState } from "react"
import { useParams, } from "react-router-dom"
import { useSelector } from 'react-redux'

export function useFilterItem() {

  const { id } = useParams()
  const searchWord = useSelector(state => { return state.searchWord })
  const productData = useSelector(state => { return state.product })

  const [currentItem, setCurrentItem] = useState([])
  const [currentCategory, setCurrentCategory] = useState(id)
  const [priceFilter, setPriceFilter] = useState({ type: 'priceRangeAll', range: [] })
  const [priceMax, setPriceMax] = useState(Infinity)
  const [priceSetRange, setPriceSetRange] = useState([])
  const [sortType, setSortType] = useState('like')

  useEffect(() => {
    let targetData = []
    let maxValue = []
    productData.product.forEach((el) => {
      if (id === 'all') {
        targetData = [...targetData, ...el.itemList]
      }
      else if (id === el.urlParam) {
        targetData = [...el.itemList]
        return
      }
      else if (id === 'search' && currentCategory === 'all') {
        let searchData = el.itemList.filter(el2 => el2.name.includes(searchWord))
        targetData = [...targetData, ...searchData]
      }
      else if (id === 'search' && currentCategory === el.urlParam) {
        targetData = el.itemList.filter(el2 => el2.name.includes(searchWord))
        return
      }
    })
    maxValue = targetData.map((el) => {
      return el.price
    })
    if (priceFilter.range.length !== 0) {
      targetData = targetData.filter(el => priceFilter.range[0] <= el.price && el.price <= priceFilter.range[1])
    }

    targetData.sort((a, b) => {
      switch (sortType) {
        case 'name':
          return a[sortType].localeCompare(b[sortType], undefined, {
            numeric: true,
            sensitivity: 'base',
          });
        case 'ascending':
          return b.price - a.price
        case 'descending':
          return a.price - b.price
        default:
          return b[sortType] - a[sortType]
      }
    })
    setCurrentItem(targetData)
    setPriceMax(Math.max(...maxValue))
  }, [id, priceFilter, sortType, searchWord, currentCategory])

  useEffect(() => {
    setPriceSetRange([])
    if (priceFilter.type === 'priceRangeSet') {
      setPriceFilter({ type: 'priceRangeSet', range: [] })
    }
  }, [currentCategory])

  useEffect(() => {
    if (id === 'search') setCurrentCategory('all')
  }, [searchWord])

  useEffect(() => {
    if (productData.product.map((el) => {
      return el.urlParam
    }).includes(id)) {
      setCurrentCategory(id)
    }
  }, [id])

  return [
    currentItem,
    currentCategory, setCurrentCategory,
    priceFilter, setPriceFilter,
    priceMax,
    priceSetRange, setPriceSetRange,
    sortType, setSortType
  ]
}