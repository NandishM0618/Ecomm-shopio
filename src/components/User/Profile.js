import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import BottomTab from "../../more/Bottom";
import Footer from "../../more/Footer";
import Loading from "../../more/Loading";
import MetaData from "../../more/MetaData";
import Header from "../Home/Header";
import { logout } from "../../redux/actions/userAction";
import { toast } from "react-toastify";
// import "./Profile.css";
// import BottomTab from "../../more/Footer";

const Profile = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);

  function handleLogout() {
    dispatch(logout());
    toast.success("Logout Successfully");
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <div>
            <MetaData title="Profile Page" />
            <div className=" max-w-xl mx-auto flex flex-col items-center mt-8">
              <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
                <div className="flex flex-col items-center mb-6">
                  <h1
                    className="text-3xl font-semibold mb-4"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    My Profile
                  </h1>
                  <img
                    src={user.avatar.url}
                    alt={user.name}
                    className="w-32 h-32 rounded-full object-cover mb-4"
                  />
                  <Link
                    to="/me/update/info"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Edit Profile
                  </Link>
                </div>
                <div className="w-full">
                  <div className="flex flex-col mb-4">
                    <h4 className="text-lg font-medium">Full Name:</h4>
                    <p className="text-gray-700">{user.name}</p>
                  </div>
                  <div className="flex flex-col mb-4">
                    <h4 className="text-lg font-medium">Email:</h4>
                    <p className="text-gray-700">{user.email}</p>
                  </div>
                  <div className="flex flex-col mb-4">
                    <h4 className="text-lg font-medium">Joined On:</h4>
                    <p className="text-gray-700">
                      {String(user.createdAt).substr(0, 10)}
                    </p>
                  </div>
                  <div className="flex flex-col space-y-4">
                    <Link
                      to="/orders"
                      className="hover:bg-green-500 flex gap-3 hover:text-white hover:border-green-500 w-1/2 text-black px-4 py-2 rounded border-2 border-gray-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-list-ordered"
                      >
                        <line x1="10" x2="21" y1="6" y2="6" />
                        <line x1="10" x2="21" y1="12" y2="12" />
                        <line x1="10" x2="21" y1="18" y2="18" />
                        <path d="M4 6h1v4" />
                        <path d="M4 10h2" />
                        <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
                      </svg>
                      My Orders
                    </Link>
                    <div className=" w-full flex items-start justify-center gap-4">
                      <Link
                        to="/me/update"
                        className="bg-red-500 flex gap-3 w-1/2  text-white px-4 py-2 rounded hover:bg-red-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="lucide lucide-square-pen"
                        >
                          <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
                        </svg>
                        Change Password
                      </Link>
                      <Link
                        onClick={handleLogout}
                        className="logout-button bg-red-500 flex gap-3 w-1/2  text-white px-4 py-2 rounded hover:bg-red-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="lucide lucide-log-out"
                        >
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                          <polyline points="16 17 21 12 16 7" />
                          <line x1="21" x2="9" y1="12" y2="12" />
                        </svg>
                        Logout
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
          <BottomTab />
        </>
      )}
    </>
  );
};

export default Profile;
