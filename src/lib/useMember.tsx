import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api";
import { getVerifiedToken } from "./useQuery/hooks";

export default function useMember() {
    const access_token = getVerifiedToken().accessToken;
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