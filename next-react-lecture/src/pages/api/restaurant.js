import axios from "axios";

export default async function handler(req, res) {
  //get -> query post -> body
  const { page } = req.query;
  const key =
    "qD6xw9nXEoB2s4n5PX5gmtA1A7JltxKCfUS7%2FFo%2FhRf%2B608X03Pnjo8MgXxkmBjYlboyaZyeymAsPxqgQjHyvg%3D%3D";
  const url = `https://apis.data.go.kr/6300000/openapi2022/restrnt/getrestrnt?serviceKey=${key}&pageNo=${page}&numOfRows=9`;

  try {
    //api 호출 -> method
    const restaurantRes = await axios.get(url);
    console.log(restaurantRes.data.response.body);

    res.status(200).json(restaurantRes.data.response.body); //{totalCount, items}
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error!!!" });
  }
}
