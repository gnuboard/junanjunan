import { useQuery } from "@tanstack/react-query";
import { IRootState, IWrite } from "../../types";
import { getWrite, refreshAccessToken } from "../../api";
import { getWriteRetryCallback } from "./callbacks";
import { useDispatch, useSelector } from "react-redux";
import { logout as tokenLogout, setCredentials } from "../../store/auth/tokenSlice";
import { logout as userLogout } from "../../store/auth/loginUserSlice";
import { useEffect, useRef } from "react";


export function useVerifiedToken() {
  const {access_token, refresh_token, access_token_expire_at, refresh_token_expire_at} = useSelector((state: IRootState) => state.token);
  const dispatch = useDispatch();
  const isMounted = useRef(false);
  let accessToken = access_token;
  let refreshToken = refresh_token;

  function logoutGoback(message: string) {
    alert(message);
    dispatch(tokenLogout());
    dispatch(userLogout());
    window.history.back();
  }

  useEffect(() => {
    if (isMounted.current) {
      return;
    }
    isMounted.current = true;

    if (access_token_expire_at && refresh_token_expire_at) {
      const accessTokenExpireAt = new Date(access_token_expire_at);
      const refreshTokenExpireAt = new Date(refresh_token_expire_at);
      const now = new Date();
      const isAccessTokenExpired = accessTokenExpireAt < now;
      const isRefreshTokenExpired = refreshTokenExpireAt < now;
      if (isAccessTokenExpired && !isRefreshTokenExpired) {
        if (refresh_token) {
          refreshAccessToken(refresh_token)
          .then(res => {
            dispatch(setCredentials(res));
            accessToken = res.access_token;
            refreshToken = res.refresh_token;
          })
          .catch(e =>{
              if (e.response?.data.detail === "Invalid refresh token"){
                console.log("catch: refresh_token:", refresh_token?.slice(-5));
                logoutGoback("서버 검증 리프레쉬 토큰 만료. 로그인이 필요합니다.");
              } else {
                console.log(e);
              }
            }
          );
        } else {
          logoutGoback("리프레쉬 토큰이 없습니다. 로그인이 필요합니다.");
        }
      } else if (isRefreshTokenExpired) {
        logoutGoback("클라이언트 검증 리프레쉬 토큰 만료. 로그인이 필요합니다.");
      }
    }
  }, []);
  return {accessToken, refreshToken};
}


export function useQueryGetWrite(wr_id: number) {
  const {accessToken, refreshToken} = useVerifiedToken();
  const { isLoading, data, refetch } = useQuery<IWrite>({
    queryKey: ["write", wr_id, accessToken, refreshToken],
    queryFn: getWrite,
    retry: (failureCount, error) => getWriteRetryCallback(failureCount, error),
  });
  return { isLoading, data, refetch };
}