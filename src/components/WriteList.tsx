import { Box, Heading, VStack } from "@chakra-ui/react";
import Write from "../components/Write";
import { IWrite } from "../types";


function getBoardAttr(bo_table: string) {
  switch (bo_table) {
    case "free":
      return {boardName: "자유게시판", boardBackgroundColor: "blue"};
    case "gallery":
      return {boardName: "갤러리", boardBackgroundColor: "green"};
    case "notice":
      return {boardName: "공지사항", boardBackgroundColor: "red"};
    case "qa":
      return {boardName: "Q&A", boardBackgroundColor: "purple"};
    default:
      return {boardName: "게시판", boardBackgroundColor: "gray"};
  }
}


export default function WriteList({bo_table, writes}: {bo_table: string, writes: IWrite[] | undefined}) {
  writes = writes ? writes.slice(0, 5) : [];
  const {boardName, boardBackgroundColor} = getBoardAttr(bo_table);
  const boxWidth = "280px";
  return (
    <VStack width={boxWidth}>
      <Heading
        width={"100%"}
        height={"30px"}
        size="md"
        color={"white"}
        backgroundColor={boardBackgroundColor}
        alignContent={"center"}
        textAlign={"center"}
      >
        {boardName}
      </Heading>
      {
        writes.length > 0
        ? writes.map((write) => (
          <Box width={boxWidth} key={write.wr_id} borderWidth={"1px"} padding={"20px"}>
            <Write
              bo_table={bo_table}
              wr_id={write.wr_id}
              wr_subject={write.wr_subject}
              wr_name={write.wr_name}
              wr_comment={write.wr_comment}
              wr_hit={write.wr_hit}
              img={
                write.images[0]
                ? "http://127.0.0.1:8000/"+ write.images[0].bf_file
                : `${process.env.PUBLIC_URL}/no_img.png`
              }
            />
          </Box>
        ))
        : <Box textAlign={"center"} width={boxWidth} padding={"20px"}>
            글이 없습니다.
          </Box>
      }
    </VStack>
  );
}