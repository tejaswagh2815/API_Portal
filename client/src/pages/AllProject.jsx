import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AllProject() {
  const [list, setList] = useState([]);

  const navigate = useNavigate();

  const getList = () => {
    axios
      .get("http://localhost:3000/api/allProject", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.result) {
          setList(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getList();
  }, [navigate]);

  return (
    <>
      <h1 className="font-bold px-9 my-10">AllProject</h1>
      {list.length > 0 ? (
        list.map((data, index) => (
          <div
            className="flex flex-row justify-between my-4 px-10"
            key={data.pro_id}
          >
            <h1 className="text-center">{index + 1}</h1>
            <h1 className="text-center">{data.pro_name}</h1>
            <h1 className="text-center">{data.base_url}</h1>
          </div>
        ))
      ) : (
        <label>Project Not Found</label>
      )}
    </>
  );
}

export default AllProject;
