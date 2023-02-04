export function numberChk(e) {
  if (isNaN(e.target.value)) {
    alert('숫자만 입력하세요')
    e.target.value = ''
    return
  }
}