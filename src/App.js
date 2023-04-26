import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import loadable from "@loadable/component";
//--------------------------------------------------------//
import { Header, Footer, WatchedPopup, FunctionGuide } from "./components/_ComponentBundle";
import { Main, Event, LookBook, Login, Join, Mypage, ProductDetail, MyCart, MyLike, MyWatched, Payment, CsCenter, CsWrite, CsHistory } from "./pages/_PageBundle";
import { useLoadData, useLoginChk } from "./hooks/_customHookBundle";
import { addLocalCart } from "./stores/_reducerBundle";
const Product = loadable(() => import("./pages/Product"));

function App() {
  const { pathname } = useLocation();
  const [render, setRender] = useState(true);
  const [axiosComplete, axiosReq] = useLoadData();
  const loginChk = useLoginChk();
  const dispatch = useDispatch();

  useEffect(() => {
    axiosReq();
    loginChk();
    dispatch(addLocalCart());
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (axiosComplete)
    return (
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
          <Route path="/cs" element={<CsCenter />}>
            <Route path="write" element={<CsWrite />} />
            <Route path="history" element={<CsHistory />} />
          </Route>
        </Routes>

        <Footer />

        <WatchedPopup />
        <FunctionGuide />
      </>
    );
}

export default App;
