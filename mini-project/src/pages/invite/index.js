import Header from "@/components/Layout/Header";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import InvitePopup from "./InvitePopup";

export default function Index() {
  const router = useRouter();

  // 최초 브라우저 로딩 시 login 상태 여부 체크
  const [localLoginId, setLocalLoginId] = useState(
    JSON.parse(localStorage.getItem("login"))
  );

  // DB 에서 data 가져옴
  useEffect(() => {
    console.log("로그인 정보 ==> ", localLoginId);

    if (!localLoginId) {
      router.push("/login/signIn");
    } else {
      getUserList();
    }
  }, []);

  // DB 에서 모든 USER LIST 가져오기
  const [userList, setUserList] = useState("");
  const [group, setGroup] = useState("");
  const getUserList = async () => {
    const res = await axios.post("/api/dbConnection", {
      url: "getUserList",
      id: localLoginId,
    });
    console.log("수신된 USERS LIST ==> ", res.data);
    setUserList(res.data);
  };

  // 초대 팝업 창 컨트롤러
  // SEND 클릭 시 크루원의 이름을 가져옴
  const [inviteBtn, setInviteBtn] = useState(false);
  const [crueName, setCrueName] = useState("");
  const invitePopup = (param) => {
    setInviteBtn(true);
    setCrueName(param);
  };

  const onClose = (param) => {
    const { close, sendStatus } = param;
    setInviteBtn(close);

    if (sendStatus) {
      doSendInvite();
    }
  };

  // SEND 작동 시 USER_GROUP_MAPPING 테이블에 INSERT INTO query 실행
  const doSendInvite = async () => {
    const res = await axios.post("/api/dbConnection", {
      url: "sendInvite",
      id: localLoginId,
      crue: crueName,
    });
    if (res.data?.success) {
      alert("초대장을 전달했습니다");
      getUserList(); // 재조회 -> 렌더링 실시
    } else {
      alert("초대가 안됩니다");
    }
  };

  return (
    <>
      <Header />
      <section className="antialiased bg-gray-100 text-gray-600 h-screen px-4">
        <div className="flex flex-col justify-center h-full">
          <div className="w-full max-w-6xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">
                커뮤니티 회원 목록
              </h2>
            </header>
            <div className="p-3">
              <div className="overflow-x-auto">
                <table className="table-auto w-full cursor-pointer">
                  <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Name</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Field</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">
                          Location
                        </div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Intro</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Invite</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    {userList ? (
                      userList.map((v, i) => {
                        return (
                          <tr key={i}>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-center">{v.user_name}</div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-center">{v.user_field}</div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-center font-medium text-green-500">
                                {v.user_location}
                              </div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-center font-medium">
                                {v.user_intro}
                              </div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-center font-medium">
                                {v.status == 1 ? (
                                  "크루원"
                                ) : v.status == 0 ? (
                                  "초대 대기"
                                ) : (
                                  <button
                                    onClick={() => invitePopup(v.user_name)}
                                    className="bg-red-500 border border-red-500 px-5 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600"
                                  >
                                    초대
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-center">이름</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-center">분야</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-center font-medium text-green-500">
                            지역
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-center font-medium">소개</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-center font-medium">초대</div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {inviteBtn ? <InvitePopup onClose={onClose} /> : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
