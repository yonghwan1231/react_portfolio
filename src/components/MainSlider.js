import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function MainSlider() {

  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      <div className="slider-item num-1">
        <figure className="text-box">
          <h4>DRESS SHOP</h4>
          <h1>설레는 봄 쇼핑할까요?</h1>
          <h3>미리 만나는 신상 쇼핑 제안전</h3>
        </figure>
      </div>
      <div className="slider-item num-2">
        <figure className="text-box color-white">
          <h4>DRESS SHOP</h4>
          <h1>ON AIR</h1>
          <h3>천연보습 발열내의 온에어</h3>
        </figure>
      </div>
      <div className="slider-item num-3">
        <figure className="text-box color-white">
          <h4>DRESS SHOP</h4>
          <h1>탐나는 악세러리 모음</h1>
          <h3>다양한 악세서리 만나기</h3>
        </figure>
      </div>
    </Slider>
  )
}