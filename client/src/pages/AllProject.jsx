import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateProject, GetAllProject } from "../services/services";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import { Formik } from "formik";
import * as Yup from "yup";

const schema = Yup.object().shape({
  pro_name: Yup.string()
    .required("Name is required feild")
    .min(3, "Name must be at least 3 characters"),
});

function AllProject() {
  const [list, setList] = useState([]);
  const [pagi, setPagi] = useState({
    currentPage: 0,
    totalPages: 0,
    totalItems: 0,
    remainingPages: 0,
  });
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setList([]);
    GetAllProject({ page: pagi.currentPage, search })
      .then((res) => {
        if (res.result) {
          setList(res.data);
          setPagi(res.pagination);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [pagi.currentPage, search]);

  const handlePageClick = (e) => {
    setPagi((prev) => ({ ...prev, currentPage: e.selected + 1 }));
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    CreateProject(values)
      .then((res) => {
        if (res.result) {
          const { pro_id } = res.data;
          navigate(`/projectdetail/${pro_id}`);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <div className="flex justify-between items-center mx-14">
        <h1 className="font-bold text-3xl sm:text-xl md:text-2xl px-5 my-10">
          All Project
        </h1>
        <input
          type="text"
          placeholder="search project"
          className="input input-bordered w-full max-w-xl input-md sm:input-sm md:input-md lg:input-xl"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => document.getElementById("my_modal_3").showModal()}
          className="btn btn-outline btn-accent btn-xs sm:btn-sm md:btn-md lg:btn-md mx-2 hover:text-white"
        >
          add project
        </button>
      </div>
      {isLoading && <Loader />}
      {list.length > 0 ? (
        <>
          <div className="overflow-x-auto mx-10">
            <table className="table">
              <thead>
                <tr className="bg-blue-100">
                  <th>Sr</th>
                  <th>Name</th>
                  <th>Devlopment Url</th>
                  <th>Production Url</th>
                  <th className="text-center">Team Members</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item, index) => (
                  <tr
                    onClick={() => navigate(`/projectdetail/${item.pro_id}`)}
                    className="cursor-pointer"
                    key={item.pro_id}
                  >
                    <th>{pagi.currentPage * 10 - 10 + index + 1}</th>
                    <td>{item.pro_name}</td>
                    <td>{item.dev_url}</td>
                    <td>{item.prod_url}</td>
                    <td className="text-center">{item.teams.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            numOfPages={pagi.totalPages}
            pageNo={pagi.currentPage}
            pageSize={pagi.totalPages}
            handlePageClick={handlePageClick}
            totalItems={pagi.totalItems}
          />
        </>
      ) : (
        <div className="flex justify-center items-center w-full h-full">
          <h1 className="text-2xl text-red-400">No Project Found</h1>
        </div>
      )}
      <>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <Formik
              validationSchema={schema}
              initialValues={{
                pro_name: "",
                dev_url: "",
                prod_url: "",
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
                  <div>
                    <h1 className="text-4xl  text-center ">Create Project</h1>
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
                          {errors.pro_name &&
                            touched.pro_name &&
                            errors.pro_name}
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
                          {errors.prod_url &&
                            touched.prod_url &&
                            errors.prod_url}
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
                );
              }}
            </Formik>
          </div>
        </dialog>
      </>
    </>
  );
}

export default AllProject;
