import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
//--------------------------------------------------------//
import { eventUpdate } from '../stores/_reducerBundle'
import { MainSlider, MainBestItem, MainLookbook, MainEventTab, MainCsInfo } from '../components/_ComponentBundle'

function Main(props) {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(eventUpdate())
  })

  return (
    <div className="page-wrap home">
      <MainSlider></MainSlider>

      <section className="page-contents-wrap con-1">
        <MainBestItem />
      </section>

      <section className="page-contents-wrap con-2">
        <MainLookbook />
      </section>

      <section className="page-contents-wrap con-3">
        <MainEventTab />
        <MainCsInfo />
      </section>
    </div>
  )
}

export { Main }