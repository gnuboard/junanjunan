import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api";

export default function useMember() {
    const { isLoading, data, isError } = useQuery({
        queryKey: ["me"],
        queryFn: getMe,
        retry: false,
    });

    return {
        memberLoading: isLoading,
        member: data,
        isLoggedIn: !isError,
    }
}