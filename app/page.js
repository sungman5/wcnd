/** @format */

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  const logout = async () => {
    console.log("실행!");
    fetch("/api/logout", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log('useEffect 실행')
  },[])

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24">      
      <Link href={"/login"}>로그인</Link>
      <Link href={"/regist"}>회원가입</Link>
      <button type="button" onClick={logout}>
        로그아웃
      </button>
    </main>
  );
}
