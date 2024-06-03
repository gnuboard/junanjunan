import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { getWrite } from "../api";
import { IHtmlContent, IWrite } from "../types";
import {
  Box, Grid, Image, GridItem, Skeleton, Heading,
  Avatar, HStack, Text, VStack, Container, Button
} from "@chakra-ui/react";
import { get_img_url } from "../lib/files";
import { AxiosError } from "axios";


const HtmlContent = ({ html }: IHtmlContent) =>
  <Box dangerouslySetInnerHTML={{ __html: html }} marginTop={"10px"} />;


export default function WriteDetail() {
  const { wr_id } = useParams();
  const { isLoading, data } = useQuery<IWrite>({
    queryKey: ["write", wr_id],
    queryFn: getWrite,
    retry: (failureCount, error) => {
      if (error instanceof AxiosError) {
        alert(error.response?.data.detail);
        window.history.back();
      }
      return failureCount < 3;
    },
  });
  return (
    <Box
      mt={10}
      px={{ base: 10, lg: 40 }}
    >
      <Heading fontSize={"x-large"} marginBottom={"10px"}>{ data?.wr_subject }</Heading>
      <HStack justifyContent={"space-between"}>
        <HStack>
          <Avatar name={data?.wr_name} size={"md"} src={data ? get_img_url(data.mb_image_path) : ""} />
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
        <Link to={`/writes/${wr_id}/update`}>
          <Button>수정</Button>
        </Link>
      </HStack>
      <Grid
        mt={8}
        rounded="xl"
        overflow={"hidden"}
        gap={2}
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
      <HtmlContent html={data ? data.wr_content : ""} />
      <Container mt={16} maxW="container.lg" marginX="none">
        <Heading fontSize={"large"} marginBottom={"50px"}>댓글</Heading>
        <Grid gap={10}>
          {data?.comments.map((comment, index) => (
            <HStack alignItems={"flex-start"} key={index}>
              <Avatar
                name={comment.wr_name}
                src={get_img_url(comment.mb_image_path)}
                size="md"
              />
              <VStack align={"flex-start"}>
                <HStack>
                  <Avatar name={data?.wr_name} size={"2xs"} src={data ? get_img_url(data.mb_icon_path) : ""} />
                  <Heading fontSize={"md"}>{comment.wr_name}</Heading>
                  <Text>{comment.wr_datetime}</Text>
                </HStack>
                <Text>{comment.save_content}</Text>
              </VStack>
            </HStack>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}