/* eslint-disable react-hooks/exhaustive-deps */
import { Typography } from "@mui/material";
import CreditCard from "@mui/icons-material/CreditCard";
import Event from "@mui/icons-material/Event";
import VpnKey from "@mui/icons-material/VpnKey";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../more/Loading";
import MetaData from "../../more/MetaData";
import { clearErrors, createOrder } from "../../redux/actions/orderAction";
import CheckoutSteps from "./CheckoutSteps";
import { useNavigate } from "react-router-dom";
// import "./payment.css";

const Payment = () => {
  const history = useNavigate();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error, loading } = useSelector((state) => state.order);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v2/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));

          history("/success");
        } else {
          toast.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, toast]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="Payment" />
          <div className="container mx-auto p-6">
            <CheckoutSteps activeStep={2} />
            <div className="max-w-lg mx-auto bg-white shadow-md rounded p-6">
              <form className="space-y-4" onSubmit={(e) => submitHandler(e)}>
                <Typography variant="h6" className="font-semibold mb-4">
                  Card Info
                </Typography>
                <div className="flex items-center gap-2 border p-2 rounded">
                  <CreditCard className="text-gray-500" />
                  <CardNumberElement className="w-full p-2 outline-none" />
                </div>
                <div className="flex items-center gap-2 border p-2 rounded">
                  <Event className="text-gray-500" />
                  <CardExpiryElement className="w-full p-2 outline-none" />
                </div>
                <div className="flex items-center gap-2 border p-2 rounded">
                  <VpnKey className="text-gray-500" />
                  <CardCvcElement className="w-full p-2 outline-none" />
                </div>

                <input
                  type="submit"
                  value={`Pay - $ ${orderInfo && orderInfo.totalPrice}`}
                  ref={payBtn}
                  className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                />
              </form>
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
        </>
      )}
    </>
  );
};

export default Payment;
