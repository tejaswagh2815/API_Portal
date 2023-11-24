import axios from "axios";
import React from "react";
import { FaPowerOff } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../contexts/authSlice";

function Navibar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user_type, user_role } = useSelector((state) => state.userData);

  const hadleLogout = () => {
    axios
      .get("http://localhost:3000/auth/logout", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.result) {
          toast.success(res.data.reason, {
            position: toast.POSITION.TOP_RIGHT,
          });
          dispatch(logout());
          navigate("/login");
        }
      })
      .catch((err) => {
        toast.error(err.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  return (
    <>
      {user_type === 0 ? (
        <div className="navbar bg-secondary text-secondary-content  max-w-[100rem] mx-auto sm:btm-nav-sm md:btm-nav-md">
          <div className="flex-1">
            <Link to="/allproject" className="btn btn-ghost text-xl">
              Project List
            </Link>
            <Link to="/addproject" className="btn btn-ghost text-xl">
              Add Project
            </Link>
            <Link to="/register" className="btn btn-ghost text-xl">
              Add User
            </Link>
          </div>
          <div className="flex-none">
            <button onClick={hadleLogout} className="btn btn-ghost btn-circle">
              <FaPowerOff />
            </button>
          </div>
        </div>
      ) : (
        <div className="navbar bg-primary text-secondary-content max-w-[100rem] mx-auto sm:btm-nav-sm md:btm-nav-md">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl">user</a>
          </div>
          <div className="flex-none">
            <button onClick={hadleLogout} className="btn btn-ghost btn-circle">
              <FaPowerOff />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Navibar;
