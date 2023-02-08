import { useState } from 'react';
//--------------------------------------------------------//
import { useInqueryWrite } from '../hooks/_customHookBundle'

export function CsWrite() {

  const [inquiryTitle, setInquiryTitle] = useState('')
  const [inquiryContents, setInquiryContents] = useState('')
  const inqueryWrite = useInqueryWrite()

  return (
    <section className="page-contents-wrap">
      <form>
        <div className="write-title">
          <h1>제목</h1>
          <input
            type="text"
            placeholder='30자 제한'
            value={inquiryTitle}
            onChange={(e) => {
              if (e.target.value.length > 30) {
                e.target.value = e.target.value.slice(0, 29)
              }
              setInquiryTitle(e.target.value)
            }}></input>
        </div>
        <div className="write-contents">
          <h1>내용</h1>
          <textarea value={inquiryContents} onChange={(e) => {
            setInquiryContents(e.target.value)
          }}></textarea>
        </div>
        <div className="button-wrap">
          <button onClick={(e) => {
            e.preventDefault()
            setInquiryTitle('')
            setInquiryContents('')
          }}>초기화</button>
          <button className="dark" onClick={(e) => {
            e.preventDefault()
            if (!inquiryTitle || !inquiryContents) return;
            inqueryWrite(inquiryTitle, inquiryContents)
              .then(() => {
                setInquiryTitle('')
                setInquiryContents('')
              })
          }}>등록</button>
        </div>
      </form>
    </section>
  )
}