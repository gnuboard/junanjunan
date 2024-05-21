import { Grid, Box, Skeleton, SkeletonText } from "@chakra-ui/react";
import Write from "../components/Write";

export default function Home() {
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
        lg: "repeat(3, 1fr)",
        xl: "repeat(4, 1fr)",
        "2xl": "repeat(5, 1fr)",
      }}
    >
      <Box>
        <Skeleton rounded="2xl" height={280} mb={6} />
        <SkeletonText noOfLines={3} />
      </Box>
      <Box>
        <Write />
      </Box>
    </Grid>
  );
}