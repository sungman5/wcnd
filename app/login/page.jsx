import Link from "next/link";

export default function Login() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
          <div className="p-8 mb-6 bg-white border rounded-sm w-80">
            <h1 className="mb-6 text-lg font-bold text-center">로그인</h1>
            <form action="/api/login" method="POST" className="flex flex-col gap-4">
              <div>
                <label htmlFor="login_email" className="text-[#888] block mb-1">
                  이메일
                </label>
                <input type="email" name="email" className="block w-full px-2 py-2 bg-white border rounded shadow-sm outline-none" id="login_email" />
              </div>
              <div>
                <label htmlFor="login_pwd" className="text-[#888] block mb-1">
                  비밀번호
                </label>
                <input type="password" name="password" className="block w-full px-2 py-2 bg-white border rounded shadow-sm outline-none" id="login_pwd" />
              </div>
              <button type="submit" className="block p-3 text-white rounded shadow-sm hover:bg-cyan-400 bg-cyan-500">
                로그인
              </button>
            </form>
          </div>
          <Link href="/" className="text-sm text-cyan-500">메인화면으로</Link>
        </main>
      );
}