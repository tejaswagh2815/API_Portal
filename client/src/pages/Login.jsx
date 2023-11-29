import { Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { verifyUser } from "../redux/authSlice";
import { UserLogin } from "../services/services";

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
  const dispatch = useDispatch();
  return (
    <>
      <Formik
        validationSchema={schema}
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          UserLogin(values)
            .then((res) => {
              if (res.result) {
                dispatch(verifyUser(res.data));
                navigate("/");
              } else {
              }
            })
            .catch((err) => console.log(err));
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
            <div className="w-full p-6 m-auto rounded-md shadow-md lg:max-w-xl md:max-w-md sm:max-w-sm">
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
                  <p className="text-red-500 text-sm">
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
                  <p className="text-red-500 text-sm">
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
            </div>
          </div>
        )}
      </Formik>
    </>
  );
}

export default Login;
