import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import { getNavigation } from "./lib/useNavigationSetup";
import {
  IUsernmaeLoginVariables, IGetMe, IRequestWriteUpdate, IRequestWriteCreate,
  IRequestWriteDelete, ISignUpForm, IUploadFiles, IRequestCommentCreate
} from "./types";
import { store } from "./store/store";
import { logout as tokenLogout, setCredentials } from "./store/auth/tokenSlice";
import { logout as userLogout } from "./store/auth/loginUserSlice";


export const serverURL = process.env.REACT_APP_SERVER_URL;

export const axiosInstance = axios.create({
  baseURL: `${serverURL}/api/v1`
})


async function handleLogoutAndRedirect(): Promise<void> {
  store.dispatch(tokenLogout());
  store.dispatch(userLogout());
  delete axiosInstance.defaults.headers.common["Authorization"];
  alert("로그인이 필요합니다.");
  const navigate = await getNavigation();
  navigate('/');
}


axiosInstance.interceptors.request.use(
  (config) => {
    const {access_token, refresh_token, access_token_expire_at, refresh_token_expire_at} = store.getState().token;
    let accessToken = access_token;
    let refreshToken = refresh_token;

    if (!access_token_expire_at || !refresh_token_expire_at || !accessToken || !refreshToken) {
      return config;
    }

    if (!config.headers["Authorization"]) {
      axiosInstance.defaults.headers.common["Authorization"] = 'Bearer ' + accessToken;
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },

  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      const refreshToken = store.getState().token.refresh_token;
      if (!refreshToken) {
        await handleLogoutAndRedirect();
        return Promise.reject(error);
      }

      try {
        const response = await refreshAccessToken(refreshToken);
        const { access_token } = response;
        axiosInstance.defaults.headers.common["Authorization"] = 'Bearer ' + access_token;
        originalRequest.headers["Authorization"] = 'Bearer ' + access_token;
        store.dispatch(setCredentials(response));  
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        await handleLogoutAndRedirect();
      }
    }
    return Promise.reject(error);
  }
);

export const getNewWrites = async () =>
  axiosInstance.get("/board-new/writes").then(res => res.data);


export const getBoardWrites = async ({ queryKey }: QueryFunctionContext) =>{
  const [_, boTable] = queryKey;
  return axiosInstance.get(`/boards/${boTable}/writes`)
    .then(res => res.data)
    .catch(error => {throw error;});;
}


export const getWrite = async ({ queryKey }: QueryFunctionContext) =>{
  const [_, bo_table, wr_id] = queryKey;
  const url = `/boards/${bo_table}/writes/${wr_id}`;
  let headers = {};
  return axiosInstance.get(url, headers)
  .then(res => res.data)
  .catch(error => {throw error;});
}


export const getMe = async ({ queryKey }: IGetMe) => {
  const url = "/members/me";
  return axiosInstance.get(url).then(res => res.data);
}


export const signUp = async (variables: ISignUpForm) =>{
  return axiosInstance.post(
    "/members",
    variables,
  )
  .then(res => res.data)
  .catch(error => {
    throw error;
  });
}


export const usernameLogIn = async ({username, password}: IUsernmaeLoginVariables) =>{
  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);

  return axiosInstance.post(
    "/token",
    params,
    { headers: {"Content-Type": "application/x-www-form-urlencoded"} }
  )
  .then(res => res.data)
  .catch(error => {
    console.error(error);
    throw error;
  });
}


export const refreshAccessToken = async (refreshToken: string) =>{
  const params = new URLSearchParams();
  params.append("refresh_token", refreshToken);

  const refreshAPI = axios.create({
    baseURL: `${serverURL}/api/v1`,
  })

  return refreshAPI.post(
    "/token/refresh",
    params,
    { headers: {"Content-Type": "application/x-www-form-urlencoded"} }
  )
  .then(res => res.data)
  .catch(error => {
    console.error(error);
    throw error;
  });
}


export const createWrite = async ({bo_table, variables}: IRequestWriteCreate) =>{
  return axiosInstance.post(
    `/boards/${bo_table}/writes`,
    variables,
  )
  .then(res => res.data)
  .catch(error => {
    throw error;
  });
}


export const updateWrite = async ({bo_table, wr_id, variables}: IRequestWriteUpdate) =>{
  return axiosInstance.put(
    `/boards/${bo_table}/writes/${wr_id}`,
    variables,
  )
  .then(res => res.data)
  .catch(error => {
    throw error;
  });
}


export const uploadFiles = async (uploadData: IUploadFiles) =>{
  const { bo_table, wr_id, files } = uploadData;
  const formData = new FormData();
  const headers = {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  }

  Object.entries(files).forEach(([key, value]) => {
    formData.append(key, value);
  });

  return axiosInstance.post(
    `/boards/${bo_table}/writes/${wr_id}/files`,
    formData,
    headers,
  )
  .then(res => res.data)
  .catch(error => {
    throw error;
  });
}


export const deleteWrite = async ({bo_table, wr_id}: IRequestWriteDelete) =>{
  return axiosInstance.delete(
    `/boards/${bo_table}/writes/${wr_id}`,
  )
  .then(res => res.data)
  .catch(error => {
    throw error;
  });
}


export const createComment = async ({bo_table, wr_id, variables}: IRequestCommentCreate) =>{
  return axiosInstance.post(
    `/boards/${bo_table}/writes/${wr_id}/comments`,
    variables,
  )
  .then(res => res.data)
  .catch(error => {
    throw error;
  });
}


export const updateComment = async ({bo_table, wr_id, variables}: IRequestCommentCreate) =>{
  return axiosInstance.put(
    `/boards/${bo_table}/writes/${wr_id}/comments`,
    variables,
  )
  .then(res => res.data)
  .catch(error => {
    throw error;
  });
}