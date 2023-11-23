import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { errorcss } from "../helper/helpler";
import { toast } from "react-toastify";

const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is a required field")
    .min(5, "Password must be at least 5 characters"),
});

function Login() {
  const navigate = useNavigate();

  useEffect(() => {}, []);

  axios.defaults.withCredentials = true;

  return (
    <>
      <Formik
        validationSchema={schema}
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          // Alert the input values of the form that we filled
          axios
            .post("http://localhost:3000/auth/login", values)
            .then((res) => {
              if (res.data.result) {
                toast.success(res.data.reason, {
                  position: toast.POSITION.TOP_RIGHT,
                });
                navigate("/home");
              }
            })
            .catch((err) =>
              toast.error(err, {
                position: toast.POSITION.TOP_RIGHT,
              })
            );
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl md:max-w-md sm:max-w-sm">
              <h1 className="text-4xl  text-center ">LOGIN</h1>
              <form noValidate onSubmit={handleSubmit} className="mt-6">
                <div className="form-control w-full max-w-xl">
                  <label htmlFor="email" className="label">
                    <span className="label-text text-bold">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your Email Address"
                    className="input input-bordered input-xs  sm:input-sm  md:input-md lg:input-xl"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <p className={errorcss}>
                    {errors.email && touched.email && errors.email}
                  </p>
                </div>
                <div className="form-control w-full max-w-xl">
                  <label htmlFor="password" className="label">
                    <span className="label-text text-bold">Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your Password"
                    className="input input-bordered input-xs sm:input-sm  md:input-md lg:input-xl"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <p className={errorcss}>
                    {errors.password && touched.password && errors.password}
                  </p>
                </div>

                {/* <a href="#" className="text-xs text-blue-600 hover:underline">
            Forget Password?
          </a> */}
                <div className="form-control mt-6 flex justify-center">
                  <button
                    type="submit"
                    className="btn  btn-xs sm:btn-sm md:btn-md lg:btn-md px-2"
                  >
                    LOGIN
                  </button>
                </div>
              </form>

              {/* <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Don't have an account?{" "}
          <a href="#" className="font-medium text-blue-600 hover:underline"></a>
        </p> */}
            </div>
          </div>
        )}
      </Formik>
    </>
  );
}

export default Login;
