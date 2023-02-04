import axios from "axios"

export function useInqueryDelete() {

  const useInqueryDelete = (deleteId) => {
    return axios({
      url: 'http://localhost:8080/api/csdelete',
      method: 'POST',
      withCredentials: true,
      data: { _id: deleteId }
    })
      .then(() => {
        alert('삭제되었습니다.')
      })
  }

  return useInqueryDelete
}