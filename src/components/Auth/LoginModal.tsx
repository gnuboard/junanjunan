import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import { FaUserNinja, FaLock } from "react-icons/fa";
import SocialLogin from "./SocialLogin";
import { ILoginModalProps } from "../../types";
import React, { useState } from "react";


export default function LoginModal ( {onClose, isOpen}: ILoginModalProps ) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onChange = (event:React.SyntheticEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    if(name === "username") {
      setUsername(value);
    } else if(name === "password") {
      setPassword(value);
    }
  }
  return (
    <Modal motionPreset="slideInBottom" onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Log in</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            <InputGroup size={"md"}>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaUserNinja />
                  </Box>
                }
              />
              <Input required name="username" onChange={onChange} value={username} variant={"filled"} placeholder="Username" />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaLock />
                  </Box>
                }
              />
              <Input required name="password" type="password" onChange={onChange} value={password} variant={"filled"} placeholder="Password" />
            </InputGroup>
          </VStack>
          <Button mt={4} colorScheme={"blue"} w="100%">
            Log in
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}