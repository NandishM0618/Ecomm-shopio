/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Delete from "@mui/icons-material/Delete";
import Star from "@mui/icons-material/Star";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import MetaData from "../../more/MetaData";
import {
  clearErrors,
  deleteReviews,
  getAllReviews,
} from "../../redux/actions/productAction";
import { DELETE_REVIEW_RESET } from "../../redux/constants/productConstants";
import "../../assets/styles/styles.css";

import SideBar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const AllReviews = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteReview
  );

  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );

  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, productId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Review Deleted Successfully");
      history("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, alert, error, deleteError, history, isDeleted, productId]);

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },

    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,

      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button
              onClick={() =>
                deleteReviewHandler(params.getValue(params.id, "id"))
              }
            >
              <Delete />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL REVIEWS - Admin`} />

      <div className="flex h-screen bg-gray-50">
        <SideBar />
        <div className="flex-1 max-w-5xl w-full mr-10 mx-auto p-8">
          <form
            className="bg-white shadow-lg rounded-lg p-6 mb-8"
            onSubmit={productReviewsSubmitHandler}
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
              ALL REVIEWS
            </h1>
            <div className="flex items-center mb-4">
              <Star className="text-yellow-500 mr-2" />
              <input
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <Button
              id="createProductBtn"
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading || productId === ""}
              className="w-full"
            >
              Search
            </Button>
          </form>

          {reviews && reviews.length > 0 ? (
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="data-grid"
                autoHeight
              />
            </div>
          ) : (
            <h1 className="text-center text-2xl font-semibold text-gray-600 mt-8">
              No Reviews Found
            </h1>
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

export default AllReviews;
