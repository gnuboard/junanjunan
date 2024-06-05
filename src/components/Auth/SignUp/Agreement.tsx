import {
  Box, VStack, Checkbox, Table, Thead, Tbody, Tr, Th, Td, Text
} from "@chakra-ui/react";
import { AgreementStepProps } from "../../../types";


export default function Agreement ({ isChecked, onCheckboxChange }: AgreementStepProps) {
  return (
    <VStack spacing={4} align="stretch">
      <Checkbox isChecked={isChecked} onChange={onCheckboxChange}>
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
          </Tbody>
        </Table>
      </Box>
    </VStack>
  )
}