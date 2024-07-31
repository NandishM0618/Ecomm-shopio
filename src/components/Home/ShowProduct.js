import ChevronRight from "@mui/icons-material/ChevronRight";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { clearErrors, getProduct } from "../../redux/actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { NextArrow, PrevArrow } from "../../more/Controls";
import { useEffect } from "react";
import { toast } from "react-toastify";
import ProductCard from "../Product/ProductCard";
// import "./ShowProductBanner.css";
const ShowProductBanner = () => {
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
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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
    <div className=" py-10">
      <div className="">
        <div className="relative">
          <img
            src="https://getwallpapers.com/wallpaper/full/4/7/f/1449014-vertical-blue-background-image-3840x2160-1080p.jpg"
            alt="banner"
            className=" h-[480px] w-full object-cover"
          />
          <div className=" absolute pl-7 top-32 items-center justify-center h-full left-0">
            <h3 className=" text-left font-bold text-white text-3xl mb-3">
              Deals of <br /> the Day
            </h3>
            <p className=" text-left text-white text-xl">08 : 32 : 09</p>
          </div>
          <div className=" absolute top-0 right-0 items-end justify-center">
            <div className="max-w-5xl w-full  mx-auto pt-10">
              {products && Array.isArray(products) && products.length > 0 ? (
                <Slider {...settings}>
                  {products
                    .filter((product) => product.category === "clothes") // Filter for electronics
                    .map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                </Slider>
              ) : (
                <p>No products found</p>
              )}
            </div>
          </div>
        </div>

        <div className=" py-8 p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className=" shadow-xl hover:scale-105 cursor-pointer">
            <img
              src="https://wallpapers.com/images/hd/xbox-background-8rgbpkrlc22ognhl.jpg"
              alt=""
              className=""
            />
          </div>
          <div className=" shadow-xl hover:scale-105 cursor-pointer">
            <img
              src="https://images6.alphacoders.com/133/1331511.png"
              alt=""
              className=""
            />
          </div>
          <div className=" shadow-xl hover:scale-105 cursor-pointer">
            <img
              src="https://images.samsung.com/is/image/samsung/assets/uk/smartphones/galaxy-s23-ultra/S23Ultra-KV-1920.jpg?$ORIGIN_JPG$"
              alt=""
              className=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowProductBanner;
