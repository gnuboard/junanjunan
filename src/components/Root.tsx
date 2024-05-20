import { Box, Button, HStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <Box>
      <HStack
        justifyContent={"space-between"}
        py={5}
        px={10}
        borderBottomWidth={1}
      >
        <HStack spacing={2}>
          <Button>Log in</Button>
          <Button colorScheme={"blue"}>Sign up</Button>
        </HStack>
      </HStack>
      <Outlet />
    </Box>
  );
}