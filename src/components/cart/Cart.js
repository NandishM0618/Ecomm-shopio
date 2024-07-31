import { Typography } from "@mui/material";
import RemoveShoppingCart from "@mui/icons-material/RemoveShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BottomTab from "../../more/Bottom";
import {
  addItemsToCart,
  removeItemsFromCart,
} from "../../redux/actions/cartAction";
// import "./Cart.css";
import CartItemCard from "./CartItemCard.js";

const Cart = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  let Price = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  let totalPrice = Price;

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return toast.error("Product Stock Limited");
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    history("/login?redirect=shipping");
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <RemoveShoppingCart className="text-6xl bg-red-500 p-3 text-gray-500" />
          <Typography className="text-2xl mt-4">No Items In Cart</Typography>
          <Link to="/products" className="mt-4 text-blue-600 hover:underline">
            View Products
          </Link>
          <BottomTab />
        </div>
      ) : (
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-3 gap-4 text-center font-semibold border-b-2 pb-2">
            <p>Product</p>
            <p>Quantity</p>
            <p>Subtotal</p>
          </div>

          {cartItems.map((item) => (
            <div
              className="grid grid-cols-3 gap-4 items-center my-4 border-b-2 pb-4"
              key={item.product}
            >
              <CartItemCard item={item} deleteCartItems={deleteCartItems} />
              <div className="flex items-center justify-center space-x-2">
                <button
                  onClick={() => decreaseQuantity(item.product, item.quantity)}
                  className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                >
                  -
                </button>
                <input
                  type="number"
                  readOnly
                  value={item.quantity}
                  className="w-12 text-center border border-gray-300 rounded"
                />
                <button
                  onClick={() =>
                    increaseQuantity(item.product, item.quantity, item.stock)
                  }
                  className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                >
                  +
                </button>
              </div>
              <p className="text-center font-medium">{`₹${
                item.price * item.quantity
              }`}</p>
            </div>
          ))}

          <div className="flex justify-end mt-4 space-x-4">
            <div className="text-lg font-semibold">Price Total</div>
            <div className="text-lg font-semibold">₹{totalPrice}</div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={checkoutHandler}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Check Out
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
