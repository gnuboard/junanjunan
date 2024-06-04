import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { 
  Button,
  Container, FormControl, FormLabel, Input, InputGroup,
  InputLeftAddon, Text, Textarea, VStack
 } from "@chakra-ui/react";
import { useQueryGetWrite } from "../lib/useQuery/hooks";


export default function WriteUpdate() {
  const loginUserMbID = useSelector((state: any) => state.loginUser).mb_id;
  const navigate = useNavigate();
  const { wr_id } = useParams();
  const { data } = useQueryGetWrite(Number(wr_id));
  const wrMbId = data ? data.mb_id : "";

  if (loginUserMbID !== wrMbId) {
    navigate("/");
    return <Text>Loading...</Text>;
  }

  return (
    <Container mt={10} px={{ base: 10, lg: 40 }}>
      <VStack>
        <FormControl>
          <FormLabel>제목</FormLabel>
          <Input required type="text" value={data?.wr_subject} />
        </FormControl>
        <FormControl>
          <Textarea required value={data?.wr_content} />
        </FormControl>
        <FormControl>
          <InputGroup>
            <InputLeftAddon children="Link1" />
            <Input required type="text" value={data?.wr_link1} />
          </InputGroup>
        </FormControl>
        <FormControl>
          <InputGroup>
            <InputLeftAddon children="Link2" />
            <Input required type="text" value={data?.wr_link2} />
          </InputGroup>
        </FormControl>
        <Button colorScheme={"blue"} size="lg" w="100%">저장하기</Button>
      </VStack>
    </Container>
  );
}