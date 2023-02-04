import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, } from 'react-router-dom'
import { useDispatch } from 'react-redux';
//--------------------------------------------------------//
import { Header, Footer, WatchedPopup } from './components/_ComponentBundle'
import { Main, Event, LookBook, Login, Join, Mypage, Product, ProductDetail, MyCart, MyLike, MyWatched, Payment, CsCenter } from './pages/_PageBundle'
import { useLoadData, useLoginChk } from './hooks/_customHookBundle'
import { addLocalCart } from './stores/_reducerBundle';

function App() {

  const [axiosComplete, axiosReq] = useLoadData()
  const [render, setRender] = useState(true)
  const loginChk = useLoginChk()
  const dispatch = useDispatch()

  useEffect(() => {
    axiosReq()
    loginChk()
    dispatch(addLocalCart())
  }, [])

  if (axiosComplete) return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/mypage" element={<Mypage />}>
          <Route path="cart" element={<MyCart />} />
          <Route path="like" element={<MyLike />} />
          <Route path="watched" element={<MyWatched />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/event/:id" element={<Event />} />
        <Route path="/lookbook" element={<LookBook />}></Route>
        <Route path="/product/:id" element={<Product />}>
          <Route path=":id" element={<ProductDetail render={render} setRender={setRender} />} />
        </Route>
        <Route path="/payment" element={<Payment />} />
        <Route path="/cs/:id" element={<CsCenter />} />
      </Routes>

      <Footer />

      <WatchedPopup />
    </>
  );
}

export default App;