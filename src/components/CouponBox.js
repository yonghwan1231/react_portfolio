
export function CouponBox(props) {

  const { setOpenCouponBox, couponTarget, couponList, setCouponList, usedCouponList, setUsedCouponList } = props

  function loadCouponList(coupon) {

    let copyList = [...couponList]
    copyList.forEach((el, idx) => {
      if (el.name === coupon.name) {
        copyList.splice(idx, 1)
        return
      }
    })
    setCouponList(copyList)

    const applyTarget = {
      ...couponTarget,
      coupon
    }
    let copyUsed = [...usedCouponList]
    copyUsed.push(applyTarget)
    setUsedCouponList(copyUsed)
    setOpenCouponBox(false)
  }

  return (
    <aside className='coupon-wrap'>
      <div className='coupon-box'>
        <button className='button-close' onClick={() => { setOpenCouponBox(false) }}></button>
        <h1>쿠폰선택</h1>
        <div className='coupon-list'>
          <table>
            <colgroup>
              <col width="40%" />
              <col width="20%" />
              <col width="20%" />
              <col width="20%" />
            </colgroup>
            <thead>
              <tr>
                <th>쿠폰명</th>
                <th>할인율</th>
                <th>기한</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                couponList.map((el, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{el.name}</td>
                      <td>{el.percentage}%</td>
                      <td>{el.period}</td>
                      <td><button className='dark'
                        onClick={() => { loadCouponList(el) }}
                      >적용</button></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </aside >
  )
}