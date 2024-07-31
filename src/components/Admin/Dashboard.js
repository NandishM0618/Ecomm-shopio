import { Typography } from "@mui/material";
import { useEffect } from "react";

import { Link } from "react-router-dom";
// import "./dashboard.css";
import Sidebar from "./Sidebar.js";
// eslint-disable-next-line
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../more/Loading";
import MetaData from "../../more/MetaData";
import { getAllOrders } from "../../redux/actions/orderAction";
import { getAdminProduct } from "../../redux/actions/productAction";
import { getAllUsers } from "../../redux/actions/userAction";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products, loading } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.AllOrders);

  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  // const  = {
  //     labels: ["Initial Amount", "Amount Earned"],
  //     datasets: [
  //       {
  //         label: "TOTAL AMOUNT",
  //         backgroundColor: ["#3BB77E"],
  //         hoverBackgroundColor: ["#3BB77E"],
  //         data: [0, totalAmount],
  //       },
  //     ],
  //   };

  // const chartOptions = {
  //   series: [
  //     {
  //       name: "Sucikathan datas list",
  //       data: [12 , 20, 30],
  //     },
  //   ],
  //   options: {
  //     title: {
  //       text: "Sucikathan datas list",
  //     },
  //     color: ["#6100D4", "6100D4"],
  //     chart: {
  //       background: "transparent",
  //     },
  //     dataLabels: {
  //       enabled: false,
  //     },
  //     stroke: {
  //       curve: "smooth",
  //     },
  //     xaxis: {
  //       categories: [
  //         "Users",
  //         "Products",
  //         "Orders",

  //       ],
  //     },
  //     legend: {
  //       position: "top",
  //     },
  //     grid: {
  //       show: "false",
  //     },
  //   },
  // };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex h-screen bg-gray-100">
          <MetaData title="Dashboard" />
          <Sidebar />

          <div className="flex-1 max-w-3xl mx-auto p-8">
            <Typography
              component="h1"
              className="text-3xl font-bold text-gray-800 mb-6"
            >
              Dashboard
            </Typography>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                <p className="text-xl font-semibold text-gray-600">
                  Total Amount
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  ${totalAmount}
                </p>
              </div>

              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link
                  to="/admin/products"
                  className="bg-white shadow-lg rounded-lg p-6 text-center hover:bg-gray-100 transition"
                >
                  <p className="text-xl font-semibold text-gray-600">
                    Products
                  </p>
                  <p className="text-2xl font-bold text-gray-800">
                    {products && products.length}
                  </p>
                </Link>

                <Link
                  to="/admin/orders"
                  className="bg-white shadow-lg rounded-lg p-6 text-center hover:bg-gray-100 transition"
                >
                  <p className="text-xl font-semibold text-gray-600">Orders</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {orders && orders.length}
                  </p>
                </Link>

                <Link
                  to="/admin/users"
                  className="bg-white shadow-lg rounded-lg p-6 text-center hover:bg-gray-100 transition"
                >
                  <p className="text-xl font-semibold text-gray-600">Users</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {users && users.length}
                  </p>
                </Link>
              </div>
            </div>

            {/* <div className="lineChart">
              <Chart
                options={chartOptions.options}
                series={chartOptions.series}
                type="bar"
                height="100%"
                width="100%"
              />
            </div>

            <div className="doughnutChart">
              <Chart
                type="pie"
                series={[outOfStock, products.length - outOfStock]}
                options={{
                  title: {
                    text: "all stock calculation",
                  },
                  labels: ["Out of Stock", "Stock"],
                }}
              />
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};
export default Dashboard;
