import { useQuery } from "@tanstack/react-query";
import { IRootState, IWrite } from "../../types";
import { getWrite } from "../../api";
import { getWriteRetryCallback } from "./callbacks";
import { useSelector } from "react-redux";


export function useQueryGetWrite(wr_id: number) {
  const access_token = useSelector((state: IRootState) => state.token.access_token);
  const { isLoading, data, refetch } = useQuery<IWrite>({
    queryKey: ["write", wr_id, access_token],
    queryFn: getWrite,
    retry: (failureCount, error) => getWriteRetryCallback(failureCount, error),
  });
  return { isLoading, data, refetch };
}