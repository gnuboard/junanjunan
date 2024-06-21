import { FaRegHeart } from "react-icons/fa";
import {
  Box, Button, Grid,
  Image, Text, VStack, useColorModeValue
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IWriteProps } from "../../types";


export default function Write({bo_table, wr_id, wr_subject, wr_name, wr_comment, wr_hit, img}: IWriteProps) {
  const gray = useColorModeValue("gray.600", "gray.300");
  return (
    <Link to={`/writes/${bo_table}/${wr_id}`}>
      <VStack alignItems={"flex-start"}>
        <Box position="relative" overflow={"hidden"} mb={3} rounded="2xl">
          <Image minH="280" src={img} />
          <Button
            variant={"unstyled"}
            position="absolute"
            top={0}
            right={0}
            color="white"
          >
            <FaRegHeart size="20px" />
          </Button>
        </Box>
        <Box>
          <Grid gap={2} templateColumns={"6fr 1fr"}>
            <Text display={"block"} as="b" noOfLines={1} fontSize="md">
              {wr_subject}
            </Text>
          </Grid>
          <Text fontSize={"sm"} color={gray}>
            {wr_name}
          </Text>
        </Box>
        <Text fontSize={"sm"} color={gray}>
          <Text as="b">댓글 {wr_comment}</Text> / 조회수 {wr_hit}
        </Text>
      </VStack>
    </Link>
  );
}