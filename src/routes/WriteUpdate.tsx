import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { 
  Button,
  Container, FormControl, FormLabel, Input, InputGroup,
  InputLeftAddon, Text, Textarea, VStack
 } from "@chakra-ui/react";
import { useQueryGetWrite } from "../lib/useQuery/hooks";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { IRequestWriteUpdate, IRootState } from "../types";
import { updateWrite } from "../api";


export default function WriteUpdate() {
  const loginUserMbID = useSelector((state: any) => state.loginUser).mb_id;
  const access_token = useSelector((state: IRootState) => state.token).access_token;
  const navigate = useNavigate();
  const { wr_id } = useParams();
  const { data } = useQueryGetWrite(Number(wr_id));
  const { register, handleSubmit } = useForm<IRequestWriteUpdate>({
    defaultValues: {
      access_token: access_token ? access_token : "",
      wr_id: wr_id,
      variables: {
        wr_subject: data?.wr_subject,
        wr_content: data?.wr_content,
        wr_link1: data?.wr_link1,
        wr_link2: data?.wr_link2
      }
    }
  });
  const mutation = useMutation({
    mutationFn: updateWrite,
    onSuccess: () => {},
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

  return (
    <Container mt={10} px={{ base: 10, lg: 40 }}>
      <VStack as="form" onSubmit={handleSubmit(onSubmit)}>
        <Input {...register("access_token")} required type="text" hidden/>
        <Input {...register("wr_id")} required type="text" hidden/>
        <FormControl>
          <FormLabel>제목</FormLabel>
          <Input
           {...register("variables.wr_subject", { required: true })}
           required
           type="text"
          />
        </FormControl>
        <FormControl>
          <Textarea
           {...register("variables.wr_content", { required: true })}
           required
          />
        </FormControl>
        <FormControl>
          <InputGroup>
            <InputLeftAddon children="Link1" />
            <Input
              {...register("variables.wr_link1")}
              type="text"
            />
          </InputGroup>
        </FormControl>
        <FormControl>
          <InputGroup>
            <InputLeftAddon children="Link2" />
            <Input
              {...register("variables.wr_link2")}
              type="text"
            />
          </InputGroup>
        </FormControl>
        {mutation.isError? <Text color={"red.500"}>에러 발생</Text> : null}
        <Button
          type="submit"
          isLoading={mutation.isPending}
          colorScheme={"blue"}
          size="lg"
          w="100%"
        >
          저장하기
        </Button>
      </VStack>
    </Container>
  );
}