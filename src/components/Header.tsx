import { FaMoon } from "react-icons/fa";
import { Box, Button, HStack, IconButton, useDisclosure } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import LoginModal from "./Auth/LoginModal";


export default function Header() {
  const {
    isOpen: isLoginOpen,
    onClose: onLoginClose,
    onOpen: onLoginOpen,
  } = useDisclosure();

  return (
    <HStack
      justifyContent={"space-between"}
      py={5}
      px={10}
      borderBottomWidth={1}
    >
      <Box color="red.500">
        <Link to={"/"}>
          <img
            src={`${process.env.PUBLIC_URL}/g6_logo.png`} alt="logo"
            style={{ width: "50px", height: "50px" }}
          />
        </Link>
      </Box>
      <HStack spacing={2}>
        <IconButton
          variant={"ghost"}
          aria-label="Toggle dark mode"
          icon={<FaMoon />}
        />
        <Button onClick={onLoginOpen}>Log in</Button>
        <Button colorScheme={"blue"}>
          Sign up
        </Button>
      </HStack>
      {/* LoginModal: This component is modal that pops up when Log in button was clicked */}
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
    </HStack>
  );
}