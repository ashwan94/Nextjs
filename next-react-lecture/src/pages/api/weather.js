export default async function handler(req, res) {
  /* get방식의 통신 : parameter가 담긴 위치: request.query */
  // const { method, query } = req;
  // console.log("query=> ", query);

  /* post방식의 통신: parameter가 담긴 위치: request.body */
  const { method, body } = req;
  console.log("method=> ", method);
  console.log("body=> ", body);

  const serviceKey =
    "qD6xw9nXEoB2s4n5PX5gmtA1A7JltxKCfUS7%2FFo%2FhRf%2B608X03Pnjo8MgXxkmBjYlboyaZyeymAsPxqgQjHyvg%3D%3D";
  const url = `http://apis.data.go.kr/1360000/MidFcstInfoService/getMidLandFcst?serviceKey=${serviceKey}&numOfRows=10&pageNo=1&regId=11B00000&tmFc=202405221800&dataType=JSON`;

  try {
    const weatherRes = await fetch(url);
    const result = await weatherRes.json();

    res.status(200).json(result.response.body.items);
  } catch (err) {
    console.log("err===> ", err);
    res.status(500).json({ message: "sever error" });
  }
}
