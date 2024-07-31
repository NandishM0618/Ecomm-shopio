/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../more/Loading";
// import "./UpdatePassword.css";
// import { useAlert } from "react-alert";
import Lock from "@mui/icons-material/Lock";
import LockOpen from "@mui/icons-material/LockOpen";
import VpnKey from "@mui/icons-material/VpnKey";
import MetaData from "../../more/MetaData";
import { clearErrors, updatePassword } from "../../redux/actions/userAction";
import { UPDATE_PASSWORD_RESET } from "../../redux/constants/userConstant";
import { useNavigate } from "react-router-dom";
import BottomTab from "../../more/Bottom";

const UpdatePassword = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  //   const alert = useAlert();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert("Profile Updated Successfully");
      history("/me");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, alert, history, isUpdated]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="Change Password" />
          <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-md">
              <h2 className="text-2xl font-semibold text-center mb-6">
                Update Password
              </h2>
              <form onSubmit={updatePasswordSubmit}>
                <div className="mb-4">
                  <div className="flex items-center border-b border-gray-300 py-2">
                    <VpnKey className="text-gray-400 mr-2" />
                    <input
                      type="password"
                      placeholder="Old Password"
                      required
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center border-b border-gray-300 py-2">
                    <LockOpen className="text-gray-400 mr-2" />
                    <input
                      type="password"
                      placeholder="New Password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center border-b border-gray-300 py-2">
                    <Lock className="text-gray-400 mr-2" />
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-center">
                  <input
                    type="submit"
                    value="Change"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
                  />
                </div>
              </form>
            </div>
          </div>
        </>
      )}
      <BottomTab />
    </>
  );
};

export default UpdatePassword;
