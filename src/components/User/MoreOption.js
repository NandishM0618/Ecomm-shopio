import QuestionMark from "@mui/icons-material/Cached";
import ContactMailOutlined from "@mui/icons-material/ContactMailOutlined";
import Update from "@mui/icons-material/DynamicFeedOutlined";
import ExitToApp from "@mui/icons-material/ExitToApp";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Forum from "@mui/icons-material/Forum";
import ListAlt from "@mui/icons-material/ListAlt";
import LocalMall from "@mui/icons-material/LocalMall";
import Support from "@mui/icons-material/ReportProblem";
import Search from "@mui/icons-material/Search";
import Store from "@mui/icons-material/Shop";
import Creator from "@mui/icons-material/Store";
import TouchAppOutlined from "@mui/icons-material/TouchAppOutlined";
import VpnKey from "@mui/icons-material/VpnKey";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BottomTab from "../../more/Bottom";
import MetaData from "../../more/MetaData";
import { logout } from "../../redux/actions/userAction";

const MoreOption = () => {
  const history = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  function logoutUser() {
    dispatch(logout());
    history("/login");
    toast.success("Logout Successfully");
  }

  return (
    <>
      <MetaData title="More Option" />
      <div
        className=" flex flex-col items-center justify-center"
        style={{
          display: "flex",
          padding: "10px",
          flexDirection: "column",
          marginBottom: "10vh",
        }}
      >
        {isAuthenticated === false ? (
          ""
        ) : (
          <Link to="/me">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid rgb(0 0 0 / 25%)",
                padding: "4px 0",
                width: "100%",
              }}
            >
              <img
                src={user.avatar.url}
                alt={user.name}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "100%",
                  objectFit: "cover",
                  marginRight: "10px",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{
                    color: "#000",
                  }}
                >
                  {user.name}
                </span>
                <span
                  style={{
                    color: "#000",
                    opacity: "0.6",
                    fontSize: "14px",
                  }}
                >
                  view your profile
                </span>
              </div>
            </div>
          </Link>
        )}

        <Link to="/products">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "7px 0",
            }}
          >
            <Store
              style={{
                fontSize: "30px",
                color: "#000",
                marginRight: "10px",
              }}
            />
            <span
              style={{
                color: "#000",
              }}
            >
              Visit Shop
            </span>
          </div>
        </Link>

        <Link to="/search">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "7px 0",
            }}
          >
            <Search
              style={{
                fontSize: "30px",
                color: "#000",
                marginRight: "10px",
              }}
            />
            <span
              style={{
                color: "#000",
              }}
            >
              Search Products
            </span>
          </div>
        </Link>

        <Link to="/cart">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "7px 0",
            }}
          >
            <LocalMall
              style={{
                fontSize: "30px",
                color: "#000",
                marginRight: "10px",
              }}
            />
            <span
              style={{
                color: "#000",
              }}
            >
              View Cart
            </span>
          </div>
        </Link>

        <Link to="/favourites">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "7px 0",
            }}
          >
            <FavoriteBorder
              style={{
                fontSize: "30px",
                color: "#000",
                marginRight: "10px",
              }}
            />
            <span
              style={{
                color: "#000",
              }}
            >
              View Favourite
            </span>
          </div>
        </Link>
        {isAuthenticated === false ? (
          ""
        ) : (
          <Link to="/orders">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "7px 0",
              }}
            >
              <ListAlt
                style={{
                  fontSize: "30px",
                  color: "#000",
                  marginRight: "10px",
                }}
              />
              <span
                style={{
                  color: "#000",
                }}
              >
                My Orders
              </span>
            </div>
          </Link>
        )}

        <Link to="/commingsoon">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "7px 0",
            }}
          >
            <Creator
              style={{
                fontSize: "30px",
                color: "#000",
                marginRight: "10px",
              }}
            />
            <span
              style={{
                color: "#000",
              }}
            >
              Create Own Shop
            </span>
          </div>
        </Link>

        <Link to="/commingsoon">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "7px 0",
            }}
          >
            <Forum
              style={{
                fontSize: "30px",
                color: "#000",
                marginRight: "10px",
              }}
            />
            <span
              style={{
                color: "#000",
              }}
            >
              Live chat support
            </span>
          </div>
        </Link>
        {isAuthenticated === false ? (
          ""
        ) : (
          <Link to="/password/update">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "7px 0",
              }}
            >
              <VpnKey
                style={{
                  fontSize: "30px",
                  color: "#000",
                  marginRight: "10px",
                }}
              />
              <span
                style={{
                  color: "#000",
                }}
              >
                Change Password
              </span>
            </div>
          </Link>
        )}
        {isAuthenticated === false ? (
          ""
        ) : (
          <Link to="/password/forgot">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "7px 0",
              }}
            >
              <QuestionMark
                style={{
                  fontSize: "30px",
                  color: "#000",
                  marginRight: "10px",
                }}
              />
              <span
                style={{
                  color: "#000",
                }}
              >
                Forgot Password
              </span>
            </div>
          </Link>
        )}
        {isAuthenticated === false ? (
          ""
        ) : (
          <Link to="/me/update">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "7px 0",
              }}
            >
              <Update
                style={{
                  fontSize: "30px",
                  color: "#000",
                  marginRight: "10px",
                }}
              />
              <span
                style={{
                  color: "#000",
                }}
              >
                Update Profile
              </span>
            </div>
          </Link>
        )}

        <Link to="/contact">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "7px 0",
            }}
          >
            <ContactMailOutlined
              style={{
                fontSize: "30px",
                color: "#000",
                marginRight: "10px",
              }}
            />
            <span
              style={{
                color: "#000",
              }}
            >
              Contact Us
            </span>
          </div>
        </Link>

        <Link to="/faq">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "7px 0",
            }}
          >
            <TouchAppOutlined
              style={{
                fontSize: "30px",
                color: "#000",
                marginRight: "10px",
              }}
            />
            <span
              style={{
                color: "#000",
              }}
            >
              User Rules
            </span>
          </div>
        </Link>

        <Link to="/support">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "7px 0",
            }}
          >
            <Support
              style={{
                fontSize: "30px",
                color: "#000",
                marginRight: "10px",
              }}
            />
            <span
              style={{
                color: "#000",
              }}
            >
              Report us
            </span>
          </div>
        </Link>

        {isAuthenticated === false ? (
          ""
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "7px 0",
            }}
            onClick={logoutUser}
          >
            <ExitToApp
              style={{
                fontSize: "30px",
                color: "#000",
                marginRight: "10px",
              }}
            />
            <span
              style={{
                color: "#000",
              }}
            >
              Log Out
            </span>
          </div>
        )}
      </div>
      <BottomTab />
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
    </>
  );
};

export default MoreOption;
