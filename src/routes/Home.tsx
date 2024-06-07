import { Grid, Box, Skeleton, SkeletonText, Button, HStack } from "@chakra-ui/react";
import Write from "../components/Write";
import { useQuery } from "@tanstack/react-query";
import { getWrites } from "../api";
import { IBoardData } from "../types";
import { Link } from "react-router-dom";


export default function Home() {
  const { isLoading, data } = useQuery<IBoardData>({
    queryKey: ["writes"],
    queryFn: getWrites,
  });

  return (
    <>
      <HStack justifyContent={"flex-end"} paddingX={"10%"} paddingTop={"10px"}>
      <Link to={"/writes/create"}>
        <Button>글 작성</Button>
      </Link>
      </HStack>
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
          lg: "repeat(3, 1fr)",
          xl: "repeat(4, 1fr)",
          "2xl": "repeat(5, 1fr)",
        }}
      >
        {
          isLoading ? (
            <Box>
              <Skeleton rounded="2xl" height={280} mb={6} />
              <SkeletonText noOfLines={3} />
            </Box>
          ) : null
        }
        {data?.writes.map((write) => (
          <Box key={write.wr_id}>
            <Write
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
        ))}
      </Grid>
    </>
  );
}