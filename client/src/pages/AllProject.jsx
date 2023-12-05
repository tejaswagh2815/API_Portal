import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetAllProject } from "../services/services";
import { FaRegEdit, FaUserEdit } from "react-icons/fa";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";

function AllProject() {
  const [list, setList] = useState([]);
  const [data, setData] = useState("");
  const [pagi, setPagi] = useState({
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
    remainingPages: 0,
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setList([]);
    GetAllProject({ page: pagi.currentPage })
      .then((res) => {
        if (res.result) {
          setList(res.data);
          setPagi(res.pagination);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [pagi.currentPage]);

  const handlePageClick = (e) => {
    setPagi((prev) => ({ ...prev, currentPage: e.selected + 1 }));
  };

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
                    <th>{pagi.currentPage * 10 - 10 + index + 1}</th>
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
          <Pagination
            numOfPages={pagi.totalPages}
            pageNo={pagi.currentPage}
            pageSize={pagi.totalPages}
            handlePageClick={handlePageClick}
            totalItems={pagi.totalItems}
          />
        </>
      ) : null}
    </>
  );
}

export default AllProject;
