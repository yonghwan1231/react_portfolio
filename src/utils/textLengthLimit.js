export function textLengthLimit(e, num) {
  if (e.target.value.length > num) {
    e.target.value = e.target.value.slice(0, num)
  }
}