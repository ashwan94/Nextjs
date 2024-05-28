export default async function handler(req, res) {
  const { method } = req;
  const param = method == "POST" ? req.body : req.query; //객체형태 {키:값}

  try {
    // switch (method) {
    //   case "GET":
    //     res.status(200).json({ apiname: "GET", param: param });
    //   case "POST":
    //     res.status(200).json({ apiname: "POST", param: param });
    // }
    switch (param.type) {
      case "paramExist":
        //업데이트
        res.status(200).json({});
      case "getList":
        //목록조회
        res.status(200).json({});
    }
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json(error);
  }
}
