/** @format */

import Link from "next/link";

export default function Regist() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      <div className="p-8 mb-6 bg-white border rounded-sm w-80">
        <h1 className="mb-6 text-lg font-bold text-center">회원가입</h1>
        <form action="/api/regist" method="post" className="flex flex-col gap-4">
          <div>
            <label className="block w-full" htmlFor="regist_email">
              이메일
            </label>
            <input className="block w-full px-2 py-2 bg-white border rounded shadow-sm outline-none" type="email" name="email" id="regist_email" />
          </div>
          <div>
            <label className="block w-full" htmlFor="regist_username">
              이름&#40;닉네임&#41;
            </label>
            <input className="block w-full px-2 py-2 bg-white border rounded shadow-sm outline-none" type="text" name="username" id="regist_username" />
          </div>
          <div>
            <label className="block w-full" htmlFor="regist_pwd">
              비밀번호
            </label>
            <input className="block w-full px-2 py-2 bg-white border rounded shadow-sm outline-none" type="password" name="password" id="regist_pwd" />
          </div>
          <button type="submit" className="p-4 font-bold text-white bg-cyan-500">
            가입하기
          </button>
        </form>
      </div>
      <Link href="/" className="text-sm text-cyan-500">메인화면으로</Link>
    </main>
  );
}
