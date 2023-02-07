import { useEffect, useState } from 'react';
//--------------------------------------------------------//
import { priceRangeList, sortTypeList } from '../variables/variablesBundle'
import { numberChk } from '../utils/_utilsBunddle'
import { useNavigate, useLocation } from 'react-router-dom';


export function FilterBox(props) {

  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [useSelectBox, setUseSelectBox] = useState(false)

  const { priceMax,
    priceSetRange, setPriceSetRange,
    priceFilter,
    setPriceFilter,
    sortType, setSortType, setCurrentPage } = props;

  useEffect(() => {
    setUseSelectBox(false)
  }, [useSelectBox])

  return (
    <section className="filter-wrap">
      <section className="price-filter-wrap">
        <h3 className="filter-criteria">가격</h3>
        <form action="">
          <ul>
            {
              priceRangeList.map((el, idx) => {
                return (
                  <li key={idx}>
                    <input
                      type="radio"
                      name="price-range"
                      id={el.type}
                      onClick={() => {
                        setPriceSetRange([0, priceMax])
                        setCurrentPage(1)
                        setPriceFilter({ type: el.type, range: [el.minPrice, el.maxPrice] })
                        navigate(pathname)
                      }}
                      defaultChecked={el.type === priceFilter.type ? true : false} />
                    <label htmlFor={el.type}>{el.desc}</label>
                  </li>
                )
              })
            }
            <li className="set-price-range">
              <input
                type="radio"
                name="price-range"
                id="setPriceRange"
                onClick={() => {
                  setPriceFilter({ type: 'priceRangeSet', range: [] })
                }}
                defaultChecked={priceFilter.type === 'priceRangeSet' ? true : false} />
              <label htmlFor="setPriceRange">직접입력</label>
              <input
                type="text"
                value={priceSetRange.length !== 0 ? priceSetRange[0] : "0"}
                onChange={(e) => {
                  numberChk(e)
                  setPriceSetRange([Number(e.target.value), (priceSetRange.length !== 0 ? priceSetRange[1] : priceMax)])
                }}
                disabled={priceFilter.type === 'priceRangeSet' ? false : true} />
              ~
              <input
                type="text"
                value={priceSetRange.length !== 0 ? priceSetRange[1] : priceMax}
                onChange={(e) => {
                  numberChk(e)
                  setPriceSetRange([(priceSetRange.length !== 0 ? priceSetRange[0] : 0), Number(e.target.value)])
                }}
                disabled={priceFilter.type === 'priceRangeSet' ? false : true} />
              <button
                type="submit"
                className="price-range-apply dark"
                onClick={(e) => {
                  e.preventDefault()
                  if (priceFilter.type !== 'priceRangeSet') return
                  setPriceFilter({ type: 'priceRangeSet', range: priceSetRange })
                  setCurrentPage(1)
                }}>적용</button>
            </li>
          </ul>
        </form>
      </section>

      <section className="sort-wrap">
        <select
          value={sortType}
          disabled={useSelectBox}
          onChange={(e) => {
            setSortType(e.target.value)
            setUseSelectBox(true)
          }}
        >
          {
            sortTypeList.map((el, idx) => {
              return (
                <option key={idx} value={el.type}>{el.desc}</option>
              )
            })
          }
        </select>
      </section>
    </section>
  )
}