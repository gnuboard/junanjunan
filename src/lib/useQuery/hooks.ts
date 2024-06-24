import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { IWrite } from "../../types";
import { getWrite, refreshAccessToken } from "../../api";
import { getWriteRetryCallback } from "./callbacks";
import { logout as tokenLogout, setCredentials } from "../../store/auth/tokenSlice";
import { logout as userLogout } from "../../store/auth/loginUserSlice";
import { store } from "../../store/store";


export function getVerifiedToken() {
  const {access_token, refresh_token, access_token_expire_at, refresh_token_expire_at} = store.getState().token;
  let accessToken = access_token;
  let refreshToken = refresh_token;

  function logoutGoback(message: string) {
    store.dispatch(tokenLogout());
    store.dispatch(userLogout());
    window.history.back();
  }

  if (!access_token_expire_at || !refresh_token_expire_at) {
    return {accessToken: null, refreshToken: null};
  }

  const accessTokenExpireAt = new Date(access_token_expire_at);
  const refreshTokenExpireAt = new Date(refresh_token_expire_at);
  const now = new Date();
  const isAccessTokenExpired = accessTokenExpireAt < now;
  const isRefreshTokenExpired = refreshTokenExpireAt < now;
  if (isAccessTokenExpired && !isRefreshTokenExpired) {
    if (refresh_token) {
      refreshAccessToken(refresh_token)
      .then(res => {
        store.dispatch(setCredentials(res));
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
  return {accessToken, refreshToken};
}


export function useGetBoTableParams() {
  const { bo_table } = useParams<{ bo_table: string }>();
  if (!bo_table) {
    throw new Error("bo_table이 필요합니다.");
  }
  return bo_table;
}


export function useGetWritesParams() {
  const { bo_table, wr_id } = useParams<{ bo_table: string, wr_id: string}>();
  if (!bo_table || !wr_id) {
    throw new Error("bo_table, wr_id가 필요합니다.");
  }
  return { bo_table, wr_id };
}


export function useQueryGetWrite(bo_table: string, wr_id: string) {
  const {accessToken, refreshToken} = getVerifiedToken();
  const { isLoading, data, refetch } = useQuery<IWrite>({
    queryKey: ["write", bo_table, wr_id, accessToken, refreshToken],
    queryFn: getWrite,
    retry: (failureCount, error) => getWriteRetryCallback(failureCount, error),
  });
  return { isLoading, data, refetch };
}