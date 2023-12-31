import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user_type } = useSelector((state) => state.userData);
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/allproject");
  }, []);
  return <></>;
}

export default Home;
