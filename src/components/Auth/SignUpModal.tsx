import { useState, ChangeEvent } from 'react';
import {
  Box, Button, Input, InputGroup, InputLeftElement, Modal, VStack,
  ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay,
  Heading, FormControl, Text
} from "@chakra-ui/react";
import { FaUserNinja, FaLock, FaEnvelope, FaUserSecret } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';
import SocialLogin from "./SocialLogin";
import { ISignUpForm, ISignUpModalProps, IStep } from "../../types";
import Agreement from './SignUp/Agreement';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { signUp } from '../../api';
import { AxiosError } from 'axios';


export default function SignUpModal({ isOpen, onClose }: ISignUpModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isChecked, setIsChecked] = useState(false);
  const {
    register, handleSubmit, reset, formState: { errors }, clearErrors
  } = useForm<ISignUpForm>();

  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      if (data.message === "회원가입이 완료되었습니다.") {
        alert("회원가입이 완료되었습니다.");
        onClose();
        reset();
      } else {
        alert(data.message);
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError)
      alert(error.response?.data.detail);
    }
  })

  const onSubmit = (variables: ISignUpForm) => {
    mutation.mutate(variables);
  }

  type RegisterTarget = keyof ISignUpForm;
  const handleRequiredChange = (event: ChangeEvent<HTMLInputElement>, registerTarget: RegisterTarget) => {
    const { value } = event.target;
    if (value) {
      clearErrors(registerTarget);
    }
  }

  const handleInputChange = (event: any) => {
    const { value } = event.target;
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (emailRegex.test(value)) {
        clearErrors('mb_email');
    }
  };

  const steps: IStep[] = [
    {
      id: 1,
      content: (
        <Agreement
          isChecked={isChecked}
          onCheckboxChange={e => setIsChecked(e.target.checked)}
        />
      )
    },
    {
      id: 2,
      content: (
        <VStack>
          <Heading size={"sm"}>사이트 이용정보 입력</Heading>
          <FormControl isInvalid={Boolean(errors.mb_id)}>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaUserSecret />
                  </Box>
                }
              />
              <Input
                {...register("mb_id", {required: "아이디는 필수 입니다."})}
                variant={"filled"}
                placeholder="아이디(필수)"
                onChange={(event) => handleRequiredChange(event, "mb_id")}
              />
            </InputGroup>
            {errors.mb_id ? <Text color={"red.500"}>{errors.mb_id.message}</Text> : null}
          </FormControl>
          <FormControl isInvalid={Boolean(errors.mb_password)}>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaLock />
                  </Box>
                }
              />
              <Input
                {...register("mb_password", {required: "비밀번호는 필수 입니다."})}
                variant={"filled"}
                placeholder="비밀번호(필수)"
                type="password"
                onChange={(event) => handleRequiredChange(event, "mb_password")}
              />
            </InputGroup>
            {errors.mb_password ? <Text color={"red.500"}>{errors.mb_password.message}</Text> : null}
          </FormControl>
          <FormControl isInvalid={Boolean(errors.mb_password_re)}>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaLock />
                  </Box>
                }
              />
              <Input
                {...register("mb_password_re", {required: "비밀번호 확인은 필수 입니다."})}
                variant={"filled"}
                placeholder="비밀번호 확인(필수)"
                type="password"
                onChange={(event) => handleRequiredChange(event, "mb_password_re")}
              />
            </InputGroup>
            {errors.mb_password_re ? <Text color={"red.500"}>{errors.mb_password_re.message}</Text> : null}
          </FormControl>
            <Heading size={"sm"} marginTop={"10px"}>개인정보 입력</Heading>
          <FormControl isInvalid={Boolean(errors.mb_name)}>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaUserNinja />
                  </Box>
                }
              />
              <Input
                {...register("mb_name", {required: "이름은 필수 입니다."})}
                variant={"filled"}
                placeholder="이름(필수)"
                type="mb_name"
                onChange={(event) => handleRequiredChange(event, "mb_name")}
              />
            </InputGroup>
            {errors.mb_name ? <Text color={"red.500"}>{errors.mb_name.message}</Text> : null}
          </FormControl>
          <FormControl isInvalid={Boolean(errors.mb_nick)}>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaUserNinja />
                  </Box>
                }
              />
              <Input
                {...register("mb_nick", {required: "닉네임은 필수 입니다."})}
                variant={"filled"}
                placeholder="닉네임(필수)"
                type="mb_nick"
                onChange={(event) => handleRequiredChange(event, "mb_nick")}
              />
            </InputGroup>
            {errors.mb_nick ? <Text color={"red.500"}>{errors.mb_nick.message}</Text> : null}
          </FormControl>
            <FormControl isInvalid={Boolean(errors.mb_email)}>
              <InputGroup>
                <InputLeftElement
                  children={
                    <Box color="gray.500">
                      <FaEnvelope />
                    </Box>
                  }
                />
                <Input
                  {...register("mb_email", {
                    required: "E-mail은 필수 입니다.",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "올바른 E-mail 형식이 아닙니다."
                    }
                  })}
                  variant={"filled"}
                  placeholder="E-mail (필수)"
                  type="email"
                  onChange={(event) => {handleInputChange(event); handleRequiredChange(event, "mb_email")}}
                />
              </InputGroup>
            </FormControl>
            {errors.mb_email ? <Text color={"red.500"}>{errors.mb_email.message}</Text> : null}
          </VStack>
      )
    }
  ];

  const nextStep = () => setCurrentStep(currentStep < steps.length ? currentStep + 1 : currentStep);
  const prevStep = () => setCurrentStep(currentStep > 1 ? currentStep - 1 : currentStep);

  return (
    <Modal onClose={onClose} isOpen={isOpen} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign up</ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {steps[currentStep - 1].content}
              <VStack mt={4}>
                <Button colorScheme="blue" w="100%" onClick={nextStep} isDisabled={!isChecked || currentStep === steps.length}>
                  Next
                </Button>
                {currentStep > 1 && (
                  <Button colorScheme="gray" w="100%" onClick={prevStep}>
                    Previous
                  </Button>
                )}
              </VStack>
            </motion.div>
          </AnimatePresence>
          <Button type="submit" mt={4} colorScheme={"blue"} w="100%">
            Sign up
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}