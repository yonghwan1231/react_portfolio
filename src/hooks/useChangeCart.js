import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
//--------------------------------------------------------//
import { loadUserData, addLocalCart } from '../stores/_reducerBundle'

export function useChangeCart() {

  const dispatch = useDispatch()
  const loginUser = useSelector(state => { return state.loginUser })
  const localCart = useSelector(state => { return state.localCart })

  const changeCart = (data) => {
    let target = loginUser.login ? [...loginUser.cart] : [...localCart]
    let idx = target.findIndex((el) => {
      return el.name === data.name && el.selectOption === data.option
    })
    let copy = { ...target[idx] }
    data.type === '+'
      ? copy.count++
      : copy.count > 1 && copy.count--
    target[idx] = copy
    if (loginUser.login) {
      axios({
        url: 'https://port-0-portfolio-server-private-4y6tt2blds7g9x0.sel3.cloudtype.app//api/addcart',
        method: 'POST',
        withCredentials: true,
        data: { id: loginUser.id, cart: target }
      })
        .then((res) => {
          dispatch(loadUserData({ login: true, ...res.data }))
        })
    }
    else {
      localStorage.setItem('cart', JSON.stringify(target))
      dispatch(addLocalCart(target))
    }
  }

  return changeCart
}