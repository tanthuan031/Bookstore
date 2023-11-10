import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import * as React from "react";

import { Autoplay, Navigation, Pagination } from "swiper";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";

import CardProduct from "../../../components/base/CardProduct/CardProduct.js";
import { bookCoverData } from "../../../assets/data/bookcover.js";
import { connect } from "react-redux";
import { mapStateToProps } from "../../../utils/useSelector.js";

class OnSale extends React.Component {
  constructor(props) {
    super(props);
    this.mySwiper = React.createRef();
  }

  render() {
    return (
      <div className="d-flex align-items-center">
        <FaAngleLeft
          className="width-100px height-100px text-blue cursor-pointer d-none d-md-block"
          onClick={() => {
            if (!this.mySwiper.current) return;
            this.mySwiper.current.swiper.slidePrev();
          }}
        />
        <Swiper
          ref={this.mySwiper}
          className={`${this.props.app.width < 576 ? "" : "flex-grow-1 mx-3"}`}
          spaceBetween={16}
          slidesPerView={4}
          navigation={false}
          loop={true}
          pagination={{ clickable: true }}
          modules={[Autoplay, Navigation, Pagination]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: {
              slidesPerView: 2,
              spaceBetween: 8,
              pagination: {
                enabled: true,
              },
            },
            576: {
              slidesPerView: 2,
              pagination: {
                enabled: true,
              },
            },
            768: {
              slidesPerView: 3,
              pagination: {
                enabled: false,
              },
            },
            1200: {
              slidesPerView: 4,
              pagination: {
                enabled: false,
              },
            },
          }}
        >
          {this.props.data.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <CardProduct
                  productId={item.id}
                  productImage={bookCoverData[item.book_cover_photo]}
                  productName={item.book_title}
                  productAuthor={item.author_name}
                  productIsDiscount={item.is_discount}
                  productDiscountPrice={item.discount_price}
                  productBookPrice={item.book_price}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <FaAngleRight
          className="width-100px height-100px text-blue cursor-pointer d-none d-md-block"
          onClick={() => {
            if (!this.mySwiper.current) return;
            this.mySwiper.current.swiper.slideNext();
          }}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(OnSale);
