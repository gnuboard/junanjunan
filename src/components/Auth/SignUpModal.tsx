import { useState } from 'react';
import {
  Box, Button, Input, InputGroup, InputLeftElement, Modal, VStack,
  ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay,
  Heading,
} from "@chakra-ui/react";
import { FaUserNinja, FaLock, FaEnvelope, FaUserSecret } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';
import SocialLogin from "./SocialLogin";
import { ISignUpForm, ISignUpModalProps, IStep } from "../../types";
import Agreement from './SignUp/Agreement';
import { useForm } from 'react-hook-form';


export default function SignUpModal({ isOpen, onClose }: ISignUpModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isChecked, setIsChecked] = useState(false);
  const { register } = useForm<ISignUpForm>();

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
                {...register("mb_password", {required: "비밀번호는 필수 입니다."})}
                variant={"filled"}
                placeholder="비밀번호(필수)"
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
                {...register("mb_password_re", {required: "비밀번호 확인은 필수 입니다."})}
                variant={"filled"}
                placeholder="비밀번호 확인(필수)"
              />
            </InputGroup>
            <Heading size={"sm"} marginTop={"10px"}>개인정보 입력</Heading>
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
                placeholder="이름 (필수)"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaUserNinja />
                  </Box>
                }
              />
              <Input
                {...register("mb_nick", {required: "닉네임 필수 입니다."})}
                variant={"filled"}
                placeholder="닉네임 (필수)"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaEnvelope />
                  </Box>
                }
              />
              <Input
                {...register("mb_email", {required: "E-mail은 필수 입니다."})}
                variant={"filled"}
                placeholder="E-mail (필수)"
              />
            </InputGroup>
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
        <ModalBody>
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
                  {currentStep === steps.length ? 'Finish' : 'Next'}
                </Button>
                {currentStep > 1 && (
                  <Button colorScheme="gray" w="100%" onClick={prevStep}>
                    Previous
                  </Button>
                )}
              </VStack>
            </motion.div>
          </AnimatePresence>
          <Button mt={4} colorScheme={"blue"} w="100%">
            Sign up
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}