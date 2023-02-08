export function userEmailHandler(e) {
  const regex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const value = e.target.value.replace(/ /g, '')
  if (value === '' || regex.test(value)) {
    return [value, true]
  }
  else {
    return [value, false]
  }
}