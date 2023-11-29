import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { HandleLogout, VerifyUser } from "../services/services";
import { logout, verifyUser } from "../redux/authSlice";

function Header() {
  const { user_type } = useSelector((state) => state.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    VerifyUser()
      .then((res) => {
        if (res.result) {
          dispatch(verifyUser(res.data));
        } else {
          dispatch(logout());
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const hadleLogout = () => {
    HandleLogout()
      .then((res) => {
        if (res.result) {
          dispatch(logout());
          navigate("/login");
        } else {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      {user_type === 0 ? (
        <div className="navbar bg-primary text-secondary-content  mx-auto sm:btm-nav-sm md:btm-nav-md">
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
              <FaPowerOff style={{ fontSize: 22 }} />
            </button>
          </div>
        </div>
      ) : (
        <div className="navbar bg-primary text-secondary-content mx-auto sm:btm-nav-sm md:btm-nav-md">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl">user</a>
          </div>
          <div className="flex-none">
            <button onClick={hadleLogout} className="btn btn-ghost btn-circle">
              <FaPowerOff style={{ fontSize: 22 }} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
