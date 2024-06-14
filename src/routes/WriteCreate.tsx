import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { IRequestWriteCreate } from "../types";
import { createWrite } from "../api";
import WriteForm from "./WriteForm";


export default function WirteCreate() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createWrite,
    onSuccess: () => {
      alert("생성 되었습니다.");
      navigate(`/`);
    },
    onError: () => {}
  });

  const onSubmit = ({access_token, variables}: IRequestWriteCreate) => {
    mutation.mutate({access_token, variables});
  }

  return <WriteForm mutation={mutation} onSubmit={onSubmit} wr_id={null} writeData={null} />
}