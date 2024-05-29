import { FaMoon, FaSun } from "react-icons/fa";
import { 
  Box, Button, HStack, IconButton, useDisclosure,
  useColorMode, useColorModeValue, Stack, Avatar
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import LoginModal from "./Auth/LoginModal";
import SignUpModal from "./Auth/SignUpModal";
import useMember from "../lib/useMember";
import { get_img_url } from "../lib/files";


export default function Header() {
  const { memberLoading, member, isLoggedIn } = useMember();
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

  const { toggleColorMode } = useColorMode();
  const Icon = useColorModeValue(FaMoon, FaSun);

  return (
    <Stack
      justifyContent={"space-between"}
      alignItems={"center"}
      py={5}
      px={40}
      direction={{
        sm: "column",
        md: "row",
      }}
      spacing={{
        sm: 4,
        md: 0,
      }}
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
          icon={<Icon />}
        />
        {!memberLoading ? (
          !isLoggedIn ? (
            <>
              <Button onClick={onLoginOpen}>Log in</Button>
              <Button onClick={onSignUpOpen} colorScheme={"blue"}>
                Sign up
              </Button>
            </>
          ) : (
            <Avatar size={"md"} src={get_img_url(member.mb_icon_path)}/>
          )
        ) : null}
      </HStack>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
    </Stack>
  );
}