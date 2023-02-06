import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import { cloneDeep } from 'lodash'
//--------------------------------------------------------//
import { productAxios, loadUserData } from '../stores/_reducerBundle';

export function usePushLike() {

  const dispatch = useDispatch()
  const loginUser = useSelector(state => { return state.loginUser })
  const product = useSelector(state => { return state.product })

  const pushLike = (name, category) => {
    if (!loginUser.login) return alert('로그인 후 이용 가능합니다.');

    let userCopy = cloneDeep(loginUser)
    let productCopy = cloneDeep(product)

    productCopy.product.forEach((el) => {
      if (el.urlParam === category) {
        el.itemList.forEach((el2) => {
          if (el2.name === name) {
            const idx = userCopy.like.findIndex(el3 => el3 === el2.name)
            if (idx !== -1) {
              el2.like--
              userCopy.like.splice(idx, 1)
            }
            else {
              el2.like++
              userCopy.like.unshift(el2.name)
            }
            return
          }
        })
        return
      }
    })

    axios.all([
      axios.post('https://port-0-portfolio-server-private-4y6tt2blds7g9x0.sel3.cloudtype.app//api/like', { like: userCopy.like }, { withCredentials: true }),
      axios.post('https://port-0-portfolio-server-private-4y6tt2blds7g9x0.sel3.cloudtype.app//api/product', { product: productCopy })
    ])
      .then(
        axios.spread((res1, res2) => {
          dispatch(loadUserData({ login: true, ...res1.data }))
          dispatch(productAxios(res2.data))
        })
      )
  }
  return pushLike
}