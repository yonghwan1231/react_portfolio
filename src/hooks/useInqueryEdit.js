import axios from "axios";

export function useInqueryEdit() {

  const inqueryEdit = (editData) => {
    return axios({
      url: 'https://port-0-portfolio-server-private-4y6tt2blds7g9x0.sel3.cloudtype.app//api/csedit',
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