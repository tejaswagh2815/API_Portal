import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout, verifyUser } from "../redux/authSlice";
import { ApiComonFun } from "../utils/ApiComonFun";
import { userurl } from "../utils/ApiList";

function Header() {
  const { user_type } = useSelector((state) => state.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    ApiComonFun(`${userurl}/verifyuser`, "GET", true)
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
    ApiComonFun(`${userurl}/logout`, "GET", true)
      .then((res) => {
        console.log("res:", res);
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
        <div className="navbar bg-[#08509D] text-secondary-content  mx-auto sm:btm-nav-sm md:btm-nav-md">
          <div className="flex-1">
            <Link to="/allproject" className="btn btn-ghost text-xl">
              Project List
            </Link>
            <Link to="/users" className="btn btn-ghost text-xl">
              Users
            </Link>
          </div>
          <div className="flex-none">
            <button onClick={hadleLogout} className="btn btn-ghost btn-circle">
              <FaPowerOff style={{ fontSize: 22 }} />
            </button>
          </div>
        </div>
      ) : (
        <div className="navbar bg-[#08509D] text-secondary-content mx-auto sm:btm-nav-sm md:btm-nav-md">
          <div className="flex-1">
            <Link to="/allproject" className="btn btn-ghost text-xl">
              Project List
            </Link>
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
