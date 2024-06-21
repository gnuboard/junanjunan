import {
  Heading, Textarea, Avatar, HStack,
  Text, VStack, Button, Divider
} from "@chakra-ui/react";
import { PiArrowBendDownRightDuotone } from "react-icons/pi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { get_img_url } from "../../lib/files";
import { ILoginUserData, IRequestCommentUpdate, IWrite } from "../../types";
import { useGetWritesParams, useVerifiedToken } from "../../lib/useQuery/hooks";
import { updateComment } from "../../api";


export default function Comment(
  {index, data, comment, commentRefs, commentInputBoxRefs, commentUpdateBtnRefs, loginUser, toggleUpdateComment}:
  {
    index: number,
    data: IWrite,
    comment: any,
    commentRefs: React.MutableRefObject<(HTMLDivElement | null)[]>,
    commentInputBoxRefs: React.MutableRefObject<(HTMLDivElement | null)[]>,
    commentUpdateBtnRefs: React.MutableRefObject<(HTMLButtonElement | null)[]>,
    loginUser: ILoginUserData,
    toggleUpdateComment: any
  }
) {
  const access_token = useVerifiedToken().accessToken;
  const queryClient = useQueryClient();
  const { bo_table, wr_id } = useGetWritesParams();
  const { register, handleSubmit } = useForm<IRequestCommentUpdate>({
    defaultValues: {
      access_token: access_token ? access_token : "",
      bo_table: bo_table,
      wr_id: wr_id,
      variables: {
        wr_name: comment.wr_name,
        wr_content: comment.save_content,
        wr_password: comment.wr_password,
        wr_secret_checked: false,
        wr_option: comment.wr_option,
        comment_id: comment.wr_id,
      }
    }
  });

  const commentUpdateMutation = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      const commentUpdateBtn = commentUpdateBtnRefs.current[index];
      if(!commentUpdateBtn) return;
      commentUpdateBtn.innerHTML = "수정";
      queryClient.refetchQueries({ queryKey: ["write"]});
      
    },
    onError: (error) => {alert(error);console.log(error);},
  })

  const onSubmitUpdateComment = ({access_token, bo_table, wr_id, variables}: IRequestCommentUpdate) => {
    commentUpdateMutation.mutate({access_token, bo_table, wr_id, variables});
  }

  return (
    <VStack key={index} alignItems={"flex-start"} pl={comment.wr_comment_reply.length*10}>
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
          <HStack>
            <Text ref={el => commentRefs.current[index] = el}>{comment.save_content}</Text>
            <HStack ref={el => commentInputBoxRefs.current[index] = el}>
              <Textarea height={"10px"} {...register("variables.wr_content")}></Textarea>
              <Button size="xs" onClick={handleSubmit(onSubmitUpdateComment)} isLoading={commentUpdateMutation.isPending}>저장</Button>
            </HStack>
            {comment.mb_id === loginUser.mb_id && (
              <Button
                size="xs"
                onClick={() => toggleUpdateComment(index, comment.wr_content)}
                ref={el => commentUpdateBtnRefs.current[index] = el}
              >
                수정
              </Button>
            )}
          </HStack>
        </VStack>
      </HStack>
    </VStack>
  );
}