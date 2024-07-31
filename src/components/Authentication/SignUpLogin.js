/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import Face from "@mui/icons-material/Face";
import LockOpen from "@mui/icons-material/LockOpen";
import MailOutline from "@mui/icons-material/MailOutline";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../more/Loading";
import MetaData from "../../more/MetaData";
import { clearErrors, login, register } from "../../redux/actions/userAction";
// import "./LoginSingUp.css";

const LoginSignup = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const location = useLocation();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState("../../Assets/icons/user.png");
  const [avatarPreview, setAvatarPreview] = useState(
    "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png"
  );

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      history(redirect);
    }
  }, [dispatch, error, alert, history, isAuthenticated]);

  const [activeTab, setActiveTab] = useState("login");

  const switchTabs = (tab) => {
    setActiveTab(tab);
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Login or Signup" />
          <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-sm w-full space-y-8">
              <div className="text-center">
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                  {activeTab === "login"
                    ? "Sign in to your account"
                    : "Register a new account"}
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Or{" "}
                  <span
                    className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
                    onClick={() =>
                      switchTabs(activeTab === "login" ? "register" : "login")
                    }
                  >
                    {activeTab === "login"
                      ? "register for a new account"
                      : "sign in to your account"}
                  </span>
                </p>
              </div>

              {activeTab === "login" ? (
                <form className="mt-8 space-y-6" onSubmit={loginSubmit}>
                  <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                      <input
                        type="email"
                        placeholder="Email address"
                        name="email"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="appearance-none mb-4 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      />
                    </div>
                    <div>
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="appearance-none mb-4 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember_me"
                        name="remember_me"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="remember_me"
                        className="ml-2 block text-sm text-gray-900"
                      >
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm">
                      <Link
                        to="/password/forgot"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Sign in
                    </button>
                  </div>
                  <p className="mt-2 text-center text-sm text-gray-600">
                    Or{" "}
                    <Link
                      to="/"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Login as a guest
                    </Link>
                  </p>
                </form>
              ) : (
                <form
                  className="mt-8 space-y-6"
                  encType="multipart/form-data"
                  onSubmit={registerSubmit}
                >
                  <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                      <input
                        type="text"
                        placeholder="Name"
                        required
                        name="name"
                        value={name}
                        onChange={registerDataChange}
                        className="appearance-none mb-4 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Email"
                        required
                        name="email"
                        value={email}
                        onChange={registerDataChange}
                        className="appearance-none mb-4 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      />
                    </div>
                    <div>
                      <input
                        type="password"
                        placeholder="Password"
                        required
                        name="password"
                        value={password}
                        onChange={registerDataChange}
                        className="appearance-none mb-4 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div id="registerImage" className="mt-4 flex items-center">
                    <img
                      src={avatarPreview}
                      alt="Avatar Preview"
                      className="h-12 w-12 object-cover rounded-full"
                    />
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={registerDataChange}
                      className="ml-4 text-sm text-gray-500"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Register
                    </button>
                  </div>
                </form>
              )}
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

export default LoginSignup;
