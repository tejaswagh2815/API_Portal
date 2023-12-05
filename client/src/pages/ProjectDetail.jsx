import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetProjectById } from "../services/services";
import moment from "moment";

function ProjectDetail() {
  const { id } = useParams();
  const [data, setData] = useState({
    pro_name: "",
    dev_url: "",
    prod_url: "",
    createdAt: "",
  });

  useEffect(() => {
    GetProjectById(id)
      .then((res) => {
        if (res.result) {
          setData(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <>
      <p className="text-gray-500 flex justify-end py-2 px-5">
        Create On : {moment(data.createdAt).format("DD/MM/YYYY")}
      </p>
      <div className="flex justify-center items-center">
        <h1 className="text-2xl font-bold">{data.pro_name}</h1>
      </div>
    </>
  );
}

export default ProjectDetail;
