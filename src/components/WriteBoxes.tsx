import { Box } from "@chakra-ui/react";
import { IWrite } from "../types";
import Write from "./Write";
import { serverURL } from "../api";

export default function WriteBoxes ({bo_table, writes}: {bo_table: string, writes: IWrite[]}) {
  const boxWidth = "280px";

  return (
    <>
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
                write.thumbnail.noimg !== "img_not_found"
                ? `${serverURL}/${write.thumbnail.src}`
                : `${process.env.PUBLIC_URL}/no_img.png`
              }
            />
          </Box>
        ))
        : <Box textAlign={"center"} width={boxWidth} padding={"20px"}>
            글이 없습니다.
          </Box>
      }
    </>
  )
}