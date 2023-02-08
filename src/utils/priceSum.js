export function priceSum(data) {
  let totalCount = data.reduce((acc, curr) => {
    return acc + curr.price * curr.count
  }, 0)
  return totalCount
}