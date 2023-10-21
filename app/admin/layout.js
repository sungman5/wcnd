/** @format */

import Link from "next/link";

export default function AdminLayout({ children }) {
  return (
    <main className="container bg-white">
      <header className="flex justify-between py-4 mb-8 border-b">
        <h1>
          <Link href={"/admin"} className="font-bold">글관리 및 대시보드</Link>
        </h1>
        <Link href="/admin/write" className="hover:underline">글쓰기</Link>
      </header>
      {children}
    </main>
  );
}
