import { useQuery } from "@tanstack/react-query"
import { Button, Grid, HStack, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { getBoardWrites } from "../api"
import { useGetBoTableParams } from "../lib/useQuery/hooks"
import { IWrite } from "../types";
import WriteBoxes from "../components/WriteBoxes";


export default function WriteList () {
  const bo_table = useGetBoTableParams();
  const { data } = useQuery({
    queryKey: ["borad_writes", bo_table],
    queryFn: getBoardWrites,
  })
  const writes: IWrite[] = data && data.writes ? data.writes : [];

  return (
    <>
      <HStack justifyContent={"flex-end"} paddingX={"20%"} paddingTop={"10px"}>
        <Link to={`/writes/${bo_table}/create`}>
          <Button>글 작성</Button>
        </Link>
      </HStack>
      <VStack>
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
          <WriteBoxes bo_table={bo_table} writes={writes} />
        </Grid>
      </VStack>
    </>
  )
}