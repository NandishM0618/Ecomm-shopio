import Home from "@mui/icons-material/Home";
import Phone from "@mui/icons-material/Phone";
import Public from "@mui/icons-material/Public";
import TransferWithinAStation from "@mui/icons-material/TransferWithinAStation";
import { Country, State } from "country-state-city";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BottomTab from "../../more/Bottom";
import MetaData from "../../more/MetaData";
import { saveShippingInfo } from "../../redux/actions/cartAction";
import CheckoutSteps from "../cart/CheckoutSteps.js";
import { useNavigate } from "react-router-dom";
// import "./Shipping.css";

const Shipping = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  // eslint-disable-next-line
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  // eslint-disable-next-line
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 11 || phoneNo.length > 11) {
      toast.error("Phone Number should be 11digits");
      return;
    }
    dispatch(saveShippingInfo({ address, state, country, phoneNo }));
    history("/order/confirm");
  };

  return (
    <>
      <MetaData title="Shipping Details" />
      <div className="container mx-auto p-4">
        <CheckoutSteps activeStep={0} />
        <div className="bg-white shadow-md rounded-md p-6 mt-6">
          <h2 className="text-2xl font-semibold mb-6">Shipping Details</h2>

          <form onSubmit={shippingSubmit} className="space-y-4">
            <div className="flex items-center border rounded-md p-2">
              <Home className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full focus:outline-none"
              />
            </div>

            <div className="flex items-center border rounded-md p-2">
              <Phone className="text-gray-500 mr-2" />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                className="w-full focus:outline-none"
                size="10"
              />
            </div>

            <div className="flex items-center border rounded-md p-2">
              <Public className="text-gray-500 mr-2" />
              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full focus:outline-none"
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div className="flex items-center border rounded-md p-2">
                <TransferWithinAStation className="text-gray-500 mr-2" />
                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full focus:outline-none"
                >
                  <option value="">City</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <div className="flex justify-end">
              <input
                type="submit"
                value="Continue"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer disabled:opacity-50"
                disabled={!state}
              />
            </div>
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
  );
};

export default Shipping;
