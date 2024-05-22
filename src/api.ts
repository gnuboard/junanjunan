import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";


const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1"
})


export const getWrites = async () =>
  axiosInstance.get("/boards/free/writes").then(res => res.data);


export const getWrite = async ({ queryKey }: QueryFunctionContext) =>{
  const [_, wr_id] = queryKey;
  return axiosInstance.get(`/boards/free/writes/${wr_id}`).then(res => res.data);
}