import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import BottomTab from "../../more/Bottom";
import MetaData from "../../more/MetaData";
import CheckoutSteps from "./CheckoutSteps";
// import "./ConfirmOrder.css";

const ConfirmOrder = () => {
  const history = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  const { user } = useSelector((state) => state.user);

  let productPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const subtotal = productPrice;
  // eslint-disable-next-line
  const shippingCharges = productPrice > 99 ? 0 : 50;

  const totalPrice = subtotal + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.state}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    history("/process/payment");
  };

  return (
    <>
      <MetaData title="Confirm Order" />
      <div className="container mx-auto p-6">
        <CheckoutSteps activeStep={1} />
        <div className="flex flex-col md:flex-row gap-6 mt-8">
          {/* Shipping Info */}
          <div className="bg-white shadow-md rounded p-6 w-full md:w-1/2">
            <Typography variant="h6" className="font-semibold mb-4">
              Shipping Info
            </Typography>
            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="font-medium">Name:</p>
                <span>{user.name}</span>
              </div>
              <div className="flex justify-between">
                <p className="font-medium">Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div className="flex justify-between">
                <p className="font-medium">Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>

          {/* Cart Items */}
          <div className="bg-white shadow-md rounded p-6 w-full md:w-1/2">
            <Typography variant="h6" className="font-semibold mb-4">
              Your Cart Items:
            </Typography>
            {cartItems.length === 0 ? (
              <Typography className="text-center">No items in cart.</Typography>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.product} className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt="Product"
                      className="w-16 h-16 object-cover rounded"
                    />
                    <Link
                      to={`/product/${item.product}`}
                      className="text-blue-500 hover:underline"
                    >
                      {item.name}
                    </Link>
                    <span className="ml-auto">
                      {item.quantity} x ${item.price} ={" "}
                      <b>${item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="max-w-lg  mx-auto bg-white shadow-md rounded p-6 mt-6">
          <Typography variant="h6" className="font-semibold mb-4">
            Order Summary
          </Typography>
          <div className="space-y-2 gap-6 mt-4">
            <div className="flex justify-between mb-4">
              <p>Subtotal:</p>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between mb-4">
              <p>Shipping Charges:</p>
              <span>₹{shippingCharges}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg mb-4">
              <p>Total:</p>
              <span>₹{totalPrice}</span>
            </div>
          </div>
          <button
            onClick={proceedToPayment}
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Proceed To Payment
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
