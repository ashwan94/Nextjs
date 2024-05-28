import Community from "../components/Community";
import Developer from "../components/Developer";
import About from "../components/About";
import Layout from "../components/Layout/Layout";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  
  return (
    <Layout>
      <About />
      <Community />
      <Developer />
      
    </Layout>
  );
}
