import React, { useState } from 'react';
import {
  Box,
  Button,
  HStack,
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
import { FaUserNinja, FaLock, FaEnvelope, FaUserSecret } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';
import SocialLogin from "./SocialLogin";
import { ISignUpModalProps, IFormData, IStep, IStepContentProps  } from "../../types";


const steps: IStep[] = [
  { id: 1, placeholder: "Name", icon: <FaUserSecret />, field: 'name' },
  { id: 2, placeholder: "Email", icon: <FaEnvelope />, field: 'email' },
  { id: 3, placeholder: "Username", icon: <FaUserNinja />, field: 'username' },
];


const StepContent: React.FC<IStepContentProps> = ({ step, value, onChange }) => (
  <InputGroup>
    <InputLeftElement
      children={<Box color="gray.500">{step.icon}</Box>}
    />
    <Input
      variant="filled"
      placeholder={step.placeholder}
      value={value}
      onChange={onChange}
      name={step.field}
    />
  </InputGroup>
);


export default function SignUpModal({ isOpen, onClose }: ISignUpModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<IFormData>({ name: '', email: '', username: '' });

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
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
              <VStack spacing={4}>
                <StepContent
                  step={steps[currentStep - 1]}
                  value={formData[steps[currentStep - 1].field]}
                  onChange={handleInputChange}
                />
                <HStack>
                  <Button onClick={prevStep} isDisabled={currentStep === 1}>
                    Previous
                  </Button>
                  <Button onClick={nextStep} isDisabled={currentStep === steps.length}>
                    Next
                  </Button>
                </HStack>
              </VStack>
            </motion.div>
          </AnimatePresence>
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
          <Button mt={4} colorScheme={"blue"} w="100%">
            Sign up
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}