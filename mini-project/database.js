import { createPool } from "mysql2";

//createPool db 연결 풀 생성
const pool = createPool({
  host: "localhost",
  user: "root",
  password: "oracle21c",
  database: "react-db",
  port: 3306,
});

//pool에서 연결 가져오기(성공, 에러처리)
pool.getConnection((err, conn) => {
  if (err) {
    console.log("db connection error");
  } else {
    console.log("db connection success");
  }

  conn.release(); //연결을 반환
});

//쿼리 실행함수 생성
const executeQuery = (query, arr) => {
  return new Promise((res, rej) => {
    try {
      pool.query(query, arr, (err, data) => {
        if (err) {
          console.log("query excute error");
          rej(err);
        }

        res(data);
      });
    } catch (err) {
      rej(err);
    }
  });
};
export default executeQuery;
