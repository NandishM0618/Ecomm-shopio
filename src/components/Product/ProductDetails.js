/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../redux/actions/productAction";

import MetaData from "../../more/MetaData";

import { Rating } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BottomTab from "../../more/Bottom";
import Footer from "../../more/Footer";
import Loading from "../../more/Loading";
import { addItemsToCart } from "../../redux/actions/cartAction";
import { addFavouriteItemsToCart } from "../../redux/actions/favActions";
import { NEW_REVIEW_RESET } from "../../redux/constants/productConstants";
import Header from "../Home/Header";
// import "./ProductDetails.css";
import ReviewCard from "./ReviewCard.js";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Slider from "react-slick";

const ProductDetails = () => {
  const { id } = useParams();
  const history = useNavigate();
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { isAuthenticated } = useSelector((state) => state.user);

  const reviewSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    {
      isAuthenticated !== true ? history(`/login?redirect=/`) : <></>;
    }

    dispatch(newReview(myForm));

    {
      comment.length === 0
        ? toast.error("Please fill the comment box")
        : toast.success("Review done successfully reload for watch it");
    }
    dispatch({ type: NEW_REVIEW_RESET });
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert]);

  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // Increase quantity
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return toast.error("Product stock limited");
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoSpeed: 2000,
  };

  const addToCartHandler = () => {
    if (product.Stock > 0) {
      dispatch(addItemsToCart(id, quantity));
      toast.success("Product Added to cart");
    } else {
      toast.error("Product stock limited");
    }
  };

  const addToFavouriteHandler = () => {
    dispatch(addFavouriteItemsToCart(id, quantity));
    toast.success("Product Added to Favourites");
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title={`${product.name}`} />
          <Header />
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="w-full">
                <Slider {...sliderSettings}>
                  {product.images?.map((img, index) => (
                    <div key={index}>
                      <img
                        src={img.url}
                        alt={`Product ${index + 1}`}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
              <div className="space-y-4 mt-10">
                <h2 className="text-2xl font-bold">{product.name}</h2>
                <div className="flex items-center space-x-2">
                  <Rating {...options} />
                  <span className="text-sm text-gray-600">
                    ({product.numOfReviews} Reviews)
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <h1 className="text-3xl font-semibold text-green-600">
                    ₹{product.offerPrice}
                  </h1>
                  {product.price > 0 && (
                    <h1 className="text-2xl line-through text-red-600">
                      ₹{product.price}
                    </h1>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-lg">Quantity</span>
                  <div className="flex items-center space-x-2">
                    <button
                      className="px-2 py-1 bg-gray-200 rounded"
                      onClick={decreaseQuantity}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      readOnly
                      value={quantity}
                      className="w-12 text-center border rounded"
                    />
                    <button
                      className="px-2 py-1 bg-gray-200 rounded"
                      onClick={increaseQuantity}
                    >
                      +
                    </button>
                  </div>
                </div>
                <p
                  className={
                    product.Stock < 1 ? "text-red-600" : "text-green-600"
                  }
                >
                  <b>{product.Stock < 1 ? "Out of Stock" : "In Stock"}</b>
                </p>
                <div>
                  <span className="block font-semibold">Description:</span>
                  <p className="text-gray-700">{product.description}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={addToFavouriteHandler}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-heart"
                      viewBox="0 0 16 16"
                    >
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path>
                    </svg>
                    <span className="opacity-70">Add to wishlist</span>
                  </div>
                  <div
                    className="flex items-center text-white space-x-2 bg-green-500 p-2 rounded cursor-pointer"
                    onClick={addToCartHandler}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-bag"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                    </svg>
                    <button className="add-to-cart-button  bg-none border-none text-white cursor-pointer">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Reviews Section */}
            <div className="mt-8">
              <h1 className="text-2xl font-bold border-b border-gray-300 pb-2">
                Reviews
              </h1>
            </div>
            <div className=" max-w-7xl mx-auto gap-5 mt-4 w-full flex items-center justify-center flex-wrap ">
              <div className="space-y-4">
                {product.reviews && product.reviews[0] ? (
                  <div className="space-y-4">
                    {product.reviews.map((review) => (
                      <ReviewCard key={review.id} review={review} />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No Reviews Yet *</p>
                )}
              </div>
              <div className="">
                <span className="text-xl font-semibold">Add a Review</span>
                <div className="flex flex-col space-y-4 mt-4">
                  <div>
                    <span className="block text-gray-700 mb-2">
                      Your Rating*
                    </span>
                    <Rating
                      onChange={(e) => setRating(e.target.value)}
                      value={rating}
                      size="large"
                    />
                  </div>
                  <textarea
                    cols="30"
                    rows="6"
                    placeholder="Comment *"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className=" w-full p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
                  ></textarea>
                  <button
                    type="submit"
                    className="bg-green-500 max-w-xl text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={reviewSubmitHandler}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer
            position="bottom-center"
            autoClose={1000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Footer />
          <BottomTab />
        </>
      )}
    </>
  );
};

export default ProductDetails;
