import { Formik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  CreateProject,
  EditProject,
  GetProjectById,
} from "../services/services";
import Loader from "./Loader";

const schema = Yup.object().shape({
  pro_name: Yup.string()
    .required("Name is required feild")
    .min(3, "Name must be at least 3 characters"),
});

function AddEditPro() {
  const { pro_id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (pro_id == 0) {
      return;
    }

    setIsLoading(true);

    GetProjectById(pro_id)
      .then((res) => {
        if (res.result) {
          setData(res.data);
        } else {
          <Alert>res.reason</Alert>;
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [pro_id]);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    if (pro_id == 0) {
      CreateProject(values)
        .then((res) => {
          if (res.result) {
            navigate("/allproject");
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    } else {
      values.pro_id = pro_id;
      EditProject(values)
        .then((res) => {
          if (res.result) {
            navigate("/allproject");
          } else {
            <Alert>{res.reason}</Alert>;
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Formik
          validationSchema={schema}
          initialValues={{
            pro_name: pro_id != 0 ? data?.pro_name : "",
            dev_url: pro_id != 0 ? data?.dev_url : "",
            prod_url: pro_id != 0 ? data?.prod_url : "",
          }}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => {
            return (
              <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
                <div className="w-full p-6 m-auto rounded-md shadow-md lg:max-w-xl md:max-w-md sm:max-w-sm">
                  {pro_id != 0 ? (
                    <h1 className="text-4xl  text-center "> Edit Project</h1>
                  ) : (
                    <h1 className="text-4xl  text-center "> Create Project</h1>
                  )}

                  <form noValidate onSubmit={handleSubmit} className="mt-6">
                    <div className="form-control w-full max-w-xl">
                      <label htmlFor="email" className="label">
                        <span className="label-text text-bold">name</span>
                      </label>
                      <input
                        type="name"
                        name="pro_name"
                        placeholder="Enter Project name"
                        className="input input-bordered input-xs  sm:input-sm  md:input-md lg:input-xl"
                        value={values.pro_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <p className="text-red-500 text-sm">
                        {errors.pro_name && touched.pro_name && errors.pro_name}
                      </p>
                    </div>

                    <div className="form-control w-full max-w-xl">
                      <label htmlFor="email" className="label">
                        <span className="label-text text-bold">
                          Devlopment Url
                        </span>
                      </label>
                      <input
                        type="text"
                        name="dev_url"
                        placeholder="Enter Devlopment url"
                        className="input input-bordered input-xs  sm:input-sm  md:input-md lg:input-xl"
                        value={values.dev_url}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <p className="text-red-500 text-sm">
                        {errors.dev_url && touched.dev_url && errors.dev_url}
                      </p>
                    </div>

                    <div className="form-control w-full max-w-xl">
                      <label htmlFor="email" className="label">
                        <span className="label-text text-bold">
                          Production Url
                        </span>
                      </label>
                      <input
                        type="text"
                        name="prod_url"
                        placeholder="Enter Project name"
                        className="input input-bordered input-xs  sm:input-sm  md:input-md lg:input-xl"
                        value={values.prod_url}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <p className="text-red-500 text-sm">
                        {errors.prod_url && touched.prod_url && errors.prod_url}
                      </p>
                    </div>

                    <div className="form-control mt-6 flex justify-center">
                      <button
                        type="submit"
                        className="btn  btn-xs sm:btn-sm md:btn-md lg:btn-md px-2"
                      >
                        submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            );
          }}
        </Formik>
      )}
    </>
  );
}

export default AddEditPro;
