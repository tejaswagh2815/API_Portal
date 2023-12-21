import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { CgTrash } from "react-icons/cg";
import { FaUserEdit } from "react-icons/fa";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { ApiComonFun } from "../utils/ApiComonFun";
import { userurl } from "../utils/ApiList";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { toast } from "react-toastify";
import { Modal } from "react-responsive-modal";

const Users = () => {
  //   const [search, setSearch] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [userlist, setUserlist] = useState([]);
  const [userData, setUserData] = useState();
  const [id, setid] = useState();
  const [forceRender, setForceRender] = useState(false);
  const [open, setOpen] = useState(false);

  const schema = Yup.object().shape({
    name: Yup.string()
      .required("Name is a required field")
      .min(3, "Name must be at least 3 characters"),
    email: Yup.string()
      .required("Email is a required field")
      .email("Invalid email format"),
    password: Yup.string()
      .required(!id ? "Password is a required field" : null)
      .min(5, "Password must be at least 5 characters"),
  });

  useEffect(() => {
    setIsLoading(true);
    ApiComonFun(`${userurl}/userlist`, "GET", true)
      .then((res) => {
        if (res.result) {
          setUserlist(res.data);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [forceRender]);

  const removeUser = (id) => {
    ApiComonFun(`${userurl}/user/${id}`, "DELETE", true)
      .then((res) => {
        if (res.result) {
          setForceRender((prev) => !prev);
          setOpen(false);
          toast.success(res.reason);
        } else {
          toast.error(res.reason);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      ApiComonFun(`${userurl}/user/${id}`, "GET", true)
        .then((res) => {
          if (res.result) {
            setUserData(res.data);
          } else {
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  return (
    <>
      <div className="flex justify-between items-center mx-14">
        <h1 className="font-bold text-3xl sm:text-xl md:text-2xl px-5 my-10">
          Users List
        </h1>
        {/* <input
          type="text"
          placeholder="search user"
          className="input input-bordered w-full max-w-xl input-md sm:input-sm md:input-md lg:input-xl"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        /> */}
        <button
          onClick={() => {
            setid();
            setOpen(true);
          }}
          className="btn btn-outline btn-accent btn-xs sm:btn-sm md:btn-md lg:btn-md mx-2 hover:text-white"
        >
          Add User
        </button>
      </div>
      {userlist.length > 0 ? (
        <>
          <div className="overflow-x-auto mx-10">
            <table className="table">
              <thead>
                <tr className="bg-blue-100">
                  <th>Sr</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>User Type</th>
                  <th>Roles</th>
                  <th className="text-center">action</th>
                </tr>
              </thead>
              <tbody>
                {userlist.map((item, index) => (
                  <tr key={item.user_id}>
                    <th>{index + 1}</th>
                    <td>{item.user_name}</td>
                    <td>{item.user_email}</td>
                    <td>{item.user_role === 0 ? "admin" : "developer"}</td>
                    <td>
                      {item.user_type === 1
                        ? "backend"
                        : item.user_type === 2
                        ? "frontend"
                        : "fullstack"}
                    </td>
                    <td className="flex flex-row justify-evenly">
                      <FaUserEdit
                        color="blue"
                        size={18}
                        onClick={() => {
                          setid(item.user_id);
                          setOpen(true);
                        }}
                        className="cursor-pointer"
                      />
                      <AlertDialog.Root>
                        <AlertDialog.Trigger>
                          <CgTrash
                            color="red"
                            size={18}
                            className="cursor-pointer"
                          />
                        </AlertDialog.Trigger>{" "}
                        <AlertDialog.Content style={{ maxWidth: 450 }}>
                          <AlertDialog.Title>Delete</AlertDialog.Title>
                          <AlertDialog.Description size="2">
                            Are you sure? to delete user {item.user_name}
                          </AlertDialog.Description>

                          <Flex gap="3" mt="4" justify="end">
                            <AlertDialog.Cancel>
                              <Button variant="soft" color="gray">
                                Cancel
                              </Button>
                            </AlertDialog.Cancel>
                            <AlertDialog.Action>
                              <Button
                                variant="solid"
                                color="red"
                                onClick={() => removeUser(item.user_id)}
                              >
                                Delete
                              </Button>
                            </AlertDialog.Action>
                          </Flex>
                        </AlertDialog.Content>
                      </AlertDialog.Root>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center w-full h-full">
          <h1 className="text-2xl text-red-400">No User Found</h1>
        </div>
      )}

      {/* modal */}
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <Modal
            center
            classNames={{
              overlay: "customOverlay",
              modal: "w-[500px] rounded-lg",
            }}
            open={open}
            onClose={() => setOpen(false)}
          >
            <div className="">
              <Formik
                validationSchema={schema}
                initialValues={{
                  name: id ? userData?.user_name : "",
                  email: id ? userData?.user_email : "",
                  password: "",
                  role: 1,
                  type: id ? userData?.user_type : 0,
                }}
                onSubmit={(values) => {
                  // Alert the input values of the form that we filled
                  if (id) {
                    values.user_id = id;
                    ApiComonFun(`${userurl}/edituser`, "PUT", true, values)
                      .then((res) => {
                        if (res.result) {
                          setForceRender((prev) => !prev);
                          setOpen(false);
                          toast.success(res.reason);
                        } else {
                          toast.error(res.reason);
                        }
                      })
                      .catch((err) => console.log(err))
                      .finally(() => setIsLoading(false));
                  } else {
                    ApiComonFun(`${userurl}/register`, "POST", true, values)
                      .then((res) => {
                        if (res.result) {
                          setForceRender((prev) => !prev);
                          setOpen(false);
                          toast.success(res.reason);
                        } else {
                          toast.error(res.reason);
                        }
                      })
                      .catch((err) => console.log(err))
                      .finally(() => setIsLoading(false));
                  }
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
                  <div>
                    {id ? (
                      <h1 className="text-4xl  text-center ">Upate</h1>
                    ) : (
                      <h1 className="text-4xl  text-center ">Register</h1>
                    )}

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
                          {id ? (
                            <div className="text-blue-500 font-semibold text-sm">
                              Leave blank to keep the same password
                            </div>
                          ) : null}
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
                          {errors.password &&
                            touched.password &&
                            errors.password}
                        </p>
                      </div>
                      <div className="form-control w-full max-w-xl">
                        <label htmlFor="selected" className="label">
                          <span className="label-text text-bold">
                            Select type
                          </span>
                        </label>
                        <Field
                          as="select"
                          name="type"
                          className="select select-bordered select-xs sm:select-sm md:select-md lg:select-md"
                          value={values.type}
                        >
                          <option disabled value={0}>
                            select user tpye?
                          </option>
                          <option value={1}>backend</option>
                          <option value={2}>frontend</option>
                          <option value={3}>fullstack</option>
                        </Field>
                        <p className="text-red-500 text-sm">
                          {errors.selected &&
                            touched.selected &&
                            errors.selected}
                        </p>
                      </div>

                      <div className="form-control mt-6 flex justify-center">
                        <button
                          type="submit"
                          className="btn  btn-xs sm:btn-sm md:btn-md lg:btn-md px-2"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </Formik>
            </div>
          </Modal>
        )}
      </>
    </>
  );
};

export default Users;
