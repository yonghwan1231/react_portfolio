export function priceFormat(input) {
  var input = input.toString()
  var number = input
  var comma = 0
  for (let i = 1; i < input.length / 3; i++) {
    var slice = number.slice(-3 * i - comma, number.length)
    var addComma = "," + slice
    var frontNum = number.slice(0, number.length - 3 * i - comma)
    var merge = frontNum + addComma
    number = merge
    comma++
  }
  return number
}