import { AxiosError } from "axios";


export function getWriteRetryCallback(failureCount: number, error: any) {
  if (error instanceof AxiosError) {
    if (error.response?.data.detail !== "Token has expired") {
      alert(error.response?.data.detail);
      window.history.back();
    }
  }
  return failureCount < 3;
}