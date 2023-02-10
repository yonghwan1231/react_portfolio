import { useState, useEffect } from 'react';
import axios from 'axios';
//--------------------------------------------------------//
import { useInqueryEdit, useInqueryDelete, usePageNation } from '../hooks/_customHookBundle'
import { PageNation } from '../components/_ComponentBundle'
import { textLengthLimit } from '../utils/_utilsBunddle'

export function CsHistory() {

  const [viewPost, setViewPost] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [postList, setPostList] = useState([])
  const [currentPost, setCurrentPost] = useState()
  const [editPost, setEditPost] = useState()
  const [updateHistory, setUpdateHistory] = useState(true)
  const inqueryEdit = useInqueryEdit()
  const inqueryDelete = useInqueryDelete()

  let [pageItem, pages, currentPage, setCurrentPage] = usePageNation(postList, 10, true)

  useEffect(() => {
    axios({
      url: 'https://port-0-portfolio-server-private-4y6tt2blds7g9x0.sel3.cloudtype.app/api/cshistory ',
      method: 'GET',
      withCredentials: true
    })
      .then((res) => {
        setPostList(res.data)
      })
  }, [updateHistory])

  if (!postList.length > 0) return <div className='dummy-div'></div>
  else return (
    <>
      <section className="page-contents-wrap">
        <table>
          <thead>
            <tr>
              <th>NO</th>
              <th>제목</th>
              <th>글쓴이</th>
              <th>작성날짜</th>
            </tr>
          </thead>
          <tbody>
            {
              pageItem.map((el, idx) => {
                return (
                  <tr key={idx}>
                    <td>{postList.length - (10 * (currentPage - 1)) - idx}</td>
                    <td onClick={() => {
                      setViewPost(true)
                      setCurrentPost(el)
                      setEditPost(el)
                    }}>
                      <div className='text-ellipsis'>
                        <span>{el.title}</span>
                      </div>
                    </td>
                    <td>{el.name}</td>
                    <td>{el.date}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </section>

      {
        viewPost &&
        <aside className='post-popup-wrap'>
          <div className='post-popup'>
            <button className='button-close' onClick={() => {
              setViewPost(false)
              setEditMode(false)
            }}></button>
            <section className="page-contents-wrap">
              <form>
                <div className="write-title">
                  <h1>제목</h1>
                  <input
                    type="text"
                    className={editMode ? '' : 'read-only'}
                    readOnly={!editMode}
                    placeholder="30자 제한"
                    value={
                      editMode
                        ? editPost && editPost.title
                        : currentPost && currentPost.title
                    }
                    onChange={(e) => {
                      let copy = { ...editPost }
                      textLengthLimit(e, 30)
                      copy.title = e.target.value
                      setEditPost(copy)
                    }}></input>
                </div>
                <div className="write-contents">
                  <h1>내용</h1>
                  <textarea
                    className={editMode ? '' : 'read-only'}
                    readOnly={!editMode}
                    placeholder="1000자 제한"
                    value={
                      editMode
                        ? editPost && editPost.contents
                        : currentPost && currentPost.contents
                    }
                    onChange={(e) => {
                      let copy = { ...editPost }
                      textLengthLimit(e, 1000)
                      copy.contents = e.target.value
                      setEditPost(copy)
                    }}></textarea>
                </div>
                <div className="button-wrap" >
                  {
                    editMode
                      ? <>
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            setEditMode(false)
                            setEditPost({ ...currentPost })
                          }}>취소</button>
                        <button
                          className="dark"
                          onClick={(e) => {
                            e.preventDefault()
                            inqueryEdit(editPost)
                              .then(() => {
                                setUpdateHistory(!updateHistory)
                                setEditMode(false)
                                setViewPost(false)
                              })
                          }}>완료</button>
                      </>
                      : <>
                        <button
                          className="dark"
                          onClick={(e) => {
                            e.preventDefault()
                            const confirm = window.confirm('삭제하시겠습니까?')
                            if (confirm) {
                              inqueryDelete(currentPost._id)
                                .then(() => {
                                  setUpdateHistory(!updateHistory)
                                  setViewPost(false)
                                })
                            }
                          }}>삭제</button>
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            setEditMode(true)
                          }}>수정</button>
                      </>
                  }
                </div>
              </form>
            </section>
          </div>
        </aside>
      }

      <PageNation pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </>
  )
}