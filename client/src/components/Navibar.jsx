import axios from "axios";
import React from "react";
import { FaPowerOff } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Navibar() {
  const navigate = useNavigate();

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
      <div className="navbar bg-base-100 max-w-[100rem] mx-auto sm:btm-nav-sm md:btm-nav-md ">
        {/* <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Homepage</a>
              </li>
              <li>
                <a>Portfolio</a>
              </li>
              <li>
                <a>About</a>
              </li>
            </ul>
          </div>
        </div> */}
        {/* <div className="navbar-center">
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div> */}
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle"></button>
          <button onClick={hadleLogout} className="btn btn-ghost btn-circle">
            <FaPowerOff />
          </button>
        </div>
      </div>
    </>
  );
}

export default Navibar;
