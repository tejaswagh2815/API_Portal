import React from "react";

function Loader() {
  return (
    <div className="flex justify-center items-center w-full h-full min-h-screen backdrop-blur-xs">
      <span className="loading loading-bars loading-lg"></span>
    </div>
  );
}

export default Loader;
