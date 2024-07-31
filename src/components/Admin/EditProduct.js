/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Typography } from "@mui/material";
import AccountTree from "@mui/icons-material/AccountTree";
import AttachMoney from "@mui/icons-material/AttachMoney";
import Description from "@mui/icons-material/Description";
import Spellcheck from "@mui/icons-material/Spellcheck";
import Storage from "@mui/icons-material/Storage";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../../more/MetaData";
import {
  clearErrors,
  getProductDetails,
  updateProduct,
} from "../../redux/actions/productAction";
// import "./newProduct.css";
// eslint-disable-next-line
import Discount from "@mui/icons-material/Discount";
import { toast, ToastContainer } from "react-toastify";
import { UPDATE_PRODUCT_RESET } from "../../redux/constants/productConstants";
import SideBar from "./Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../more/Loading";

const UpdateProduct = () => {
  const { id } = useParams();
  const history = useNavigate();
  const dispatch = useDispatch();

  const {
    loading: updateLoading,
    error,
    product,
  } = useSelector((state) => state.productDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.deleteProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  // eslint-disable-next-line
  const [offerPrice, setOfferPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Personal",
    "cloth",
    "Ladies Cloth",
    "Shoes",
    "Food",
    "Electronics",
    "Sports",
    "Others",
  ];

  const productId = id;

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.Stock);
      setOldImages(product.images);
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Product Updated Successfully");
      history("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    history,
    isUpdated,
    productId,
    product,
    updateError,
  ]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("offerPrice", offerPrice);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateProduct(productId, myForm));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="Edit Product" />
      <div className="flex h-screen bg-gray-100">
        <SideBar />
        <div className="flex-1 max-w-5xl mx-auto mr-10 p-6">
          {loading ? (
            <Loading />
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-md">
              <Typography
                variant="h4"
                className="font-semibold mb-6 text-gray-700"
              >
                Edit Product
              </Typography>
              <form
                className="grid gap-6"
                encType="multipart/form-data"
                onSubmit={updateProductSubmitHandler}
              >
                <div className="flex items-center gap-4">
                  <Spellcheck className="text-gray-600" />
                  <input
                    type="text"
                    placeholder="Product Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <Discount className="text-gray-600" />
                  <input
                    type="text"
                    placeholder="Discount Percent *optional"
                    value={offerPrice}
                    onChange={(e) => setOfferPrice(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <AttachMoney className="text-gray-600" />
                  <input
                    type="number"
                    placeholder="Product Price"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="flex items-start gap-4">
                  <Description className="text-gray-600 mt-2" />
                  <textarea
                    placeholder="Product Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    cols="30"
                    rows="4"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  ></textarea>
                </div>
                <div className="flex items-center gap-4">
                  <AccountTree className="text-gray-600" />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Choose Category</option>
                    {categories.map((cate) => (
                      <option key={cate} value={cate}>
                        {cate}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-4">
                  <Storage className="text-gray-600" />
                  <input
                    type="number"
                    placeholder="Stock"
                    required
                    value={Stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProductImagesChange}
                    multiple
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="grid gap-4">
                  {oldImages &&
                    oldImages.map((image, index) => (
                      <img
                        key={index}
                        src={image.url}
                        alt="Old Product Preview"
                        className="w-32 h-32 object-cover rounded-md"
                      />
                    ))}
                </div>
                <div className="grid gap-4">
                  {imagesPreview.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt="Product Preview"
                      className="w-32 h-32 object-cover rounded-md"
                    />
                  ))}
                </div>
                <Button
                  type="submit"
                  disabled={updateLoading ? true : false}
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                >
                  Update
                </Button>
              </form>
            </div>
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
    </Fragment>
  );
};

export default UpdateProduct;
