import { create } from "zustand";

export const useUserStore = create((set) => ({
    // 상태
    isLoginStatus: false,
    // 액션
    // 토큰이 있으면 로그인 상태를 true로 바꾸고, 없으면 false로 바꾼다.
    setIsLoginStatus: (token) => set()
}))