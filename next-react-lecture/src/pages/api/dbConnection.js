import executeQuery from "../../../database";

export default async function handler(req, res) {
  const { id, name, url } = req.body;

  try {
    switch (url) {
      // INSERT 문 실행
      case "addData":
        const query = `INSERT INTO test_table (id, name) VALUES(?, ?)`;
        console.log(query);

        const result = await executeQuery(query, [id, name]);
        console.log(result);

        if (result.affectedRows > 0) {
          res.status(200).json("성공");
        } else {
          res.status(200).json("실패");
        }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

  // SELECT 문 실행
  // 쿼리 날릴 때 보안
  //   const query = `select id, name from test_table where id = ?`;
  //   console.log(query);

  //   const result = await executeQuery(query, [id]);
  //   console.log(result);

  //   res.status(200).json(result);
}
