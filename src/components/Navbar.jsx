import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useProductsContext } from "../context/ProductsProvider";

const Navbar = () => {
  const { user, handleUser } = useProductsContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/auth/logout",
        {
          withCredentials: true,
        }
      );
      toast.success("User Logged out Successfully!!!");
      handleUser(null);
      navigate("/login");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error?.response?.data?.msg;
    }
  };

  return (
    <nav className="navbar">
      <div className="wrapper navbar-wrapper">
        <div className="navbar-logo">
          <h1>
            <span>Inventory</span>
            <span>Manager</span>
          </h1>
        </div>
        {user && (
          <div className="links">
            <button className="btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
