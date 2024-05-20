import { Box, Button, HStack } from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";

export default function Root() {
  return (
    <Box>
      <HStack
        justifyContent={"space-between"}
        py={5}
        px={10}
        borderBottomWidth={1}
      >
        <Link to={"/"}>
          <img
            src={`${process.env.PUBLIC_URL}/g6_logo.png`} alt="logo"
            style={{ width: "50px", height: "50px" }}
          />
        </Link>
        <HStack spacing={2}>
          <Button>Log in</Button>
          <Button colorScheme={"blue"}>Sign up</Button>
        </HStack>
      </HStack>
      <Outlet />
    </Box>
  );
}