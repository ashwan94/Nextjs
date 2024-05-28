import axios from "axios";
import { useEffect } from "react";

export default function ApiSend() {
  /* API 통신해서 DATA를 가져와 화면에 뿌려주는 작업 
     1. Client-side
     2. Sever-side: Api routes
  */
  const serviceKey =
    "qD6xw9nXEoB2s4n5PX5gmtA1A7JltxKCfUS7%2FFo%2FhRf%2B608X03Pnjo8MgXxkmBjYlboyaZyeymAsPxqgQjHyvg%3D%3D";
  const url = `http://apis.data.go.kr/1360000/MidFcstInfoService/getMidLandFcst?serviceKey=${serviceKey}&numOfRows=10&pageNo=1&regId=11B00000&tmFc=202405221800&dataType=JSON`;

  const getData = async () => {
    /* version1. client - fetch api */
    // const res = await fetch(url); //get방식으로 전송
    // const result = await res.json();
    // console.log(result);
    /* version2. client - axios */
    // const res2 = await axios.get(url);
    // const result2 = res2.data;
    /* version3. api routes - sever단 */
    // const res3 = await fetch("/api/weather"); //response객체
    // const result3 = await res3.json(); //응답객체 -> obj
    // console.log(result3);

    // const res4 = await axios.get("/api/weather?test=123");
    // const result4 = res4.data;
    // console.log(result4);

    const res5 = await axios.post("/api/weather", { test: 123 });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h1>API 통신</h1>
    </>
  );
}
