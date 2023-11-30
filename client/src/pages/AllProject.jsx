import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetAllProject } from "../services/services";
import { FaRegEdit, FaUserEdit } from "react-icons/fa";

function AllProject() {
  const [list, setList] = useState([]);
  const [data, setData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setList([]);
    GetAllProject()
      .then((res) => {
        if (res.result) {
          console.log("console:", res.data);
          setList(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
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
                {list.map((data, index) => (
                  <tr key={data.pro_id}>
                    <th>{index + 1}</th>
                    <td>{data.pro_name}</td>
                    <td>{data.dev_url}</td>
                    <td>{data.prod_url}</td>
                    <td className="text-center">{data.teams.length}</td>
                    <td className="text-center">
                      <button
                        onClick={() => {
                          navigate(`/addProject/${data.pro_id}`);
                        }}
                        className="btn btn-ghost"
                      >
                        <FaRegEdit style={{ fontSize: 24 }} />
                      </button>
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() => {
                          setData(data);
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
        <>
          <h1 className="text-3xl">No Project Found</h1>
        </>
      )}
    </>
  );
}

export default AllProject;
