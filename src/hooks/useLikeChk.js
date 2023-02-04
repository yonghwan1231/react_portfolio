import { useSelector } from 'react-redux'

export function useLikeChk(name) {
  let likeList = useSelector(state => { return state.loginUser.like })
  return likeList.some((el) => {
    return el.name === name
  })
}