export function userHpHandler(e, hp) {
  const regex = {
    0: /^[0-9]+$/,
    1: /^[0-9]{3,4}$/,
    2: /^[0-9]{4,4}$/
  }
  const order = e.target.dataset.order
  const value = e.target.value.slice(0, 4).replace(/ /g, '')
  let copy = [...hp]
  copy[0][order] = value
  copy[1] = true
  copy[0].forEach((el, idx) => {
    if (el === '' || !regex[idx].test(el)) {
      copy[1] = !copy[0].some((el) => {
        return el !== ''
      })
    }
  })
  return copy
}