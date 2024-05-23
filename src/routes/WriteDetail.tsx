import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getWrite } from "../api";
import { IWrite } from "../types";
import {
  Box, Grid, Image, GridItem, Skeleton, Heading,
  Avatar, HStack, Text, VStack
} from "@chakra-ui/react";


function get_img_url (bf_file: string) {
  return `http://localhost:8000/${bf_file}`;
}

export default function WriteDetail() {
  const { wr_id } = useParams();
  const { isLoading, data } = useQuery<IWrite>({
    queryKey: ["write", wr_id],
    queryFn: getWrite
  });
  return (
    <Box
      mt={10}
      px={{ base: 10, lg: 40 }}
    >
      <Heading fontSize={"x-large"} marginBottom={"10px"}>{ data?.wr_subject }</Heading>
      <HStack>
        <Avatar name={data?.wr_name} size={"md"} src={data?.wr_email} />
        <VStack align={"flex-start"}>
          <Heading fontSize={"medium"}>{data?.wr_name}({data?.wr_ip})</Heading>
          <HStack>
            <Text>조회수 {data?.wr_hit}</Text>
            <Text>/</Text>
            <Text>
              댓글 {data?.wr_comment}
            </Text>
            <Text>/</Text>
            <Text>
              {data?.wr_datetime}
            </Text>
          </HStack>
        </VStack>
      </HStack>
      <Grid
        mt={8}
        rounded="xl"
        overflow={"hidden"}
        gap={2}
        height="100vh"
        templateRows={"1fr 1fr"}
        templateColumns={"repeat(4, 1fr)"}
      >
        {data?.images.map((img, index) => (
          <GridItem
            colSpan={index === 0 ? 2 : 1}
            rowSpan={index === 0 ? 2 : 1}
            overflow={"hidden"}
            key={img.bf_source}
            gridColumn={"span 4"}
          >
            <Skeleton isLoaded={!isLoading} h="100%" w="100%">
              <Image w="100%" h="100%" objectFit={"cover"} src={get_img_url(img.bf_file)}/>
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
      <HStack width={"40%"} justifyContent={"space-between"} mt={10}>
        <VStack alignItems={"flex-start"}>
          <Text>
            {data?.wr_content}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
}