import axios from "axios"

export function useInqueryDelete() {

  const useInqueryDelete = (deleteId) => {
    return axios({
      url: 'https://port-0-portfolio-server-private-4y6tt2blds7g9x0.sel3.cloudtype.app/api/csdelete',
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