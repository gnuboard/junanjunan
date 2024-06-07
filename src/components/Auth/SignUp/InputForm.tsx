import { ChangeEvent } from 'react';
import {
  Box, Input, InputGroup, InputLeftElement, VStack,
  Heading, FormControl, Text
} from "@chakra-ui/react";
import { FaUserNinja, FaLock, FaEnvelope, FaUserSecret } from "react-icons/fa";
import { ISignUpForm, IUseSignUpFormMethods } from "../../../types";


export default function InputForm({ register, errors, clearErrors }: IUseSignUpFormMethods) {
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

  return (
    <VStack minH={"350px;"}>
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
        {errors.mb_email ? <Text color={"red.500"}>{errors.mb_email.message}</Text> : null}
      </FormControl>
    </VStack>
  )
}