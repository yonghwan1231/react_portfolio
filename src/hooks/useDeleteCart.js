
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
//--------------------------------------------------------//
import { loadUserData, addLocalCart } from '../stores/_reducerBundle'

export function useDeleteCart() {

  const loginUser = useSelector(state => { return state.loginUser })
  const dispatch = useDispatch()

  const deleteCart = (data, targetName) => {
    let copy = [...data]
    const idx = copy.findIndex((el) => {
      return el.name === targetName
    })
    copy.splice(idx, 1)
    if (loginUser.login) {
      axios({
        url: 'https://port-0-portfolio-server-private-4y6tt2blds7g9x0.sel3.cloudtype.app/api/addcart',
        method: 'POST',
        withCredentials: true,
        data: { cart: copy }
      })
        .then((res) => {
          dispatch(loadUserData({ login: true, ...res.data }))
        })
    }
    else {
      localStorage.setItem('cart', JSON.stringify(copy))
      dispatch(addLocalCart(copy))
    }
  }

  return deleteCart
}