import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getWrite } from "../api";
import { IWrite } from "../types";
import { Box, Grid, Image, GridItem, Skeleton, Heading } from "@chakra-ui/react";


function get_img_url (bf_file: string) {
  return `http://localhost:8000/${bf_file}`;
}

export default function WriteDetail() {
  const { wr_id } = useParams();
  const { isLoading, data } = useQuery<IWrite>({
    queryKey: ["write", wr_id],
    queryFn: getWrite
  });
  return (
    <Box
      mt={10}
      px={{ base: 10, lg: 40 }}
    >
      <Heading>{ data?.wr_subject }</Heading>
      <Grid
        mt={8}
        rounded="xl"
        overflow={"hidden"}
        gap={2}
        height="100vh"
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
    </Box>
  );
}