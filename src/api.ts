import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import {
  IUsernmaeLoginVariables, IGetMe, IRequestWriteUpdate,
  IRequestWriteCreate,
  IRequestWriteDelete,
  ISignUpForm
} from "./types";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1"
})


export const getWrites = async () =>
  axiosInstance.get("/boards/free/writes").then(res => res.data);


export const getWrite = async ({ queryKey }: QueryFunctionContext) =>{
  const [_, bo_table, wr_id, access_token] = queryKey;
  const url = `/boards/${bo_table}/writes/${wr_id}`;
  let headers = {};
  if (access_token) {
    headers = { headers: { Authorization: `Bearer ${access_token}` } };
  }
  return axiosInstance.get(url, headers)
  .then(res => res.data)
  .catch(error => {throw error;});
}


export const getMe = async ({ queryKey }: IGetMe) => {
  const url = "/members/me";
  const [, access_token] = queryKey;
  const headers = { headers: { Authorization: `Bearer ${access_token}` } };
  return axiosInstance.get(url, headers).then(res => res.data);
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

  return axiosInstance.post(
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


export const createWrite = async ({access_token, variables}: IRequestWriteCreate) =>{
  const headers = { headers: { Authorization: `Bearer ${access_token}` } };
  return axiosInstance.post(
    "/boards/free/writes",
    variables,
    headers,
  )
  .then(res => res.data)
  .catch(error => {
    throw error;
  });
}


export const updateWrite = async ({access_token, wr_id, variables}: IRequestWriteUpdate) =>{
  const headers = { headers: { Authorization: `Bearer ${access_token}` } };
  return axiosInstance.put(
    `/boards/free/writes/${wr_id}`,
    variables,
    headers,
  )
  .then(res => res.data)
  .catch(error => {
    throw error;
  });
}


export const deleteWrite = async ({access_token, wr_id}: IRequestWriteDelete) =>{
  const headers = { headers: { Authorization: `Bearer ${access_token}` } };
  return axiosInstance.delete(
    `/boards/free/writes/${wr_id}`,
    headers,
  )
  .then(res => res.data)
  .catch(error => {
    throw error;
  });
}