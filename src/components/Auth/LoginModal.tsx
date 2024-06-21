import {
  Box, Button, Input, InputGroup, InputLeftElement, Modal,
  ModalBody, ModalCloseButton, ModalContent, ModalHeader,
  ModalOverlay, VStack, Text
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { FaUserNinja, FaLock } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import SocialLogin from "./SocialLogin";
import { ILoginModalProps, ILoginForm } from "../../types";
import { usernameLogIn, getMe } from "../../api";
import { setCredentials } from "../../store/auth/tokenSlice";
import { setLoginUser } from "../../store/auth/loginUserSlice";


export default function LoginModal ( {onClose, isOpen}: ILoginModalProps ) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ILoginForm>();
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: usernameLogIn,
    onMutate: () => {
      console.log("mutation starting");
    },
    onSuccess: (data) => {
      console.log("mutation is successful");
      const access_token = data.access_token;
      dispatch(setCredentials(data));
      getMe({ queryKey: ["me", access_token] }).then(res => {
        const userInfo = res;
        dispatch(setLoginUser(userInfo));
      });
      onClose();
      reset();
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
                placeholder="아이디" 
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
                placeholder="비밀번호" 
              />
            </InputGroup>
            <Text fontSize={"sm"} color="red.500">{errors.password?.message}</Text>
            {
              mutation.isError
              ? (
                <Text color="red.500" textAlign={"center"} fontSize="sm">
                  Username or Password are wrong
                </Text>
              )
              : null
            }
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