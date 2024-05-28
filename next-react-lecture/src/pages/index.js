import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  /* a태그: href="#" >> 페이지전체렌더링 --> e.preventDefault 
     Link태그 / useRouter >> 페이지 이동
     >> 전체 페이지를 로드하지 않고 부분 업데이트
  */
  const router = useRouter();
  console.log(router);

  return (
    <>
      <p>lecture 메뉴</p>
      <ul>
        <li>
          <Link href="/lecture/apiSend">API 통신 설명</Link>
        </li>
        <li>
          <Link href="/lecture/dbConnetion">DB dbConnection 페이지</Link>
        </li>
      </ul>

      <p>mission 메뉴</p>
      <ul>
        <li onClick={() => router.push("/mission/apiSend")}>
          <span>API 통신 미션</span>
        </li>
      </ul>
    </>
  );
}
