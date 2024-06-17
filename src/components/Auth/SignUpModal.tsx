import { useState } from 'react';
import {
  Button, Modal, VStack, ModalBody, ModalCloseButton,
  ModalContent, ModalHeader, ModalOverlay,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from 'framer-motion';
import SocialLogin from "./SocialLogin";
import { ISignUpForm, ISignUpModalProps, IStep } from "../../types";
import Agreement from './SignUp/Agreement';
import InputForm from './SignUp/InputForm';
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
      if (error instanceof AxiosError) {
        const errorDetail = error.response?.data.detail;
        if (Array.isArray(errorDetail)) {
          alert(errorDetail[0].msg);
        } else {
          alert(errorDetail);
        }
      }
    }
  })

  const onSubmit = (variables: ISignUpForm) => {
    mutation.mutate(variables);
  }

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
        <InputForm
          register={register}
          errors={errors}
          clearErrors={clearErrors}
        />
      )
    }
  ];

  const nextStep = () => setCurrentStep(currentStep < steps.length ? currentStep + 1 : currentStep);
  const prevStep = () => setCurrentStep(currentStep > 1 ? currentStep - 1 : currentStep);

  return (
    <Modal onClose={onClose} isOpen={isOpen} size="xl">
      <ModalOverlay />
      <ModalContent minH={"75%"}>
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
                {currentStep === 1 ? (
                  <Button
                    colorScheme="gray"
                    w="100%"
                    onClick={nextStep}
                    isDisabled={isChecked ? false : true}
                  >
                    Next
                  </Button>
                ) : (
                  <Button colorScheme="gray" w="100%" onClick={prevStep}>
                    Previous
                  </Button>
                )}
              </VStack>
            </motion.div>
          </AnimatePresence>
          <Button
            type="submit"
            mt={4}
            colorScheme={"blue"}
            w="100%"
            isDisabled={currentStep === 1}
          >
            Sign up
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}