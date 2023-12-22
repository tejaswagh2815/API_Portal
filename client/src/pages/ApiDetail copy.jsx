import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiComonFun } from "../utils/ApiComonFun";
import { comurl } from "../utils/ApiList";

const ApiDetail = () => {
  const { id, name } = useParams();
  const [apiData, setApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    ApiComonFun(`${comurl}/apibyid/${id}`, "GET", true)
      .then((res) => {
        if (res.result) {
          setApiData(res.data);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="text-3xl text-center py-5">{name}</div>
      <label className="text-xl text-semibold mx-6 py-2">API List</label>
      <div className="join join-vertical w-full px-8">
        {apiData.map((x) => (
          <div
            key={x.api_id}
            className={`collapse collapse-arrow join-item border ${
              x.reqtype == 1
                ? "border-[#61AFFE]"
                : x.reqtype == 2
                ? "border-[#49CC90]"
                : x.reqtype == 3
                ? "border-[#FCA130]"
                : "border-[#F93E3E]"
            } mx-4`}
          >
            <div
              className={`btn ${
                x.reqtype == 1
                  ? "btn-info "
                  : x.reqtype == 2
                  ? "btn-success "
                  : x.reqtype == 3
                  ? " btn-warning "
                  : "btn-error "
              } text-white w-16`}
            >
              {x.reqtype == 1
                ? "GET"
                : x.reqtype == 2
                ? "POST"
                : x.reqtype == 3
                ? "PUT"
                : "DELETE"}
            </div>
            <div className="text-semibol">{x.endpoint}</div>
            <input type="radio" name="my-accordion-4" checked="checked" />
            <div className="collapse-content">
              <p>hello</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-3xl text-center py-5">{name}</div>
      {apiData.map((x) => (
        <div
          ket={x.api_id}
          className={`collapse collapse-arrow my-3 border-2  ${
            x.reqtype == 1
              ? "border-[#61AFFE] bg-[#EBF3FB]"
              : x.reqtype == 2
              ? "border-[#49CC90] bg-[#E8F6F0]"
              : x.reqtype == 3
              ? "border-[#FCA130] bg-[#FBF1E6]"
              : "border-[#F93E3E] bg-[#FAE7E7] "
          }`}
        >
          <input type="radio" name="my-accordion-3" checked="checked" />
          <div className="flex flex-row">
            <div
              className={`btn ${
                x.reqtype == 1
                  ? "btn-info "
                  : x.reqtype == 2
                  ? "btn-success "
                  : x.reqtype == 3
                  ? " btn-warning "
                  : "btn-error "
              } text-white w-16`}
            >
              {x.reqtype == 1
                ? "GET"
                : x.reqtype == 2
                ? "POST"
                : x.reqtype == 3
                ? "PUT"
                : "DELETE"}
            </div>
            <div className="collapse-title text-xl font-medium text-bold">
              {x.endpoint}
            </div>
          </div>

          <div className="collapse-content">
            <p>{x.title}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ApiDetail;
