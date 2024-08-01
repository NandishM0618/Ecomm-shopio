import Backdrop from "@mui/material/Backdrop";
import Dashboard from "@mui/icons-material/Dashboard";
import ExitToApp from "@mui/icons-material/ExitToApp";
import Heart from "@mui/icons-material/FavoriteBorder";
import Home from "@mui/icons-material/Home";
import ListAlt from "@mui/icons-material/ListAlt";
import Person from "@mui/icons-material/Person";
import Support from "@mui/icons-material/ReportProblem";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { logout } from "../redux/actions/userAction";

const UserData = () => {
  const { user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const { favouriteItems } = useSelector((state) => state.favourite);

  const [open, setOpen] = useState(false);
  const history = useNavigate();

  const scroolEffect = useRef(null);

  const dispatch = useDispatch();

  const options = [
    { icon: <Home />, name: "Home", func: home },
    { icon: <ListAlt />, name: "Orders", func: orders },
    {
      icon: (
        <ShoppingCart
          style={{
            color: cartItems.length === 0 ? "" : "tomato",
          }}
        />
      ),
      name: `Cart (${cartItems.length})`,
      func: cart,
    },
    {
      icon: (
        <Heart
          style={{
            color: favouriteItems.length === 0 ? "" : "tomato",
          }}
        />
      ),
      name: `Favourite (${favouriteItems.length})`,
      func: favourite,
    },
    { icon: <Person />, name: "Profile", func: account },
    { icon: <Support />, name: "Report us", func: report },
    { icon: <ExitToApp />, name: "Logout-button", func: logoutUser },
  ];

  if (user?.role === "admin") {
    options.unshift({
      icon: <Dashboard />,
      name: "Dashboard",
      func: dashboard,
    });
  }
  if (user?.role === "Creator") {
    options.unshift({
      icon: <Dashboard />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    history("/dashboard");
  }
  function home() {
    history("/");
  }
  function orders() {
    history("/orders");
  }
  function cart() {
    history("/cart");
  }
  function favourite() {
    history("/favourites");
  }
  function account() {
    history("/me");
  }

  function report() {
    history("/support");
  }

  function logoutUser() {
    dispatch(logout());
    toast.success("Logout Successfully");
  }
  return (
    <>
      <Backdrop
        open={open}
        style={{ zIndex: "10" }}
        className=" absolute right-10 top-12"
      />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className=" absolute right-10 top-12"
        useRef={scroolEffect}
        icon={
          <img
            className=" w-14 h-14 rounded-full object-cover"
            src={user?.avatar.url ? user?.avatar.url : "/profile.png"}
            alt="Profile"
            style={{
              position: "fixed",
            }}
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            id={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={false}
          />
        ))}
      </SpeedDial>
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
  );
};

export default UserData;
