import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Field, Formik } from "formik";
import * as Yup from "yup";

const schema = Yup.object().shape({
  name: Yup.string()
    .required("Name is a required field")
    .min(3, "Name must be at least 3 characters"),
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is a required field")
    .min(5, "Password must be at least 5 characters"),
});

function Register() {
  const navigate = useNavigate();

  useEffect(() => {}, []);

  return (
    <>
      <Formik
        validationSchema={schema}
        initialValues={{
          name: "",
          email: "",
          password: "",
          role: 1,
          type: null,
        }}
        onSubmit={(values) => {
          // Alert the input values of the form that we filled
          axios
            .post("http://localhost:3000/auth/register", values)
            .then((res) => {
              if (res.data.result) {
                navigate("/allproject");
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
            <div className="w-full p-6 m-auto  rounded-md shadow-md lg:max-w-xl md:max-w-md sm:max-w-sm">
              <h1 className="text-4xl  text-center ">Register</h1>
              <form noValidate onSubmit={handleSubmit} className="mt-6">
                <div className="form-control w-full max-w-xl">
                  <label htmlFor="name" className="label">
                    <span className="label-text text-bold">Name</span>
                  </label>
                  <input
                    type="name"
                    name="name"
                    placeholder="Enter User Name"
                    className="input input-bordered input-xs  sm:input-sm  md:input-md lg:input-xl"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <p className="text-red-500 text-sm">
                    {errors.name && touched.name && errors.name}
                  </p>
                </div>
                <div className="form-control w-full max-w-xl">
                  <label htmlFor="email" className="label">
                    <span className="label-text text-bold">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Email Address"
                    className="input input-bordered input-xs sm:input-sm  md:input-md lg:input-xl"
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
                    placeholder="Enter Password"
                    className="input input-bordered input-xs sm:input-sm  md:input-md lg:input-xl"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <p className="text-red-500 text-sm">
                    {errors.password && touched.password && errors.password}
                  </p>
                </div>
                <div className="form-control w-full max-w-xl">
                  <label htmlFor="selected" className="label">
                    <span className="label-text text-bold">Select type</span>
                  </label>
                  <Field
                    as="select"
                    name="type"
                    className="select select-bordered w-full max-w-xl sm:select-sm md:select-md "
                  >
                    <option disabled selected>
                      select user tpye?
                    </option>
                    <option value={1}>backend</option>
                    <option value={2}>frontend</option>
                    <option value={3}>fullstack</option>
                  </Field>
                  <p className="text-red-500 text-sm">
                    {errors.selected && touched.selected && errors.selected}
                  </p>
                </div>

                <div className="form-control mt-6 flex justify-center">
                  <button
                    type="submit"
                    className="btn  btn-xs sm:btn-sm md:btn-md lg:btn-md px-2"
                  >
                    register
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

export default Register;
