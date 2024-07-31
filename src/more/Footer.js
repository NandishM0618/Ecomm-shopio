/* eslint-disable jsx-a11y/alt-text */
import { Link } from "react-router-dom";
// import "./Footer.css";
const Footer = () => {
  return (
    <div className="bg-slate-300 text-gray-800 py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Company Info Section */}
        <div>
          <h2 className=" text-3xl font-semibold font-serif text-gray-500 mb-4 w-36">
            Shopio
          </h2>
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                className="mr-2"
                viewBox="0 0 16 16"
              >
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              </svg>
              <strong>Address:</strong>
            </div>
            <h6 className="ml-6">560084, Bangalore ,Karnataka</h6>
          </div>

          <div className="mb-4">
            <div className="flex items-center mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                className="mr-2"
                viewBox="0 0 16 16"
              >
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
              </svg>
              <strong>Email:</strong>
            </div>
            <h6 className="ml-6">buy@shopio.com</h6>
          </div>

          <div className="mb-4">
            <div className="flex items-center mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="mr-2"
                viewBox="0 0 16 16"
              >
                <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5z" />
              </svg>
              <strong>Call us:</strong>
            </div>
            <h6 className="ml-6">88203248197</h6>
          </div>

          <div className="mb-4">
            <div className="flex items-center mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                className="mr-2"
                viewBox="0 0 16 16"
              >
                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
              </svg>
              <strong>Time:</strong>
            </div>
            <h6 className="ml-6">10:00 Am - 10:00 Pm (everyday)</h6>
          </div>

          <div>
            <h1 className="font-bold text-lg mb-2">Install App</h1>
            <h6 className="mb-2">From App Store or Google Play</h6>
            <div className="flex space-x-2">
              <Link to="/creator">
                <img
                  src="http://wp.alithemes.com/html/nest/demo/assets/imgs/theme/app-store.jpg"
                  alt="App Store"
                  className="w-24"
                />
              </Link>
              <Link to="/creator">
                <img
                  src="http://wp.alithemes.com/html/nest/demo/assets/imgs/theme/google-play.jpg"
                  alt="Google Play"
                  className="w-24"
                />
              </Link>
            </div>
          </div>
        </div>
        {/* Account Section */}
        <div>
          <h5 className="font-bold text-lg mb-4">Account</h5>
          <ul>
            <li className="mb-2">
              <Link to="/login" className="hover:underline">
                Log In
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/login" className="hover:underline">
                Sign In
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/login" className="hover:underline">
                Registration
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/password/forgot" className="hover:underline">
                Forgot Password
              </Link>
            </li>
          </ul>
        </div>
        {/* Follow Us Section */}
        <div>
          <h5 className="font-bold text-lg mb-4">Follow us</h5>
          <ul>
            <li className="mb-2">
              <Link to="/facebook.com" className="hover:underline">
                Facebook
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/youtube.com" className="hover:underline">
                Youtube
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/instagram.com" className="hover:underline">
                Instagram
              </Link>
            </li>
          </ul>
        </div>
        {/* Business Section */}
        <div>
          <h5 className="font-bold text-lg mb-4">Business</h5>
          <ul>
            <li className="mb-2">
              <Link to="/creator" className="hover:underline">
                Create A Seller Account
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/creator" className="hover:underline">
                Seller Rules
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/Products" className="hover:underline">
                View Shop
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/support" className="hover:underline">
                Report us
              </Link>
            </li>
          </ul>
        </div>
        {/* Rules Section */}
        <div>
          <h5 className="font-bold text-lg mb-4">Rules</h5>
          <ul>
            <li className="mb-2">
              <Link to="/faq" className="hover:underline">
                FAQ
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/contact" className="hover:underline">
                Contact us
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/about" className="hover:underline">
                About us
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/creator" className="hover:underline">
                Live Chat
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
