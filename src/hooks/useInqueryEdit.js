import axios from "axios";

export function useInqueryEdit() {

  const inqueryEdit = (editData) => {
    return axios({
      url: 'http://localhost:8080/api/csedit',
      method: 'POST',
      withCredentials: true,
      data: { editData }
    })
      .then(() => {
        alert('수정되었습니다.')
      })
  }

  return inqueryEdit
}