import { Typography } from "@mui/material";
import RemoveShoppingCart from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import BottomTab from "../../more/Bottom";
import Loading from "../../more/Loading";
import MetaData from "../../more/MetaData";
import { deleteFavouriteItemsToCart } from "../../redux/actions/favActions";
// import "./Favourite.css";
import FavouriteItemsCard from "./FavItemCard.js";

const Favourite = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.productDetails);
  const { favouriteItems } = useSelector((state) => state.favourite);

  const deleteFavouriteItems = (id) => {
    dispatch(deleteFavouriteItemsToCart(id));
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="" />
          <div className="container mx-auto py-10">
            {favouriteItems.length === 0 ? (
              <div className="text-center">
                <RemoveShoppingCart className="text-red-500 text-6xl mx-auto mb-4" />
                <Typography variant="h5" className="mb-4">
                  No Items In Favourites
                </Typography>
                <Link
                  to="/products"
                  className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                >
                  View Products
                </Link>
                <BottomTab />
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <div className="flex justify-between items-center bg-gray-100 p-4 rounded-t">
                    <p className="font-semibold">Product</p>
                    <p className="font-semibold">Price</p>
                    <p className="font-semibold">Stock Status</p>
                    <p className="font-semibold">Action</p>
                  </div>
                  {favouriteItems &&
                    favouriteItems.map((item) => (
                      <div
                        className="bg-white p-4  border-b last:border-none"
                        key={item.product}
                      >
                        <FavouriteItemsCard
                          item={item}
                          deleteFavouriteItems={deleteFavouriteItems}
                        />
                      </div>
                    ))}
                  <BottomTab />
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Favourite;
