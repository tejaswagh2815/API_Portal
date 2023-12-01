import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetAllProject } from "../services/services";
import { FaRegEdit, FaUserEdit } from "react-icons/fa";
import Loader from "../components/Loader";

function AllProject() {
  const [list, setList] = useState([]);
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setList([]);
    GetAllProject()
      .then((res) => {
        if (res.result) {
          setList(res.data);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {list.length > 0 ? (
        <>
          <div className="flex justify-between items-center mx-14">
            <h1 className="font-bold text-3xl px-9 my-10"> All Project </h1>
            <button
              onClick={() => navigate("/addproject/0")}
              className="btn btn-outline btn-accent text-white"
            >
              add project
            </button>
          </div>
          <div className="overflow-x-auto mx-10">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="bg-blue-100">
                  <th>Sr</th>
                  <th>Name</th>
                  <th>Devlopment Url</th>
                  <th>Production Url</th>
                  <th className="text-center">Team Members</th>
                  <th className="text-center">Edit</th>
                  <th className="text-center">Add Team</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item, index) => (
                  <tr key={item.pro_id}>
                    <th>{index + 1}</th>
                    <td>{item.pro_name}</td>
                    <td>{item.dev_url}</td>
                    <td>{item.prod_url}</td>
                    <td className="text-center">{item.teams.length}</td>
                    <td className="text-center">
                      <button
                        onClick={() => {
                          navigate(`/addProject/${item.pro_id}`);
                        }}
                        className="btn btn-ghost"
                      >
                        <FaRegEdit style={{ fontSize: 24 }} />
                      </button>
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() => {
                          setData(item);
                          document.getElementById("my_modal_3").showModal();
                        }}
                        className="btn btn-ghost"
                      >
                        <FaUserEdit style={{ fontSize: 24 }} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center w-full h-full min-h-screen">
          <h1 className="text-3xl text-red-400">No Project Found</h1>
        </div>
      )}

      {/* You can open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">{data.pro_name}</h3>
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>
    </>
  );
}

export default AllProject;
