// eslint-disable-next-line
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import { logout } from "../../redux/actions/userAction";
import { toast } from "react-toastify";
// import "./Header.css";

const Header = () => {
  const [hasBackground, setHasBackground] = useState(false);
  const [isUserMenuOpen, setIsUserMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { favouriteItems } = useSelector((state) => state.favourite);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const location = useLocation();

  const linkStyles =
    "rounded-none px-3 py-1 text-md font-normal hover:text-gray-700";
  const activeLinkStyles = "text-slate-900 border-b-2 border-gray-800";

  const logoutUser = () => {
    dispatch(logout());
    toast.success("Logout successful!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const toggleMenu = () => {
    setIsUserMenu(!isUserMenuOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const minScrollToShowBackground = 450;
    setHasBackground(scrollY > minScrollToShowBackground);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="">
      <div
        className={`bg-none fixed top-0 left-0 z-40 w-full mx-auto px-2 sm:px-6 lg:px-8 ${
          hasBackground ? "bg-gray-100 text-black" : ""
        }`}
      >
        <div className="mx-auto flex items-center justify-between shadow-2xl">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0  gap-10 items-center">
              <h2 className="px-10 tracking-wider font-semibold text-lg">
                <NavLink
                  to="/"
                  className={` font-serif text-gray-800 ${
                    hasBackground ? "text-black/80" : "text-gray-800"
                  } `}
                >
                  Shopio
                </NavLink>
              </h2>
            </div>
            <div className="flex md:hidden">
              <button
                onClick={toggleMobileMenu}
                type="button"
                className="inline-flex items-center justify-center p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>
            <div className="hidden md:flex md:items-center">
              <div className="flex space-x-4">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `${linkStyles} ${
                      isActive ? activeLinkStyles : "text-black/60"
                    } ${hasBackground ? "text-black/80" : "text-gray-800"}`
                  }
                >
                  Home
                </NavLink>

                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    `${linkStyles} ${
                      isActive ? activeLinkStyles : "text-black/60"
                    } ${hasBackground ? "text-black/80" : "text-gray-800"}`
                  }
                >
                  Shop
                </NavLink>

                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `${linkStyles} ${
                      isActive ? activeLinkStyles : "text-black/60"
                    } ${hasBackground ? "text-black/80" : "text-gray-800"}`
                  }
                >
                  About
                </NavLink>
                <NavLink
                  to="/blog"
                  className={({ isActive }) =>
                    `${linkStyles} ${
                      isActive ? activeLinkStyles : "text-black/60"
                    } ${hasBackground ? "text-black/80" : "text-gray-800"}`
                  }
                >
                  Blog
                </NavLink>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `${linkStyles} ${
                      isActive ? activeLinkStyles : "text-black/60"
                    } ${hasBackground ? "text-black/80" : "text-gray-800"}`
                  }
                >
                  Contact
                </NavLink>
              </div>
            </div>
          </div>

          {isAuthenticated ? (
            <div className="relative ">
              <div className="">
                <button
                  type="button"
                  className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded={isUserMenuOpen}
                  aria-haspopup="true"
                  onClick={toggleMenu}
                >
                  {/* <span className="absolute -inset-1.5"></span> */}
                  <span className="sr-only">Open user menu</span>
                  <Link to="/me" className="my-profile">
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src={user?.avatar?.url}
                      alt="User Profile"
                    />
                  </Link>
                </button>
              </div>

              <div
                className={`${
                  isUserMenuOpen ? "block" : "hidden"
                } absolute z-40 right-0 mt-2 w-48 origin-top-right md:hidden rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabIndex="-1"
              >
                <Link
                  to="/user-profile"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                  id="user-menu-item-0"
                >
                  Your Profile
                </Link>
                <button
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                  id="user-menu-item-2"
                  onClick={logoutUser}
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <NavLink
              to="/login"
              activeClassName=" hover:bg-gray-700 hover:text-white"
              className={`rounded-md px-2 py-2 text-sm font-medium ${
                location.pathname === "/login" ? "text-gray-800" : ""
              } ${hasBackground ? "text-black/80" : "text-gray-800"}`}
            >
              login
            </NavLink>
          )}
          <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <NavLink
              to="/search"
              activeClassName="hover:bg-gray-700 hover:text-white"
              className={` rounded-md px-2 py-2 text-sm font-medium ${
                location.pathname === "/search" ? "bg-gray-900 text-white" : ""
              } ${hasBackground ? "text-black/80" : "text-gray-800"} `}
            >
              <button
                type="button"
                className="relative rounded-full p-1 focus:outline-none focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">Search</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </button>
            </NavLink>
            <NavLink
              to="/favourites"
              activeClassName="hover:bg-gray-700 hover:text-white"
              className={`relative rounded-md px-2 py-2 text-sm font-medium ${
                location.pathname === "/favourites"
                  ? "bg-gray-900 text-white"
                  : ""
              } ${hasBackground ? "text-black/80" : "text-gray-800"}`}
            >
              <button
                type="button"
                className="relative rounded-md text-sm p-1 focus:outline-none focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">Fav Items</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="text-black hover:text-gray-700"
                  viewBox="0 0 16 16"
                >
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                </svg>
              </button>
              <div className="absolute top-0 right-0 h-5 w-5 bg-green-400 text-white rounded-full flex items-center justify-center">
                {favouriteItems.length}
              </div>
            </NavLink>
            <NavLink
              to="/cart"
              activeClassName="hover:bg-gray-700 hover:text-white"
              className={` relative rounded-md px-2 py-2 text-sm font-medium ${
                location.pathname === "/cart" ? "bg-gray-900 text-white" : ""
              } ${hasBackground ? "text-black/80" : "text-gray-800"}`}
            >
              <button
                type="button"
                className="relative rounded-md p-1 focus:outline-none focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">Cart</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="8" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>
              </button>
              <div className=" cart-count absolute top-0 right-0 h-5 w-5 bg-green-400 text-white rounded-full flex items-center justify-center">
                {cartItems.length}
              </div>
            </NavLink>
          </div>
        </div>
        {/*  */}
      </div>
    </nav>
  );
};

export default Header;
