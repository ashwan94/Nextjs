import executeQuery from "../../../database";
import _ from "lodash";

export default async function handler(req, res) {
  const { url, id, pw, name, location, field, nickName, intro, gender, crue } =
    req.body;
  console.log("URL ==>", url);
  console.log("ID ==>", id);
  console.log("PW ==>", pw);
  console.log("NAME ==>", name);
  console.log("NICKNAME ==>", nickName);
  console.log("INTRO ==>", intro);
  console.log("GENDER ==>", gender);
  console.log("CRUE ==>", crue);

  try {
    switch (url) {
      // ID 중복 가입 방지를 위한 SELECT 문
      case "selectData":
        const selectQuery = `SELECT user_no, user_id, user_name FROM USERS WHERE user_id = ?`;
        console.log("SELECT 문 ==> ", selectQuery);

        // SELECT 는 DB 응답이 array 로 들어오므로 전개구문으로 array 해제
        const result = await executeQuery(selectQuery, [id]);
        console.log("SELECT 문 결과 ==> ", ...result);

        res.status(200).json(...result); // array 에 있는 object 를 꺼내줌
        break;

      // 회원가입 INSERT 문 - page 1
      case "addData":
        const addQuery = `INSERT INTO USERS 
                                 (user_id, user_pw, user_name, user_location, user_field, create_date, modify_date) 
                          VALUES 
                                 (?, ?, ?, ?, ?, CURRENT_DATE(), CURRENT_DATE())
                          `;
        console.log("INSERT문 ==> ", addQuery);

        const addResult = await executeQuery(addQuery, [
          id,
          pw,
          name,
          location,
          field,
        ]);

        if (addResult.affectedRows > 0) {
          res.status(200).json(id);
        } else {
          res.status(200).json("0");
        }
        break;

      // 회원가입 INSERT 문 - page 2(추가 정보 기입)
      case "updateData":
        const updateQuery = `UPDATE USERS 
                            SET user_nickname = ?
                                , user_intro = ?
                                , user_gender = ? 
                            WHERE user_id = ?
                            `;
        console.log("회원가입 page 2 query ==> ", updateQuery);

        const updateResult = await executeQuery(updateQuery, [
          nickName,
          intro,
          gender,
          id,
        ]);
        console.log("UPDATE 문 결과 ==> ", updateResult);

        if (updateResult.affectedRows > 0) {
          res.status(200).json(id);
        } else {
          res.status(200).json("0");
        }
        break;

      // 로그인을 위한 SELECT 문
      case "login":
        const loginQuery = `SELECT COUNT(user_id) as cnt FROM USERS WHERE user_id = ? AND user_pw = ?`;
        console.log("로그인 query ==> ", loginQuery);

        const loginResult = await executeQuery(loginQuery, [id, pw]);
        console.log("SELECT 문 결과 ==> ", loginResult);

        const cnt = _.first(loginResult).cnt; // array 의 1번째 element 를 꺼냄

        if (cnt > 0) {
          res.status(200).json("1"); // array 에 있는 object 를 꺼내줌
        } else {
          res.status(200).json("0");
        }
        break;

      // 닉네임 중복 확인을 위한 SELECT 문
      case "checkNickName":
        const checkNickName = `SELECT user_nickname
                               FROM USERS
                               WHERE user_nickname = ?`;
        console.log("닉네임 중복 확인 query ==> ", checkNickName);

        const nickNameResult = await executeQuery(checkNickName, [nickName]);
        console.log("닉네임 조회 결과 ==> ", ...nickNameResult);

        res.status(200).json(...nickNameResult);
        break;

      // 전체 유저 리스트 출력
      case "getUserList":
        const getUserList = `SELECT u.user_name , u.user_field , u.user_location , u.user_intro, s1.status
                             FROM USERS u
                             LEFT OUTER JOIN (
                                SELECT ugm.user_id, ugm.group_id, ugm.status
                                FROM user_group_mapping ugm 
                                INNER JOIN user_groups ug 
                                ON ugm.group_id  = ug.group_id 
                                AND ug.group_manager = ?) s1
                             ON u.user_id = s1.user_id
                              `;
        console.log("전체 유저 리스트 query 확인 ==> ", getUserList);

        const getUserListResult = await executeQuery(getUserList, [id]); // 로그인된 사용자의 ID 정보를 query 에 입력

        res.status(200).json(getUserListResult);
        break;

      // 유저에게 초대장 SEND
      case "sendInvite":
        const sendInvite = `INSERT INTO USER_GROUP_MAPPING
                                (USER_ID, GROUP_ID, STATUS)
                              VALUES
                                (
                                  (
                                    select u.user_id
                                    from users u
                                    where u.user_name = ?
                                  )
                                  ,
                                  (
                                    SELECT GROUP_ID
                                    FROM USER_GROUPS
                                    WHERE GROUP_MANAGER = ?
                                  )
                                  ,
                                  ?
                                )
                                  `;
        console.log("초대장 보내기 query ==> ", sendInvite);

        const sendInviteResult = await executeQuery(sendInvite, [crue, id, 0]);
        if (sendInviteResult.affectedRows > 0) {
          res.status(200).json({ success: true });
        } else {
          res.status(200).json({ success: false });
        }
        break;

        // main page 의 카테고리 중 Users, Locations, Groups 에 표시할 숫자 SELECT
        case "getCounts":
          const getCounts =`SELECT COUNT(user_id) user_cnt,
                            COUNT(DISTINCT user_location) user_location,
                              (
                                SELECT COUNT(*)
                                FROM USER_GROUPS
                              ) group_cnt
                            FROM USERS
                            `;
          console.log("getCounts query ==> ", getCounts);

          const getCountsResult = await executeQuery(getCounts);
          res.status(200).json(...getCountsResult);
          break;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
