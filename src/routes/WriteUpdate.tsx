import { useParams } from "react-router-dom";
import { Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { IWrite } from "../types";
import { getWrite } from "../api";


export default function WriteUpdate() {
  const { wr_id } = useParams();
  const { isLoading, data } = useQuery<IWrite>({
    queryKey: ["write", wr_id],
    queryFn: getWrite
  });
  console.log(data);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return <Text>Update Write</Text>;
}