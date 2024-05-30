import { FaMoon, FaSun } from "react-icons/fa";
import { 
  Box, Button, HStack, IconButton, useDisclosure,
  useColorMode, useColorModeValue, Stack, Avatar
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import LoginModal from "./Auth/LoginModal";
import SignUpModal from "./Auth/SignUpModal";
import { get_img_url } from "../lib/files";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../types";
import { logout as tokenLogout } from "../store/auth/tokenSlice";
import { logout as userLogout } from "../store/auth/loginUserSlice";

export default function Header() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(tokenLogout());
    dispatch(userLogout());
  }
  const loginUser = useSelector((state: IRootState) => state.loginUser);
  const isLoggedIn = (loginUser.mb_id !== "");
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
        {
          !isLoggedIn ? (
            <>
              <Button onClick={onLoginOpen}>Log in</Button>
              <Button onClick={onSignUpOpen} colorScheme={"blue"}>
                Sign up
              </Button>
            </>
          ) : (
            <>
              <Avatar size={"md"} src={get_img_url(loginUser.mb_icon_path)}/>
              <Button onClick={handleLogout}>Logout</Button>
            </>
          )
        }
      </HStack>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
    </Stack>
  );
}