import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { IWrite } from "../types";
import { getWrite } from "../api";


export default function WriteUpdate() {
  const loginUserMbID = useSelector((state: any) => state.loginUser).mb_id;
  const navigate = useNavigate();
  const { wr_id } = useParams();
  const { isLoading, data } = useQuery<IWrite>({
    queryKey: ["write", wr_id],
    queryFn: getWrite
  });
  const wrMbId = data ? data.mb_id : "";

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (loginUserMbID !== wrMbId) {
    navigate("/");
  }

  return <Text>Update Write</Text>;
}