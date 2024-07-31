import Add from "@mui/icons-material/Add";
import Dashboard from "@mui/icons-material/Dashboard";
import ListAlt from "@mui/icons-material/ListAlt";
import People from "@mui/icons-material/People";
import PostAdd from "@mui/icons-material/PostAdd";
import RateReview from "@mui/icons-material/RateReview";
import Menu from "@mui/icons-material/Menu";
import Accordion from "@mui/icons-material/Person";
import AccordionDetails from "@mui/icons-material/DetailsRounded";
import AccordionSummary from "@mui/icons-material/SummarizeRounded";
import { Link } from "react-router-dom";
// import "./Sidebar.css";

const Sidebar = () => {
  const handleButtonClick = () => {
    let items = document.querySelectorAll(".Dashboard__item");
    // Add your logic here if needed
  };

  return (
    <>
      <div className="hidden max-h-full h-screen fixed left-0 md:block bg-gray-800 text-white p-4 space-y-6 w-64">
        <Link to="/" className="block mb-8">
          <h2 className=" text-white font-serif text-3xl">Shopio</h2>
        </Link>
        <Link
          to="/dashboard"
          className="Dashboard__item flex items-center space-x-2"
          onClick={handleButtonClick}
        >
          <Dashboard className="text-xl" /> <span>Dashboard</span>
        </Link>
        <Link
          to="/admin/products"
          className="Dashboard__item flex items-center space-x-2"
        >
          <PostAdd className="text-xl" /> <span>All Products</span>
        </Link>
        <Link
          to="/admin/product"
          className="Dashboard__item flex items-center space-x-2"
        >
          <Add className="text-xl" /> <span>Create Product</span>
        </Link>
        <Link
          to="/admin/orders"
          className="Dashboard__item flex items-center space-x-2"
        >
          <ListAlt className="text-xl" /> <span>Orders</span>
        </Link>
        <Link
          to="/admin/users"
          className="Dashboard__item flex items-center space-x-2"
        >
          <People className="text-xl" /> <span>Users</span>
        </Link>
        <Link
          to="/admin/reviews"
          className="Dashboard__item flex items-center space-x-2"
        >
          <RateReview className="text-xl" /> <span>Reviews</span>
        </Link>
      </div>

      <div className="md:hidden">
        <Accordion className="w-full">
          <AccordionSummary
            expandIcon={<Menu className="text-white" />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className="bg-gray-800 text-white"
          >
            <img
              src="http://localhost:3000/static/media/logo1.c7e7bcb491d3d801611b.png"
              alt="Ecommerce"
              className="w-24 h-auto"
            />
          </AccordionSummary>
          <AccordionDetails className="bg-gray-800 text-white space-y-6">
            <Link
              to="/dashboard"
              className="Dashboard__item flex items-center space-x-2"
              onClick={handleButtonClick}
            >
              <Dashboard className="text-xl" /> <span>Dashboard</span>
            </Link>
            <Link
              to="/admin/products"
              className="Dashboard__item flex items-center space-x-2"
            >
              <PostAdd className="text-xl" /> <span>All Products</span>
            </Link>
            <Link
              to="/admin/product"
              className="Dashboard__item flex items-center space-x-2"
            >
              <Add className="text-xl" /> <span>Create Product</span>
            </Link>
            <Link
              to="/admin/orders"
              className="Dashboard__item flex items-center space-x-2"
            >
              <ListAlt className="text-xl" /> <span>Orders</span>
            </Link>
            <Link
              to="/admin/users"
              className="Dashboard__item flex items-center space-x-2"
            >
              <People className="text-xl" /> <span>Users</span>
            </Link>
            <Link
              to="/admin/reviews"
              className="Dashboard__item flex items-center space-x-2"
            >
              <RateReview className="text-xl" /> <span>Reviews</span>
            </Link>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};

export default Sidebar;
