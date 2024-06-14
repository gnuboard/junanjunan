import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { IRequestWriteCreate } from "../types";
import { createWrite } from "../api";
import WriteForm from "./WriteForm";
import { useGetBoTableParams } from "../lib/useQuery/hooks";


export default function WirteCreate() {
  const navigate = useNavigate();
  const bo_table = useGetBoTableParams();
  const mutation = useMutation({
    mutationFn: createWrite,
    onSuccess: () => {
      alert("생성 되었습니다.");
      navigate(`/`);
    },
    onError: () => {}
  });

  const onSubmit = ({access_token, bo_table, variables}: IRequestWriteCreate) => {
    mutation.mutate({access_token, bo_table, variables});
  }

  return <WriteForm mutation={mutation} onSubmit={onSubmit} bo_table={bo_table} wr_id={null} writeData={null} />
}