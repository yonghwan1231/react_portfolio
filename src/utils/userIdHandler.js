export function userIdHandler(e) {
  const regex = /^[A-za-z0-9]{5,15}$/g;
  const value = e.target.value.replace(/ /g, '')
  if (value !== '' && regex.test(value)) {
    return [value, true]
  }
  else {
    return [value, false]
  }
}