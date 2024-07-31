/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@mui/material";
import AccountTree from "@mui/icons-material/AccountTree";
import AttachMoney from "@mui/icons-material/AttachMoney";
import Description from "@mui/icons-material/Description";
import Discount from "@mui/icons-material/LocalOffer";
import Spellcheck from "@mui/icons-material/Spellcheck";
import Storage from "@mui/icons-material/Storage";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import MetaData from "../../more/MetaData";
import { clearErrors, createProduct } from "../../redux/actions/productAction";
import { NEW_PRODUCT_RESET } from "../../redux/constants/productConstants";
// import "./newProduct.css";
import SideBar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector(
    (state) => state.createProduct
  );

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [offerPrice, setOfferPrice] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Personal",
    "clothes",
    "Ladies Cloth",
    "Gift",
    "Food",
    "Electronics",
    "Sports",
    "Others",
  ];

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Product Created Successfully");
      history("/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createProductSubmitHandler = (e) => {
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
    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

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
      <MetaData title="Create Product" />
      <div className="flex h-screen bg-gray-50">
        <SideBar />
        <div className="flex-1 max-w-5xl w-full mr-10 mx-auto p-8">
          <form
            className="bg-white shadow-lg rounded-lg p-6 mb-8"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Create Product
            </h1>

            <div className="mb-4 flex items-center">
              <Spellcheck className="mr-2 text-gray-700" />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mb-4 flex items-center">
              <Discount className="mr-2 text-gray-700" />
              <input
                type="text"
                placeholder="Discount Percent *optional"
                onChange={(e) => setOfferPrice(e.target.value)}
                className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mb-4 flex items-center">
              <AttachMoney className="mr-2 text-gray-700" />
              <input
                type="number"
                placeholder="Product Price"
                required
                onChange={(e) => setPrice(e.target.value)}
                className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mb-4">
              <Description className="mr-2 text-gray-700" />
              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="3"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>

            <div className="mb-4">
              <AccountTree className="mr-2 text-gray-700" />
              <select
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate.toLowerCase()}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4 flex items-center">
              <Storage className="mr-2 text-gray-700" />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
                className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mb-4">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mb-4 flex flex-wrap">
              {imagesPreview.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="Product Preview"
                  className="w-20 h-20 object-cover m-2 border rounded-md"
                />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              className="w-full py-3"
            >
              Create
            </Button>
          </form>
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

export default CreateProduct;
