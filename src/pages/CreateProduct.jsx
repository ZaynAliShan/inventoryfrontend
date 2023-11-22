import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Form, redirect, Link, useNavigation } from "react-router-dom";
const REMOTE_SERVER = "https://invertorybackend.onrender.com"

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await axios.post(`${REMOTE_SERVER}/api/v1/products`, data, {
      withCredentials: true,
    });
    toast.success("Product Created Successfully");
    return redirect("/");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const CreateProduct = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="create-product">
      <div className="wrapper">
        <h1>Create Product</h1>
        <Link to="..">
          <h4>Go back to Products</h4>
        </Link>
        <div className="wrapper create-product-wrapper">
          <Form method="post" className="create-product-form">
            <h3>Create Product</h3>
            <div className="sku-container">
              <label htmlFor="sku">SKU</label>
              <input type="number" name="sku" id="sku" required />
            </div>
            <div className="name-container">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" required />
            </div>
            <div className="sold-container">
              <label htmlFor="sold">Sold</label>
              <input type="number" name="sold" id="sold" required />
            </div>
            <div className="onHold-container">
              <label htmlFor="onHold">On Hold</label>
              <input type="number" name="onHold" id="onHold" required />
            </div>
            <div className="toCome-container">
              <label htmlFor="toCome">To Come</label>
              <input type="number" name="toCome" id="toCome" required />
            </div>
            <button className="btn" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
