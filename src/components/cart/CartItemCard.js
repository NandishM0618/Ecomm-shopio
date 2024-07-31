import React from "react";
import { Link } from "react-router-dom";
// import "./CartItemCard.css";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="ssa" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price : ₹${item.price}`}</span>
        <p
          onClick={() => deleteCartItems(item.product)}
          className=" bg-red-500 p-2 text-center mt-6 rounded-md hover:scale-105 w-[100px] text-white"
        >
          Remove
        </p>
      </div>
    </div>
  );
};

export default CartItemCard;
