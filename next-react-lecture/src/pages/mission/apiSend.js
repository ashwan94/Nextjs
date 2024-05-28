import axios from "axios";
import { useEffect, useState } from "react";

const ApiSend = () => {
  /* api 데이터 가져오기 */
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const getData = async () => {
    const res = await axios.get(`/api/restaurant?page=${page}`);
    console.log(res.data);
    if (res.data) {
      //react -> undefined -> rendering -> error
      setList(res.data.items);
      setTotal(res.data.totalCount || 0);
    }
  };

  /* 페이징 처리 : 한번에 데이터 가져와서 for문 돌려서 자르는 경우 없음 */
  const [page, setPage] = useState(1);
  const goPrev = () => {
    //0이하로 내려가는 거 막기
    setPage(page - 1 < 0 ? 0 : page - 1);
  };
  const goReset = () => {
    setPage(1);
  };
  const goNext = () => {
    //total 최대 조회 숫자 이상으로 넘어가지 않도록 막기
    //total = 121
    const pageNumber = (page + 1) * 9;
    setPage(pageNumber > total ? total : page + 1);
  };

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (page > 0) {
      getData();
    }
  }, [page]);

  return (
    <>
      <section>
        <div className="dark:bg-violet-600">
          <div className="container flex flex-col items-center px-4 py-16 pb-24 mx-auto lg:pb-56 md:py-32 md:px-10 lg:px-32 dark:text-gray-50">
            <h1 className="text-5xl font-bold leading-none sm:text-6xl xl:max-w-3xl dark:text-gray-50">
              대전광역시 모범음식점
            </h1>
            <p className="mt-6 mb-8 text-lg sm:mb-12 xl:max-w-3xl dark:text-gray-50">
              대전광역시 문화관광 모범음식점입니다.
              <br />
              2022년 대전광역시 기업매칭 지원사업 결과물입니다.
            </p>
            <div className="flex flex-wrap justify-center">
              <div class="p-6">
                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
                  <div class="overflow-hidden rounded-2xl bg-gray-50">
                    <div class="flex items-center h-[180px] overflow-hidden">
                      <img
                        src="https://thumbnails.production.thenounproject.com/c4UZhX8RJFowtAoq8OZlUjIFmBg=/fit-in/1000x1000/photos.production.thenounproject.com/photos/D0EE41F3-3CB3-4F1E-B6E5-4CCE5B1DCB17.jpg"
                        alt="Hamburger"
                      />
                    </div>

                    {list &&
                      list.map((v, i) => {
                        return (
                          <div class="p-6" key={i}>
                            <div class="flex flex-col items-start justify-between sm:flex-row sm:items-center">
                              <div>
                                <p class="text-gray-400">Fast Food • Burger</p>
                                <h2 class="mt-2 text-lg font-semibold text-gray-800">
                                  {v.restrntNm}
                                </h2>
                              </div>
                            </div>

                            <hr class="mt-4 mb-4" />

                            <div class="flex flex-wrap justify-between">
                              <p class="inline-flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="h-5 w-5 stroke-orange-400"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  stroke-width="2"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>

                                <span class="ml-2 text-gray-600">
                                  10 - 15 Mins
                                </span>
                                <span class="mx-2">•</span>
                                <span class="text-gray-400">1Km</span>
                              </p>

                              <p class="inline-flex items-center text-gray-600">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="h-5 w-5 stroke-yellow-400"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  stroke-width="2"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                  />
                                </svg>

                                <span class="ml-2"> 5.0 (2.5k) </span>
                              </p>
                            </div>
                          </div>
                        );
                      })}
                  </div>

                  <button onClick={goPrev}>이전</button>
                  <button onClick={goReset}>초기화</button>
                  <button onClick={goNext}>다음</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default ApiSend;
