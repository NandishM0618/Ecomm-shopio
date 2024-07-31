/* eslint-disable jsx-a11y/alt-text */
import { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner from "../../assets/images/home-banner.jpg";
// import "./Hero.css";

import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearErrors, getProduct } from "../../redux/actions/productAction";
//import Loading from "../../more/Loader";
import Loading from "../../more/Loading";
import MetaData from "../../more/MetaData";
import ProductCard from "../Product/ProductCard";
import Category from "./Category";
import Slider from "react-slick";
import { NextArrow, PrevArrow } from "../../more/Controls";
import { Link } from "react-router-dom";
//import Header from "./Header";

const Hero = () => {
  const dispatch = useDispatch();
  const { products, error, loading } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <MetaData title="Home" />
      {loading ? (
        <Loading />
      ) : (
        <>
          {/* Carousel */}
          <div className="">
            <div className="relative">
              <img
                src={banner}
                alt=""
                className="w-full h-screen object-cover"
              />
              <div className="absolute  top-8 inset-0 flex flex-row justify-center items-center text-white">
                <div className="right-16 text-left text-xl top-32 leading-relaxed absolute  mb-3 max-w-lg">
                  <div className="mb-4 font-serif font-semibold  text-7xl text-black">
                    50% Off
                    <br />
                  </div>
                  <span className=" mb-2 text-3xl font-extralight text-black">
                    Top Brands On Offer Price*
                    <br />
                  </span>
                  Shop online for mobiles, books, watches, shoes and more at
                  Shopio. Find deals, discounts, offers and live streams on home
                  appliances, fashion, electronics and more.
                  <div className="relative mt-3">
                    <button className="border-2 p-3 border-white font-bold relative overflow-hidden group">
                      <Link
                        to="/products"
                        className="text-lg relative text-black/80 z-10"
                      >
                        Shop now
                      </Link>
                      <div className="absolute inset-0 bg-white transition-transform duration-500 transform -translate-x-full group-hover:translate-x-0"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Category />
          <div className="max-w-7xl mx-auto pt-10">
            <h2 className="text-2xl text-left font-medium w-1/4 leading-8 border-b-2 text-gray-800 p-2 py-4">
              Popular Products
            </h2>
            <div className="max-w-7xl mx-auto pt-10">
              {products && Array.isArray(products) && products.length > 0 ? (
                <Slider {...settings}>
                  {products
                    .filter((product) => product.category === "electronics") // Filter for electronics
                    .map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                </Slider>
              ) : (
                <p>No products found</p>
              )}
            </div>
          </div>

          <div className="max-w-7xl mx-auto pt-10">
            <h2 className="text-2xl text-left font-medium  w-1/4 leading-8 border-b-2 text-gray-800 p-2 py-4">
              Featured Products
            </h2>
            <div className="max-w-7xl w-full mx-auto pt-10 gap-3">
              {products && Array.isArray(products) && products.length > 0 ? (
                <Slider {...settings}>
                  {products
                    .filter((product) => product.category === "furnitures") // Filter for electronics
                    .map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                </Slider>
              ) : (
                <p>No products found</p>
              )}
            </div>
          </div>

          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </>
      )}
    </>
  );
};

export default Hero;
