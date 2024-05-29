import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api";
import { useSelector } from "react-redux";
import { IRootState } from "../types";

export default function useMember() {
    const access_token = useSelector((state: IRootState) => state.token.access_token);
    const { isLoading, data, isError } = useQuery({
        queryKey: ["me", access_token],
        queryFn: getMe,
        retry: false,
    });

    return {
        memberLoading: isLoading,
        member: data,
        isLoggedIn: !isError,
    }
}