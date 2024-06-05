import { useState } from 'react';
import {
  Box, Button, Input, InputGroup, InputLeftElement, Modal, VStack,
  ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay,
  Checkbox, Table, Thead, Tbody, Tr, Th, Td, Text
} from "@chakra-ui/react";
import { FaUserNinja, FaLock, FaEnvelope, FaUserSecret } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';
import SocialLogin from "./SocialLogin";
import { ISignUpModalProps, IStep  } from "../../types";


export default function SignUpModal({ isOpen, onClose }: ISignUpModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isChecked, setIsChecked] = useState(false);

  const steps: IStep[] = [
    {
      id: 1,
      content: (
        <VStack spacing={4} align="stretch">
          <Checkbox isChecked={isChecked} onChange={(e) => setIsChecked(e.target.checked)}>
            회원가입 약관에 모두 동의합니다.
          </Checkbox>
          <Text fontSize="sm" mt={2} mb={4}>개인정보 수집 및 이용</Text>
          <Box overflowX="auto">
            <Table variant="simple" fontSize={"12px"}>
              <Thead>
                <Tr>
                  <Th>목적</Th>
                  <Th>항목</Th>
                  <Th>보유기간</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>이용자 식별 및 본인여부 확인</Td>
                  <Td>아이디, 이름, 비밀번호</Td>
                  <Td>회원 탈퇴 시까지</Td>
                </Tr>
                <Tr>
                  <Td>Service 고객서비스 이용에 관한 통지, CS대응을 위한 이용자 식별</Td>
                  <Td>연락처 (이메일, 휴대전화번호)</Td>
                  <Td>회원 탈퇴 시까지</Td>
                </Tr>
                {/* Additional rows can be added here */}
              </Tbody>
            </Table>
          </Box>
        </VStack>
      )
    },
    {
      id: 2,
      content: (
        <VStack>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaUserSecret />
                  </Box>
                }
              />
              <Input variant={"filled"} placeholder="Name" />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaEnvelope />
                  </Box>
                }
              />
              <Input variant={"filled"} placeholder="Email" />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaUserNinja />
                  </Box>
                }
              />
              <Input variant={"filled"} placeholder="Username" />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaLock />
                  </Box>
                }
              />
              <Input variant={"filled"} placeholder="Password" />
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