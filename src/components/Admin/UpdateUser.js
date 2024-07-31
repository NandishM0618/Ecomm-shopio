/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@mui/material";
import MailOutline from "@mui/icons-material/MailOutline";
import Person from "@mui/icons-material/Person";
import VerifiedUser from "@mui/icons-material/VerifiedUser";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Loading from "../../more/Loading";
import MetaData from "../../more/MetaData";
import {
  clearErrors,
  getUserDetails,
  updateUser,
} from "../../redux/actions/userAction";
import { UPDATE_USER_RESET } from "../../redux/constants/userConstant";
import SideBar from "./Sidebar";
import { useParams } from "react-router-dom";

const UpdateUser = ({ history, match }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { loading, error, user } = useSelector((state) => state.userDetails);

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const userId = id;

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("User Updated Successfully");
      history.push("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, alert, error, history, isUpdated, updateError, user, userId]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(userId, myForm));
  };

  return (
    <Fragment>
      <MetaData title="Update User" />
      <div className="flex">
        <SideBar />
        <div className="flex-1 flex flex-col justify-center items-center">
          {loading ? (
            <Loading />
          ) : (
            <form
              className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg"
              onSubmit={updateUserSubmitHandler}
            >
              <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
                Update User
              </h1>

              <div className="flex items-center mb-4">
                <Person className="mr-2 text-gray-600" />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex items-center mb-4">
                <MailOutline className="mr-2 text-gray-600" />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="flex items-center mb-6">
                <VerifiedUser className="mr-2 text-gray-600" />
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Choose Role</option>
                  <option value="admin">admin</option>
                  <option value="user">user</option>
                </select>
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                disabled={
                  updateLoading ? true : false || role === "" ? true : false
                }
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              >
                Update
              </Button>
            </form>
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

export default UpdateUser;
