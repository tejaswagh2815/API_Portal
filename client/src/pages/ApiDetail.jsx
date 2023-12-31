import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiComonFun } from "../utils/ApiComonFun";
import { comurl } from "../utils/ApiList";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon, TrashIcon } from "@radix-ui/react-icons";
import { Button, IconButton } from "@radix-ui/themes";

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
    ({ children, className, color, borderColor, ...props }, forwardedRef) => {
      return (
        <Accordion.Item
          className={
            "focus-within:shadow-mauve12 mt-3 overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_2px] border-0 border-green-500"
          }
          style={{
            backgroundColor: color,
            // border: 1,
            // borderColor: borderColor,
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
    ({ children, className, borderColor, ...props }, forwardedRef) => (
      <Accordion.Header className="flex">
        <Accordion.Trigger
          style={{
            borderColor: borderColor,
          }}
          className={
            "text-violet11 shadow-mauve6 hover:bg-mauve2 group flex h-[45px] flex-1 cursor-default items-center justify-between px-5 text-[15px] leading-none shadow-[0_1px_0] outline-none "
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

  return (
    <>
      <div className="text-3xl text-center py-5">{name}</div>
      <Accordion.Root
        className={` w-full px-6 rounded-md`}
        type="single"
        collapsible
      >
        {apiData.map((x) => (
          <>
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
              borderColor={`${
                x.reqtype == 1
                  ? "#61AFFE"
                  : x.reqtype == 2
                  ? "#49CC90"
                  : x.reqtype == 3
                  ? "#FCA130"
                  : "#F93E3E"
              }`}
            >
              <AccordionTrigger
                borderColor={`${
                  x.reqtype == 1
                    ? "#61AFFE"
                    : x.reqtype == 2
                    ? "#49CC90"
                    : x.reqtype == 3
                    ? "#FCA130"
                    : "#F93E3E"
                }`}
              >
                <div className="flex flex-row items-center w-full">
                  <Button
                    size="3"
                    variant="solid"
                    style={{
                      height: "30px", // set the desired height
                      width: "70px", // set the desired width
                      borderRadius: "3px",
                    }}
                    color={
                      x.reqtype == 1
                        ? "blue"
                        : x.reqtype == 2
                        ? "green"
                        : x.reqtype == 3
                        ? "orange"
                        : "red"
                    }
                  >
                    {x.reqtype == 1
                      ? "GET"
                      : x.reqtype == 2
                      ? "POST"
                      : x.reqtype == 3
                      ? "PUT"
                      : "DELETE"}
                  </Button>

                  <div className=" font-bold px-3"> {x.endpoint}</div>
                </div>
                <div className="  right-[-24]">
                  <IconButton onClick={() => console.log(x.api_id)}>
                    <TrashIcon color="red" width="18" height="18" />
                  </IconButton>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {x.params?.map((item) => (
                  <div className="text-md">{item.name}</div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </>
        ))}
      </Accordion.Root>
    </>
  );
};

export default ApiDetail;
