import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AddAsTeam, GetProjectById, removeMember } from "../services/services";
import moment from "moment";
import { MdPersonAddAlt, MdPersonRemoveAlt1 } from "react-icons/md";

function ProjectDetail() {
  const { id } = useParams();
  const [data, setData] = useState({
    pro_name: "",
    dev_url: "",
    prod_url: "",
    createdAt: "",
    teams: [],
  });
  const [users, setUser] = useState([]);
  const [forceRender, setForceRender] = useState(false);

  const addTeam = (user_id) => {
    const obj = {
      pro_id: data.pro_id,
    };

    obj.user_id = user_id;

    AddAsTeam(obj)
      .then((res) => {
        if (res.result) {
          setForceRender((prev) => !prev);
        }
      })
      .catch((err) => console.log(err));
  };

  const removeTeam = (user_id) => {
    const obj = data.teams.filter((x) => x.user_id == user_id);
    removeMember(obj[0].t_id)
      .then((res) => {
        if (res.result) {
          setForceRender((prev) => !prev);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    GetProjectById(id)
      .then((res) => {
        if (res.result) {
          setData(res.data);
        }
      })
      .catch((err) => console.log(err));

    getUserList()
      .then((res) => {
        if (res.result) {
          setUser(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [id, forceRender]);

  return (
    <>
      <p className="text-gray-500 flex justify-end py-2 px-5">
        Create On : {moment(data.createdAt).format("DD/MM/YYYY")}
      </p>
      <div className="flex justify-center items-center">
        <h3 className="text-xl font-bold">{data.pro_name}</h3>
      </div>
      <div className="flex justify-evenly py-6">
        <h4 className="text-bold">Dev_url : {data.dev_url}</h4>
        <h4 className="text-bold">Pro_url : {data.prod_url}</h4>
      </div>

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
            {users.map((item, index) => (
              <tr key={item.user_id}>
                <th>{index + 1}</th>
                <td>{item.user_name}</td>
                {item.user_type === 0 ? <td>backend</td> : <td>frontend</td>}
                {item.user_type === 0 ? (
                  <td>backend</td>
                ) : item.user_type === 1 ? (
                  <td>frontend</td>
                ) : (
                  <td>fullstack</td>
                )}
                {data.teams.filter((x) => x.user_id == item.user_id).length >
                0 ? (
                  <td>
                    <MdPersonRemoveAlt1
                      color="red"
                      size={18}
                      onClick={() => removeTeam(item.user_id)}
                      className=" cursor-pointer"
                    />
                  </td>
                ) : (
                  <td>
                    <MdPersonAddAlt
                      color="green"
                      size={18}
                      onClick={() => addTeam(item.user_id)}
                      className=" cursor-pointer"
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ProjectDetail;
