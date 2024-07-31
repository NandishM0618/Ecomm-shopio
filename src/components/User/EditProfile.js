import Face from "@mui/icons-material/Face";
import MailOutline from "@mui/icons-material/MailOutline";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Loading from "../../more/Loading";
import MetaData from "../../more/MetaData";
import {
  clearErrors,
  loadUser,
  updateProfile,
} from "../../redux/actions/userAction";
import { UPDATE_PROFILE_RESET } from "../../redux/constants/userConstant";
import { useNavigate } from "react-router-dom";
// import "./EditProfile.css";

const EditProfile = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/profile.png");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Profile updated successfully");
      dispatch(loadUser());

      history("/me");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, error, alert, history, isUpdated, user]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="Update Profile" />
          <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-md">
              <h2 className="text-2xl font-semibold text-center mb-6">
                Update Profile
              </h2>
              <form
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="mb-4">
                  <div className="flex items-center border-b border-gray-300 py-2">
                    <Face className="text-gray-400 mr-2" />
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-center border-b border-gray-300 py-2">
                    <MailOutline className="text-gray-400 mr-2" />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <img
                    src={avatarPreview}
                    alt="Avatar Preview"
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>

                <div className="flex justify-center">
                  <input
                    type="submit"
                    value="Update"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
                  />
                </div>
              </form>
            </div>
          </div>
        </>
      )}
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

export default EditProfile;
