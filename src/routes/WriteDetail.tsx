import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IHtmlContent, IRequestCommentCreate, IRootState } from "../types";
import {
  Box, Image, Skeleton, Heading, FormControl, Textarea, Checkbox,
  Avatar, HStack, Text, VStack, Container, Button, Divider
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { get_img_url } from "../lib/files";
import { useGetWritesParams, useQueryGetWrite, useVerifiedToken } from "../lib/useQuery/hooks";
import { useSelector } from "react-redux";
import { createComment, deleteWrite } from "../api";
import { useForm } from "react-hook-form";
import Comment from "../components/Write/Comment";


const HtmlContent = ({ html }: IHtmlContent) =>
  <Box dangerouslySetInnerHTML={{ __html: html }} marginTop={"10px"} />;


export default function WriteDetail() {
  const loginUser  = useSelector((state: IRootState) => state.loginUser);
  const access_token = useVerifiedToken().accessToken;
  const navigate = useNavigate();
  const { bo_table, wr_id } = useGetWritesParams();
  const { isLoading, data } = useQueryGetWrite(bo_table, wr_id);
  const queryClient = useQueryClient();
  const commentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const commentInputBoxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const commentUpdateBtnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    commentRefs.current.forEach(comment => {
      if (comment) {
        comment.hidden = false;
      }
    })
    commentInputBoxRefs.current.forEach(box => {
      if (box) {
        box.style.display = "none";
      }
    })
}, [data]);

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

  const toggleUpdateComment = (index: number) => {
    const comment = commentRefs.current[index];
    const commentInputBox = commentInputBoxRefs.current[index];
    const commentUpdateBtn = commentUpdateBtnRefs.current[index];
    if (!comment || !commentInputBox || !commentUpdateBtn) return;
    comment.hidden = !comment.hidden;
    commentInputBox.style.display = commentInputBox.style.display === "none" ? "flex": "none";
    commentUpdateBtn.innerHTML = commentUpdateBtn.innerHTML === "수정" ? "취소" : "수정";
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
          <Comment 
            key={index}
            index={index}
            data={data}
            comment={comment}
            commentRefs={commentRefs}
            commentInputBoxRefs={commentInputBoxRefs}
            commentUpdateBtnRefs={commentUpdateBtnRefs}
            loginUser={loginUser}
            toggleUpdateComment={toggleUpdateComment}
          />
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