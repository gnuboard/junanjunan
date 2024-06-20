import {
  Heading, Textarea, Avatar, HStack,
  Text, VStack, Button, Divider
} from "@chakra-ui/react";
import { PiArrowBendDownRightDuotone } from "react-icons/pi";
import { get_img_url } from "../../lib/files";
import { ILoginUserData, IWrite } from "../../types";


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
              <Textarea height={"10px"} defaultValue={comment.save_content}></Textarea>
              <Button size="xs">저장</Button>
            </HStack>
            {comment.mb_id === loginUser.mb_id && (
              <Button
                size="xs"
                onClick={() => toggleUpdateComment(index)}
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