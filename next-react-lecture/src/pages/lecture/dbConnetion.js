import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export default function dbConnetion() {
  //데이터조회
  const getData = async () => {
    const res = await axios.post("/api/dbConnection", { id: 1 });
    console.log(res.data);
  };

  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const idOnChangeHandler = useCallback((e) => {
    setId(e.target.value);
  }, []);
  const nameOnChangeHandler = useCallback((e) => {
    setName(e.target.value);
  }, []);

  const addData = async () => {
    console.log(id);
    console.log(name);
    const res = await axios.post("/api/dbConnection", {
      url: "addData",
      id: id,
      name: name,
    });
    alert(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <label>
        아이디
        <input type="text" onChange={idOnChangeHandler} />
      </label>
      <br />
      <label>
        이름
        <input type="text" onChange={nameOnChangeHandler} />
      </label>

      <button onClick={addData}>추가</button>
    </div>
  );
}
