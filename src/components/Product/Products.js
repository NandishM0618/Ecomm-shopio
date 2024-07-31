/* eslint-disable react-hooks/exhaustive-deps */
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import BottomTab from "../../more/Bottom";
import Footer from "../../more/Footer";
import Loading from "../../more/Loading";
import MetaData from "../../more/MetaData";
import { clearErrors, getProduct } from "../../redux/actions/productAction";
import Header from "../Home/Header";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
// import "./Product.css";
import ProductCard from "./ProductCard";
import { Link, useParams } from "react-router-dom";
const categories = [
  "Personal",
  "clothes",
  "Ladies Clothes",
  "Gift",
  "Food",
  "Electronics",
  "Sports",
  "Shoes",
  "Smart Phones",
  "Others",
];

const Products = () => {
  const { keyword } = useParams();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [visibleProducts, setVisibleProducts] = useState(9);

  const loadMoreProducts = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 9);
  };

  const [category, setCategory] = useState("");

  const { products, loading, error, productsCount, resultPerPage } =
    useSelector((state) => state.products);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, category));
  }, [dispatch, keyword, currentPage, category, alert, error]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="Products" />
          <Header />
          <div className="container mx-auto p-4">
            <div className="w-full mb-4 mt-10">
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className="text-lg">Filter Product</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="text-sm font-semibold">
                    CHOOSE CATEGORIES
                  </Typography>
                  <ul className="mt-2 space-y-2">
                    {categories.map((category) => (
                      <li
                        className="cursor-pointer text-sm hover:text-green-600"
                        key={category}
                        onClick={() => setCategory(category.toLowerCase())}
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                </AccordionDetails>
              </Accordion>
            </div>

            {products.length !== 0 && (
              <h2 className="text-left border-b border-gray-300 text-xl font-semibold my-6 text-gray-700">
                Explore All Products
              </h2>
            )}

            <div className="flex  flex-wrap ">
              <div className="border border-gray-300 p-4 w-full md:w-1/5 space-y-4">
                <div>
                  <Typography className="text-lg">CHOOSE CATEGORIES</Typography>
                  <ul className="mt-2 space-y-2">
                    {categories.map((category) => (
                      <li
                        className="cursor-pointer text-sm hover:text-green-600"
                        key={category}
                        onClick={() => setCategory(category.toLowerCase())}
                      >
                        <span className="h-3 w-3 hover:bg-green-500 bg-none border-gray-700 border-2 rounded-full inline-block mr-2"></span>
                        {category}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <Typography className="text-lg">QUICK LINKS</Typography>
                  <ul className="mt-2 space-y-2">
                    <li className="cursor-pointer text-sm hover:text-green-600">
                      <Link to="/cart"> My Carts</Link>
                    </li>
                    <li className="cursor-pointer text-sm hover:text-green-600">
                      <Link to="/favourites">Favourites Items</Link>
                    </li>
                    <li className="cursor-pointer text-sm hover:text-green-600">
                      Go to Checkout
                    </li>
                  </ul>
                </div>
              </div>

              <div className=" search-results-container search-result-item flex-grow flex flex-wrap justify-center gap-4 md:w-4/5">
                {products.length === 0 ? (
                  <span className="text-center text-lg py-10 w-full">
                    No Product Found ....
                  </span>
                ) : (
                  products
                    .slice(0, visibleProducts)
                    .map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))
                )}
              </div>
            </div>

            {visibleProducts < products.length && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={loadMoreProducts}
                  className=" text-gray-800 font-semibold text-center py-2 px-4 rounded hover:bg-green-600"
                >
                  Load More
                </button>
              </div>
            )}
          </div>
          <div className="mt-4 flex justify-center">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={productsCount}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="First"
              lastPageText="Last"
              itemClass="inline-block mr-2 mb-4 px-4 py-2 cursor-pointer border border-gray-300 rounded"
              linkClass="text-blue-500"
              activeClass="bg-blue-500 text-white"
              activeLinkClass="text-white"
            />
          </div>
          <Footer />
          <BottomTab />
        </>
      )}
    </>
  );
};

export default Products;
