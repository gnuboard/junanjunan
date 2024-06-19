import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IHtmlContent, IRequestCommentCreate, IRootState } from "../types";
import {
  Box, Image, Skeleton, Heading, FormControl, Textarea, Checkbox,
  Avatar, HStack, Text, VStack, Container, Button, Divider
} from "@chakra-ui/react";
import { PiArrowBendDownRightDuotone } from "react-icons/pi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { get_img_url } from "../lib/files";
import { useGetWritesParams, useQueryGetWrite, useVerifiedToken } from "../lib/useQuery/hooks";
import { useSelector } from "react-redux";
import { createComment, deleteWrite } from "../api";
import { useForm } from "react-hook-form";


const HtmlContent = ({ html }: IHtmlContent) =>
  <Box dangerouslySetInnerHTML={{ __html: html }} marginTop={"10px"} />;


export default function WriteDetail() {
  const loginUser  = useSelector((state: IRootState) => state.loginUser);
  const access_token = useVerifiedToken().accessToken;
  const navigate = useNavigate();
  const { bo_table, wr_id } = useGetWritesParams();
  const { isLoading, data } = useQueryGetWrite(bo_table, wr_id);
  const queryClient = useQueryClient();

  // 댓글
  const { register, handleSubmit, watch, setValue } = useForm<IRequestCommentCreate>({
    defaultValues: {
      access_token: access_token ? access_token : "",
      bo_table: bo_table,
      wr_id: wr_id,
      variables: {
        wr_name: loginUser.mb_id,
        wr_content: "",
        wr_password: "",
        wr_secret_checked: false,
        wr_option: "html1",
        comment_id: 0,
      }
    }
  });

  const isSecretChecked = watch("variables.wr_secret_checked");

  useEffect(() => {
    const wrOption = isSecretChecked ? "secret" : "html1";
    setValue("variables.wr_option", wrOption, { shouldValidate: true });
  }, [isSecretChecked, setValue])

  const deleteWriteMutation = useMutation({
    mutationFn: deleteWrite,
    onSuccess: () => {alert("삭제 되었습니다."); navigate("/")},
    onError: () => {},
  });

  const commentMutation = useMutation({
    mutationFn: createComment,
    onSuccess: () => {queryClient.refetchQueries({ queryKey: ["write"]});},
    onError: (error) => {alert(error);console.log(error);},
  })

  const onSubmitDelWrite = () => {
    deleteWriteMutation.mutate({access_token, bo_table, wr_id});
  }

  const onSubmitCreateComment = ({access_token, bo_table, wr_id, variables}: IRequestCommentCreate) => {
    commentMutation.mutate({access_token, bo_table, wr_id, variables});
  }

  return (
    <VStack
      mt={10}
      px={{ base: 20, lg: 60 }}
      pb={20}
      alignItems={"flex-start"}
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
        {
          loginUser.mb_id === data?.mb_id &&
          <Box>
            <Link to={`/writes/${bo_table}/${wr_id}/update`}>
              <Button margin={"3px"}>수정</Button>
            </Link>
            <Button onClick={onSubmitDelWrite} margin={"3px"}>삭제</Button>
          </Box>
        }
      </HStack>
      {data?.images.map((img) => (
        <Skeleton key={img.bf_source} isLoaded={!isLoading} h="100%" w="100%">
          <Image objectFit={"cover"} src={get_img_url(img.bf_file)}/>
        </Skeleton>
      ))}
      <HtmlContent html={data ? data.wr_content : ""} />
      <Container mt={16} maxW="container.lg" marginX="none">
        <Heading fontSize={"large"} marginBottom={"50px"}>댓글</Heading>
        {data?.comments.map((comment, index) => (
          <VStack alignItems={"flex-start"} pl={comment.wr_comment_reply.length*10}>
          <Divider mb={"10px"} />
          <HStack alignItems={"flex-start"} key={index} mb={"10px"}>
            {comment.wr_comment_reply.length > 0 && <PiArrowBendDownRightDuotone />}
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
          </VStack>
        ))}
        <Divider mt={5} />
        <FormControl mt={5}>
          <Textarea {...register("variables.wr_content", { required: true })} required />
          <HStack justifyContent={"flex-end"} mt={"10px"}>
            <Checkbox
              {...register("variables.wr_secret_checked")}
              mr={"10px"}
              isChecked={isSecretChecked}
            >
              비밀댓글
            </Checkbox>
            <Button
              type="submit"
              onClick={handleSubmit(onSubmitCreateComment)}
              isLoading={commentMutation.isPending}
              colorScheme={"blue"}
              size="md"
            >
              댓글등록
            </Button>
          </HStack>
        </FormControl>
      </Container>
    </VStack>
  );
}