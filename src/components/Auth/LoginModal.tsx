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
import { useForm } from "react-hook-form";


export default function LoginModal ( {onClose, isOpen}: ILoginModalProps ) {
  const { register, handleSubmit } = useForm();
  const onSubmit = () => {
    console.log("submit");
  }
  return (
    <Modal motionPreset="slideInBottom" onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Log in</ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            <InputGroup size={"md"}>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaUserNinja />
                  </Box>
                }
              />
              <Input
                {...register("username", {required: "Username is required"})}
                variant={"filled"}
                placeholder="Username" 
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaLock />
                  </Box>
                }
              />
              <Input
                {...register("password", {required: "Password is required"})}
                type="password"
                variant={"filled"}
                placeholder="Password" 
              />
            </InputGroup>
          </VStack>
          <Button type="submit" mt={4} colorScheme={"blue"} w="100%">
            Log in
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}