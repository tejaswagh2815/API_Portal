import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiComonFun } from "../utils/ApiComonFun";
import { comurl } from "../utils/ApiList";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";

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

  const AccordionItem = React.forwardRef(
    ({ children, className, color, border, ...props }, forwardedRef) => {
      return (
        <Accordion.Item
          className={
            "focus-within:shadow-mauve12 mt-3 overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_2px] "
          }
          style={{
            backgroundColor: color,
            border: 1,
            borderColor: border,
          }}
          {...props}
          ref={forwardedRef}
        >
          {children}
        </Accordion.Item>
      );
    }
  );

  const AccordionTrigger = React.forwardRef(
    ({ children, className, ...props }, forwardedRef) => (
      <Accordion.Header className="flex">
        <Accordion.Trigger
          className={
            "text-violet11 shadow-mauve6 hover:bg-mauve2 group flex h-[45px] flex-1 cursor-default items-center justify-between px-5 text-[15px] leading-none shadow-[0_1px_0] outline-none"
          }
          {...props}
          ref={forwardedRef}
        >
          {children}
          <ChevronDownIcon
            className="text-violet10 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
            aria-hidden
          />
        </Accordion.Trigger>
      </Accordion.Header>
    )
  );

  const AccordionContent = React.forwardRef(
    ({ children, className, ...props }, forwardedRef) => (
      <Accordion.Content
        className={
          "text-mauve11 bg-mauve2 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]"
        }
        {...props}
        ref={forwardedRef}
      >
        <div className="py-[15px] px-5">{children}</div>
      </Accordion.Content>
    )
  );

  // ${
  //   x.reqtype == 1
  //     ? "border-[#61AFFE] bg-[#EBF3FB]"
  //     : x.reqtype == 2
  //     ? "border-[#49CC90] bg-[#E8F6F0]"
  //     : x.reqtype == 3
  //     ? "border-[#FCA130] bg-[#FBF1E6]"
  //     : "border-[#F93E3E] bg-[#FAE7E7]"
  // }

  return (
    <>
      <div className="text-3xl text-center py-5">{name}</div>
      <Accordion.Root
        className={` w-full px-6 rounded-md shadow-[0_2px_10px] shadow-black/5`}
        type="single"
        collapsible
      >
        {apiData.map((x) => (
          <>
            {/* <div
              ket={x.api_id}
              className={`collapse collapse-arrow my-3 border-2  `}
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
            </div> */}

            <AccordionItem
              value={x.api_id}
              color={`${
                x.reqtype == 1
                  ? "#EBF3FB"
                  : x.reqtype == 2
                  ? "#E8F6F0"
                  : x.reqtype == 3
                  ? "#FBF1E6"
                  : "#FAE7E7"
              }`}
              border={`${
                x.reqtype == 1
                  ? "#61AFFE"
                  : x.reqtype == 2
                  ? "#49CC90"
                  : x.reqtype == 3
                  ? "#FCA130"
                  : "#F93E3E"
              }`}
            >
              <AccordionTrigger>{x.endpoint}</AccordionTrigger>
              <AccordionContent>
                {/* {x.params?.map((item) => item.id)} */}
              </AccordionContent>
            </AccordionItem>
          </>
        ))}{" "}
      </Accordion.Root>
    </>
  );
};

export default ApiDetail;
