import { useState } from 'react';
import {
  Box, Button, Input, InputGroup, InputLeftElement, Modal, VStack,
  ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay,
} from "@chakra-ui/react";
import { FaUserNinja, FaLock, FaEnvelope, FaUserSecret } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';
import SocialLogin from "./SocialLogin";
import { ISignUpModalProps, IStep } from "../../types";
import Agreement from './SignUp/Agreement';


export default function SignUpModal({ isOpen, onClose }: ISignUpModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isChecked, setIsChecked] = useState(false);

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