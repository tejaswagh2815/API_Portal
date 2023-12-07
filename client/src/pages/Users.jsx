import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { getUserList } from "../services/services";
import { CgTrash } from "react-icons/cg";

const Users = () => {
  const [search, setSearch] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [userlist, setUserlist] = useState([]);

  useEffect(() => {
    getUserList()
      .then((res) => {
        if (res.result) {
          setUserlist(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const removeUser = (id) => {
    console.log(id);
  };

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
          onClick={() => document.getElementById("my_modal_3").showModal()}
          className="btn btn-outline btn-accent btn-xs sm:btn-sm md:btn-md lg:btn-md mx-2 hover:text-white"
        >
          Add User
        </button>
      </div>
      {isLoading && <Loader />}
      {userlist.length > 0 ? (
        <>
          <div className="overflow-x-auto mx-10">
            <table className="table">
              <thead>
                <tr className="bg-blue-100">
                  <th>Sr</th>
                  <th>Name</th>
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
                    {item.user_type === 0 ? (
                      <td>backend</td>
                    ) : (
                      <td>frontend</td>
                    )}
                    {item.user_type === 0 ? (
                      <td>backend</td>
                    ) : item.user_type === 1 ? (
                      <td>frontend</td>
                    ) : (
                      <td>fullstack</td>
                    )}

                    <td>
                      <CgTrash
                        color="red"
                        size={18}
                        onClick={() => removeUser(item.user_id)}
                        className=" cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center w-full h-full">
          <h1 className="text-2xl text-red-400">No Project Found</h1>
        </div>
      )}
    </>
  );
};

export default Users;
