import { Box, Button, HStack, IconButton, useDisclosure} from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";
import { FaMoon } from "react-icons/fa";
import LoginModal from "./Auth/LoginModal";

export default function Root() {
  const { isOpen, onClose, onOpen } = useDisclosure();
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
          <IconButton
            variant={"ghost"}
            aria-label="Toggle dark mode"
            icon={<FaMoon />}
          />
          <Button onClick={onOpen}>Log in</Button>
          <Button colorScheme={"blue"}>Sign up</Button>
        </HStack>
        {/* LoginModal: This component is modal that pops up when Log in button was clicked */}
        <LoginModal onClose={onClose} isOpen={isOpen} />
      </HStack>
      <Outlet />
    </Box>
  );
}