import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import { IUsernmaeLoginVariables, IGetMe } from "./types";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1"
})


export const getWrites = async () =>
  axiosInstance.get("/boards/free/writes").then(res => res.data);


export const getWrite = async ({ queryKey }: QueryFunctionContext) =>{
  const [_, wr_id] = queryKey;
  return axiosInstance.get(`/boards/free/writes/${wr_id}`).then(res => res.data);
}


export const getMe = async ({ queryKey }: IGetMe) => {
  const url = "/members/me";
  const [, access_token] = queryKey;
  const headers = { headers: { Authorization: `Bearer ${access_token}` } };
  return axiosInstance.get(url, headers).then(res => res.data);
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