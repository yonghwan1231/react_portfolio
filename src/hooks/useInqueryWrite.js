import { useSelector } from "react-redux"
import axios from "axios"

export function useInqueryWrite() {

  const loginUser = useSelector(state => { return state.loginUser })

  const inqueryWrite = (title, contents) => {
    if (!loginUser.login) return
    let year = new Date().getFullYear()
    let month = new Date().getMonth() + 1
    let date = new Date().getDate()

    month = String(month).length > 1
      ? month
      : '0' + month
    date = String(date).length > 1
      ? date
      : '0' + date

    const dateString = year + '-' + month + '-' + date

    return axios({
      url: 'https://port-0-portfolio-server-private-4y6tt2blds7g9x0.sel3.cloudtype.app/api/cswrite',
      method: 'POST',
      withCredentials: true,
      data: {
        postData: {
          name: loginUser.name,
          id: loginUser.id,
          date: dateString,
          title,
          contents
        }
      }
    })
      .then(() => {
        alert('등록되었습니다.')
      })
  }

  return inqueryWrite
}