import React, { useEffect, useState } from "react";
import { Form, json, useNavigate } from "react-router-dom";
import { GetAllProject, GetProjectById } from "../services/services";
import { FaRegEdit } from "react-icons/fa";

function AllProject() {
  const [list, setList] = useState([]);
  const [data, setData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    GetAllProject()
      .then((res) => {
        if (res.result) {
          setList(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [navigate]);

  useEffect(() => {
    GetProjectById(data)
      .then((res) => {
        if (res.result) {
          setData(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [data]);

  return (
    <>
      {list.length > 0 ? (
        <>
          <h1 className="font-bold px-9 my-10">AllProject</h1>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Sr</th>
                  <th>Name</th>
                  <th>BaseUrl</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {list.map((data, index) => (
                  <tr key={data.pro_id}>
                    <th>{index + 1}</th>
                    <td>{data.pro_name}</td>
                    <td>{data.base_url}</td>
                    <td>
                      <button
                        onClick={() => {
                          setData(data.pro_id);
                          document.getElementById("my_modal_1").showModal();
                        }}
                        className="btn btn-ghost"
                      >
                        <FaRegEdit style={{ fontSize: 24 }} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg text-center">{data.pro_name}</h3>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">baseUrl</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered input-xs sm:input-sm  md:input-md lg:input-xl"
                  value={data.base_url}
                  onChange={(e) => setData.base_url(e.target.value)}
                />
              </label>
              <label>{JSON.stringify(data.team)}</label>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </>
      ) : (
        <>
          <h1 className="text-3xl">No Project Found</h1>
        </>
      )}
    </>
  );
}

export default AllProject;
