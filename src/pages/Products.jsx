import React, { useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { DisplayAllProducts, Form, Filters } from "../components";
import { Link, useLoaderData } from "react-router-dom";
import axios from "axios";
import { useProductsContext } from "../context/ProductsProvider";
const REMOTE_SERVER = "https://invertorybackend.onrender.com"

export const loader = async () => {
  try {
    const { data } = await axios.get(`${REMOTE_SERVER}/api/v1/products`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    return error?.response?.data?.msg;
  }
};

const AllProducts = () => {
  const { user } = useProductsContext();
  const { products } = useLoaderData();

  return (
    <div className="products">
      <div className="products-sub-container">
        <h1>All Products</h1>
        <div className="plus-icon-container">
          <button>
            {user?.userRole === "admin" && (
              <Link to="/createProduct" className=" btn create-btn">
                <span>Add new Product</span>
                <FaPlus className="plus-icon" />
              </Link>
            )}
          </button>
        </div>
        <Form />
        <Filters />
        <DisplayAllProducts products={products} />
      </div>
    </div>
  );
};

export default AllProducts;
