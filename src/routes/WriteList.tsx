import { useQuery } from "@tanstack/react-query"
import { Box, Grid } from "@chakra-ui/react";
import { getBoardWrites, serverURL } from "../api"
import { useGetBoTableParams } from "../lib/useQuery/hooks"
import Write from "../components/Write";
import { IWrite } from "../types";


export default function WriteList () {
  const bo_table = useGetBoTableParams();
  const { data } = useQuery({
    queryKey: ["borad_writes", bo_table],
    queryFn: getBoardWrites,
  })
  const writes: IWrite[] = data && data.writes ? data.writes : [];
  const boxWidth = "280px";

  return (
    <Grid
      mt={10}
      px={{
        base: 10,  // base: mobile
        lg: 40
      }}
      columnGap={4}
      rowGap={8}
      templateColumns={{
        sm: "1fr",
        md: "1fr 1fr",
        lg: "repeat(2, 1fr)",
        xl: "repeat(3, 1fr)",
        "2xl": "repeat(4, 1fr)",
      }}
    >
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
    </Grid>
  )
}