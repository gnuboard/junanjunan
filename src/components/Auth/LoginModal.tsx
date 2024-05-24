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
  Text,
} from "@chakra-ui/react";
import { FaUserNinja, FaLock } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import SocialLogin from "./SocialLogin";
import { ILoginModalProps, ILoginForm } from "../../types";
import { usernameLogIn } from "../../api";
import { useForm } from "react-hook-form";


export default function LoginModal ( {onClose, isOpen}: ILoginModalProps ) {
  const { register, handleSubmit, formState: { errors } } = useForm<ILoginForm>();
  const mutation = useMutation({
    mutationFn: usernameLogIn,
    onMutate: () => {
      console.log("mutation starting");
    },
    onSuccess: (data) => {
      console.log("mutation is successful");
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    }
  });
  const onSubmit = ({ username, password }: ILoginForm) => {
    mutation.mutate({ username, password });
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
                isInvalid={Boolean(errors.username)}
                variant={"filled"}
                placeholder="Username" 
              />
            </InputGroup>
            <Text fontSize={"sm"} color="red.500">{errors.username?.message}</Text>
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
                isInvalid={Boolean(errors.password)}
                type="password"
                variant={"filled"}
                placeholder="Password" 
              />
            </InputGroup>
            <Text fontSize={"sm"} color="red.500">{errors.password?.message}</Text>
          </VStack>
          <Button isLoading={mutation.isPending} type="submit" mt={4} colorScheme={"blue"} w="100%">
            Log in
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}