import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Text } from "@chakra-ui/react";
import { useGetWritesParams, useQueryGetWrite } from "../lib/useQuery/hooks";
import { useMutation } from "@tanstack/react-query";
import { IRequestWriteUpdate } from "../types";
import { updateWrite } from "../api";
import WriteForm from "./WriteForm";


export default function WriteUpdate() {
  const loginUserMbID = useSelector((state: any) => state.loginUser).mb_id;
  const navigate = useNavigate();
  const { bo_table, wr_id } = useGetWritesParams();
  const { data } = useQueryGetWrite(bo_table, wr_id);

  const mutation = useMutation({
    mutationFn: updateWrite,
    onSuccess: () => {alert("저장되었습니다."); navigate(`/writes/${wr_id}`);},
    onError: () => {}
  });
  const wrMbId = data ? data.mb_id : "";

  if (loginUserMbID !== wrMbId) {
    navigate("/");
    return <Text>Loading...</Text>;
  }

  const onSubmit = ({access_token, wr_id, variables}: IRequestWriteUpdate) => {
    mutation.mutate({access_token, wr_id, variables});
  }

  return <WriteForm mutation={mutation} onSubmit={onSubmit} wr_id={wr_id} writeData={data}/>
}