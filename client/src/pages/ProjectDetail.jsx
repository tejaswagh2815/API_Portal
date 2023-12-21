import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { MdPersonAddAlt, MdPersonRemoveAlt1 } from "react-icons/md";
import { ApiComonFun } from "../utils/ApiComonFun";
import { comurl, userurl } from "../utils/ApiList";
import { toast } from "react-toastify";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { CgTrash } from "react-icons/cg";

function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
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
    ApiComonFun(`${comurl}/team`, "POST", true, obj)
      .then((res) => {
        if (res.result) {
          setForceRender((prev) => !prev);
        }
      })
      .catch((err) => console.log(err));
  };

  const DeleteProject = () => {
    ApiComonFun(`${comurl}/project/${id}`, "DELETE", true)
      .then((res) => {
        if (res.result) {
          toast.success(res.reason);
          navigate("/allproject");
        }
      })
      .catch((err) => console.log(err));
  };

  const removeTeam = (user_id) => {
    const obj = data.teams.filter((x) => x.user_id == user_id);
    ApiComonFun(`${comurl}/team/${obj[0].t_id}`, "DELETE", true)
      .then((res) => {
        if (res.result) {
          setForceRender((prev) => !prev);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    ApiComonFun(`${comurl}/project/${id}`, "GET", true)
      .then((res) => {
        if (res.result) {
          setData(res.data);
        }
      })
      .catch((err) => console.log(err));

    ApiComonFun(`${userurl}/userlist`, "GET", true)
      .then((res) => {
        if (res.result) {
          setUser(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [id, forceRender]);

  return (
    <>
      <div className="flex justify-between py-2 px-5">
        <p className="text-gray-500  py-2 px-5">
          Create On : {moment(data.createdAt).format("DD/MM/YYYY")}
        </p>
        <AlertDialog.Root>
          <AlertDialog.Trigger>
            <button className="btn btn-ghost rounded-full">
              <CgTrash color="red" size={18} className="cursor-pointer" />
            </button>
          </AlertDialog.Trigger>
          <AlertDialog.Content style={{ maxWidth: 450 }}>
            <AlertDialog.Title>Delete</AlertDialog.Title>
            <AlertDialog.Description size="2" color="red">
              Are you sure? to delete {data?.pro_name} project (if thee is teams
              they are also removed)
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
                  onClick={() => DeleteProject()}
                >
                  Delete
                </Button>
              </AlertDialog.Action>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </div>

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
