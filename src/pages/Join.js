import { UserInfoForm } from '../components/_ComponentBundle'

function Join(props) {

  return (
    <div className="join page-wrap">
      <nav className="page-nav">
        <h1>회원가입</h1>
      </nav>
      <section className="page-contents-wrap">
        <h3>회원정보입력</h3>
        <UserInfoForm all={true} />
      </section>

    </div >
  )
}

export { Join }