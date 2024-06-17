import { useEffect, useRef } from "react";


export function useRequireLogin(access_token: string | null) {
  const isMounted = useRef(false);
  useEffect(() => {
    if (isMounted.current) {
      return;
    }

    isMounted.current = true;
    if (!access_token) {
      alert("로그인이 필요합니다.");
      window.history.back();
    }
  })
}