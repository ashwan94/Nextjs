import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export default function dbConnetion() {

  // DB 에 사용자로부터 입력받은 ID 정보를 parameter 로 전송
  const selectData = async () => {
    const res = await axios.get("/api/dbConnection", {
      url: "selectData",
      id: id,
    });
    alert(res.data);
  };

}
