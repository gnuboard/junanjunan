import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { 
  Container, FormControl, FormLabel, Input, InputGroup,
  InputLeftAddon, Text, Textarea, VStack, Button
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { IRequestWriteCreate, IRootState } from "../types";
import { createWrite } from "../api";


export default function WirteCreate() {
  const access_token = useSelector((state: IRootState) => state.token).access_token;
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<IRequestWriteCreate>({
    defaultValues: {
      access_token: access_token ? access_token : "",
    }
  });

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

  return (
    <Container mt={10} px={{ base: 10, lg: 40 }}>
      <VStack as="form" onSubmit={handleSubmit(onSubmit)}>
        <Input {...register("access_token")} required type="text" hidden/>
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