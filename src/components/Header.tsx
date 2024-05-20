import { FaMoon, FaSun } from "react-icons/fa";
import { Box, Button, HStack, IconButton, useDisclosure, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import LoginModal from "./Auth/LoginModal";
import SignUpModal from "./Auth/SignUpModal";


export default function Header() {
  const {
    isOpen: isLoginOpen,
    onClose: onLoginClose,
    onOpen: onLoginOpen,
  } = useDisclosure();
  
  const {
    isOpen: isSignUpOpen,
    onClose: onSignUpClose,
    onOpen: onSignUpOpen,
  } = useDisclosure();

  const { colorMode, toggleColorMode } = useColorMode();

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
          onClick={toggleColorMode}
          variant={"ghost"}
          aria-label="Toggle dark mode"
          icon={colorMode === "light" ? <FaSun /> : <FaMoon />}
        />
        <Button onClick={onLoginOpen}>Log in</Button>
        <Button onClick={onSignUpOpen} colorScheme={"blue"}>
          Sign up
        </Button>
      </HStack>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
    </HStack>
  );
}