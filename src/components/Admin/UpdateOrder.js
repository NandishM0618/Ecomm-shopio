import { Button, Typography } from "@mui/material";
import AccountTree from "@mui/icons-material/AccountTree";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Loading from "../../more/Loading";
import MetaData from "../../more/MetaData";
import {
  clearErrors,
  getOrderDetails,
  updateOrder,
} from "../../redux/actions/orderAction";
import { UPDATE_ORDER_RESET } from "../../redux/constants/orderConstant";
import SideBar from "./Sidebar";
// import "./UpdateOrder.css";

const UpdateOrder = ({ match }) => {
  const { id } = useParams();
  const history = useNavigate();
  const { order, error, loading } = useSelector(
    (state) => state.myOrderDetails
  );
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.deleteOrder);

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
  };

  const dispatch = useDispatch();

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, error, id, isUpdated, updateError]);

  return (
    <Fragment>
      <MetaData title="Process Order" />
      <div className="flex h-screen bg-gray-100">
        <SideBar />
        <div className="flex-1 p-6">
          {loading ? (
            <Loading />
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-md grid gap-6">
              <div>
                <Typography
                  variant="h4"
                  className="font-semibold mb-6 text-gray-700"
                >
                  Order Details
                </Typography>

                <div className="mb-6">
                  <Typography variant="h6" className="font-medium mb-2">
                    Shipping Info
                  </Typography>
                  <div className="grid gap-2 text-gray-600">
                    <div className="flex justify-between">
                      <p>Name:</p>
                      <span>{order.user && order.user.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <p>Phone:</p>
                      <span>
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <p>Address:</p>
                      <span>
                        {order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.state}`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <Typography variant="h6" className="font-medium mb-2">
                    Payment
                  </Typography>
                  <div className="grid gap-2 text-gray-600">
                    <div className="flex justify-between">
                      <p className="text-green-500">PAID</p>
                    </div>
                    <div className="flex justify-between">
                      <p>Amount:</p>
                      <span>${order.totalPrice && order.totalPrice}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <Typography variant="h6" className="font-medium mb-2">
                    Order Status
                  </Typography>
                  <div className="flex justify-between">
                    <p
                      className={
                        order.orderStatus && order.orderStatus === "Delivered"
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {order.orderStatus && order.orderStatus}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <Typography variant="h6" className="font-medium mb-2">
                    Your Cart Items:
                  </Typography>
                  <div className="grid gap-4">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div
                          key={item.product}
                          className="flex items-center gap-4"
                        >
                          <img
                            src={item.image}
                            alt="Product"
                            className="w-16 h-16 object-cover rounded-md"
                          />
                          <Link
                            to={`/product/${item.product}`}
                            className="text-blue-500 hover:underline"
                          >
                            {item.name}
                          </Link>
                          <span>
                            {item.quantity} X ${item.price} ={" "}
                            <b>${item.price * item.quantity}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {order.orderStatus !== "Delivered" && (
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <form onSubmit={updateOrderSubmitHandler}>
                    <Typography
                      variant="h5"
                      className="font-semibold mb-6 text-gray-700"
                    >
                      Process Order
                    </Typography>

                    <div className="mb-4">
                      <AccountTree className="mr-2 text-gray-600" />
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      >
                        <option value="">Choose Status</option>
                        {order.orderStatus === "Processing" && (
                          <option value="Shipped">Shipped</option>
                        )}
                        {order.orderStatus === "Shipped" && (
                          <option value="Delivered">Delivered</option>
                        )}
                      </select>
                    </div>

                    <Button
                      type="submit"
                      disabled={
                        updateLoading
                          ? true
                          : false || status === ""
                          ? true
                          : false
                      }
                      className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                    >
                      Process
                    </Button>
                  </form>
                </div>
              )}
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

export default UpdateOrder;
