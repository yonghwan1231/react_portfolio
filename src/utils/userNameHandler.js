export function userNameHandler(e) {
  const regex = /^[가-힣]+$/
  const value = e.target.value.replace(/ /g, '')
  if (value !== '' && regex.test(value)) {
    return [value, true]
  }
  else {
    return [value, false]
  }
}