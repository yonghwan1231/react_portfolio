export function userPwCfmHandler(e, pw) {
  if (pw[0] === e.target.value) {
    return [e.target.value, true]
  }
  else {
    return [e.target.value, false]
  }
}