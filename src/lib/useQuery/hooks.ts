import { useQuery } from "@tanstack/react-query";
import { IWrite } from "../../types";
import { getWrite } from "../../api";
import { getWriteRetryCallback } from "./callbacks";


export function useQueryGetWrite(wr_id: number) {
  const { isLoading, data } = useQuery<IWrite>({
    queryKey: ["write", wr_id],
    queryFn: getWrite,
    retry: (failureCount, error) => getWriteRetryCallback(failureCount, error),
  });
  return { isLoading, data };
}