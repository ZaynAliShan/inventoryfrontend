import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Login,
  SharedLayout,
  Products,
  ProtectedRoutes,
  CreateProduct,
} from "./pages";

// Actions
import { action as loginAction } from "./pages/Login";
import { action as createProductAction } from "./pages/CreateProduct";
// Loaders
import { loader as productsLoader } from "./pages/Products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SharedLayout />,
    children: [
      // Protected Routes
      {
        element: <ProtectedRoutes />,
        children: [
          {
            path: "/",
            element: <Products />,
            loader: productsLoader,
          },
          {
            path: "/createProduct",
            element: <CreateProduct />,
            action: createProductAction,
          },
        ],
      },

      // Non-Protected Routes
      {
        path: "/Login",
        element: <Login />,
        action: loginAction,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
