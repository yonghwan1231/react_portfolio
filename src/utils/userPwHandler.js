export function userPwHandler(e) {
  const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
  const value = e.target.value.replace(/ /g, '')
  if (value !== '' && regex.test(value)) {
    return [value, true]
  }
  else {
    return [value, false]
  }
}