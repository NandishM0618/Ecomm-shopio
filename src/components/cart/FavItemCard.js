import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import "./FavouriteItemsCard.css";

const FavouriteItemsCard = ({ item, deleteFavouriteItems }) => {
  // const dispatch = useDispatch();
  const { product } = useSelector((state) => state.productDetails);

  return (
    <div className="flex items-center justify-between p-4 border-b last:border-none bg-white shadow-md rounded-md">
      <div className="flex items-center space-x-4">
        <img
          src={item.image}
          alt={item.name}
          className="w-16 h-16 object-cover rounded"
        />
        <div>
          <Link
            to={`/product/${item.product}`}
            className="text-lg font-semibold text-blue-600 hover:underline"
            style={{ fontFamily: "cursive" }}
          >
            {item.name}
          </Link>
          <p
            onClick={() => deleteFavouriteItems(item.product)}
            className="text-red-500 cursor-pointer hover:text-red-700 mt-1"
          >
            Remove
          </p>
        </div>
      </div>

      <div className="text-lg font-semibold">
        <span>{`$${item.price}`}</span>
      </div>

      <div>
        <p
          className={`font-bold ${
            item.Stock < 1 ? "text-red-500" : "text-green-500"
          }`}
        >
          {item.Stock < 1 ? "Out of Stock" : "In Stock"}
        </p>
      </div>

      <div>
        <Link to={`/product/${item.product}`}>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            onClick={() => deleteFavouriteItems(item.product)}
          >
            Add To Cart
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FavouriteItemsCard;
