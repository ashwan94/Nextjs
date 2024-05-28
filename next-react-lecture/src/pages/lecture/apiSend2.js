import axios from "axios";
import { useState } from "react";

export default function ApiSend2() {
  const [apiInfo, setApiInfo] = useState({
    apiname: "",
    param: "",
    param2: "",
  });

  const goGet = async () => {
    const res = await axios.get("/api/weather2");
    setApiInfo({
      apiname: res.data.apiname,
      param: res.data?.param?.type,
      param2: res.data?.param?.num,
    });
  };
  const goGetAndParam = async () => {
    const res = await axios.get("/api/weather2?type=paramExist&num=2");
    setApiInfo({
      apiname: res.data.apiname,
      param: res.data?.param?.type,
      param2: res.data?.param?.num,
    });
  };
  const goPost = async () => {
    const res = await axios.post("/api/weather2");
    setApiInfo({
      apiname: res.data.apiname,
      param: res.data?.param?.type,
      param2: res.data?.param?.num,
    });
  };
  const goPostAndParam = async () => {
    const res = await axios.post("/api/weather2", {
      type: "paramExist",
      num: 2,
    });
    setApiInfo({
      apiname: res.data.apiname,
      param: res.data?.param?.type,
      param2: res.data?.param?.num,
    });
  };

  return (
    <>
      <p>호출된 api명: {apiInfo.apiname}</p>
      <p>api 파라미터: {apiInfo.param}</p>
      <p>api 파라미터2: {apiInfo.param2}</p>

      <button
        type="button"
        className="text-white bg-blue-700 mt-10"
        onClick={goGet}
      >
        get방식
      </button>
      <br />
      <button
        type="button"
        className="text-white bg-blue-700 mt-10"
        onClick={goGetAndParam}
      >
        get방식 & param존재
      </button>
      <br />
      <button
        type="button"
        className="text-white bg-blue-700 mt-10"
        onClick={goPost}
      >
        post방식
      </button>
      <br />
      <button
        type="button"
        className="text-white bg-blue-700 mt-10"
        onClick={goPostAndParam}
      >
        post방식 & param존재
      </button>
    </>
  );
}
