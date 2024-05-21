import { Grid } from "@chakra-ui/react";
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
      {[...Array(20)].map(index => (
        <Write key={index} />
      ))}
    </Grid>
  );
}