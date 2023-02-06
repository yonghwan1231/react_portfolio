import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
//--------------------------------------------------------//
import { loadUserData, addLocalCart } from '../stores/_reducerBundle'

export function useAddCart() {

  const loginUser = useSelector(state => { return state.loginUser })
  const dispatch = useDispatch()

  const addCart = (data) => {
    if (!loginUser.login) {
      let localCart = JSON.parse(localStorage.getItem('cart'))
      cartDupChk(localCart, data)
      localStorage.setItem('cart', JSON.stringify(localCart))
      dispatch(addLocalCart(localCart))
    }
    else {
      let userCart = [...loginUser.cart]
      cartDupChk(userCart, data)
      axios({
        url: 'https://port-0-portfolio-server-private-4y6tt2blds7g9x0.sel3.cloudtype.app//api/addcart',
        method: 'POST',
        withCredentials: true,
        data: { cart: userCart }
      })
        .then((res) => {
          dispatch(loadUserData({ login: true, ...res.data }))
        })
    }
  }
  return addCart
}

function cartDupChk(cart, data) {
  if (cart.length === 0) return cart.push(...data)
  data.forEach((el) => {
    let dupItem = cart.findIndex((el2) => {
      return el.name === el2.name && el.selectOption === el2.selectOption
    })
    if (dupItem === -1) {
      cart.push(el)
    }
    else {
      let copy = { ...cart[dupItem] }
      copy.count += el.count
      cart[dupItem] = copy
    }
  })
}