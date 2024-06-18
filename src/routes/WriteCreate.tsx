import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { IFiles, IRequestWriteCreate } from "../types";
import { createWrite, uploadFiles } from "../api";
import WriteForm from "../components/Write/WriteForm";
import { useGetBoTableParams, useVerifiedToken } from "../lib/useQuery/hooks";
import { useState } from "react";


export default function WirteCreate() {
  const { accessToken } = useVerifiedToken();
  const [dataContainer, setDataContainer] = useState<IFiles>({file1: null, file2: null});
  const navigate = useNavigate();
  const bo_table = useGetBoTableParams();
  const mutation = useMutation({
    mutationFn: createWrite,
    onSuccess: (data) => {
      const wrId = data.wr_id;
      if (data.file1 !== null && data.file2 !== null) {
        uploadFiles({
          access_token: accessToken,
          bo_table: bo_table,
          wr_id: wrId,
          files: dataContainer
        })
        .catch(error => alert("파일 업로드 과정에서 에러가 발생했습니다:\n" + error));
      }
      alert("생성 되었습니다.");
      navigate(`/`);
    },
    onError: () => {}
  });

  const onSubmit = ({access_token, bo_table, variables}: IRequestWriteCreate) => {
    mutation.mutate({access_token, bo_table, variables});
  }

  return <WriteForm setDataContainer={setDataContainer} mutation={mutation} onSubmit={onSubmit} bo_table={bo_table} wr_id={null} writeData={null} />
}