import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { useProductsContext } from "../context/ProductsProvider";

const ProtectedRoutes = () => {
  const { handleUser } = useProductsContext();
  const [cookies] = useCookies([]);
  const isValid = cookies.token;

  let user = null;
  if (isValid) {
    try {
      const { userID, userName, userRole } = jwtDecode(isValid);
      user = { userID, userName, userRole };
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  useEffect(() => {
    handleUser(user);
  }, []);

  return isValid ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
