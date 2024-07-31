/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import MetaData from "../../more/MetaData";
import {
  clearErrors,
  deleteProduct,
  getAdminProduct,
} from "../../redux/actions/productAction";
import { DELETE_PRODUCT_RESET } from "../../redux/constants/productConstants";
import "../../assets/styles/styles.css";
import SideBar from "./Sidebar";

const AllProducts = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  const { error, products } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteProduct
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Product Deleted Successfully");
      history("/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
    dispatch(getAdminProduct());
  }, [dispatch, alert, error, history]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 150, flex: 1 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 1,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "actions",
      flex: 1,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/edit/product/${params.row.id}`}>
              <Edit />
            </Link>

            <Button onClick={() => deleteProductHandler(params.row.id)}>
              <Delete />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="flex h-screen bg-gray-100">
        <SideBar />
        <div className=" max-w-5xl w-full mr-10 mx-auto p-6">
          <h1
            id="productListHeading"
            className="text-3xl font-semibold mb-6 text-center text-gray-700"
          >
            ALL PRODUCTS
          </h1>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="data-grid"
              autoHeight
            />
          </div>
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

export default AllProducts;
