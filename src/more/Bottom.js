// eslint-disable-next-line
import Dehaze from "@mui/icons-material/Dehaze";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Home from "@mui/icons-material/Home";
import LocalMall from "@mui/icons-material/LocalMall";
import Person from "@mui/icons-material/Person";
import Search from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import "./BottomTabs.css";

const BottomTab = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { favouriteItems } = useSelector((state) => state.favourite);

  return (
    <>
      <div className="flex justify-around items-center bg-gray-100 p-4 shadow-md">
        <Link to="/">
          <Home className="text-black text-3xl hover:opacity-80 transition-opacity" />
        </Link>
        <Link to="/search">
          <Search className="text-black text-3xl hover:opacity-80 transition-opacity" />
        </Link>
        <Link to="/cart">
          <div className="relative">
            <LocalMall className="text-black text-3xl hover:opacity-80 transition-opacity" />
            {cartItems.length > 0 && (
              <span className="absolute bottom-3/4 left-2 text-xs h-5 w-5 bg-red-600 text-white rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </div>
        </Link>
        <Link to="/favourites">
          <div className="relative">
            <FavoriteBorder className="text-black text-3xl hover:opacity-80 transition-opacity" />
            {favouriteItems.length > 0 && (
              <span className="absolute bottom-3/4 left-2 text-xs h-5 w-5 bg-red-600 text-white rounded-full flex items-center justify-center">
                {favouriteItems.length}
              </span>
            )}
          </div>
        </Link>
        <Link to="/me">
          <Person className="text-black text-3xl hover:opacity-80 transition-opacity" />
        </Link>
        <Link to="/more">
          <Dehaze className="text-black text-3xl hover:opacity-80 transition-opacity" />
        </Link>
      </div>
    </>
  );
};

export default BottomTab;
