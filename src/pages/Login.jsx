import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Form, redirect, useNavigation } from "react-router-dom";
const REMOTE_SERVER = "somelink"

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await axios.post(`${REMOTE_SERVER}/api/v1/auth/login`, data, {
      withCredentials: true,
    });
    toast.success("User Logged in Successfully");
    return redirect("/");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="login">
      <div className="wrapper login-wrapper">
        <Form className="login-form" method="post">
          <h3>Login</h3>
          <div className="email-container">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" required />
          </div>
          <div className="password-container">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" required />
          </div>
          <button className="btn" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
