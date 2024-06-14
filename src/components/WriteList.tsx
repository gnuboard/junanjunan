import { Heading, VStack } from "@chakra-ui/react";
import { IWrite } from "../types";
import { useNavigate } from "react-router-dom";
import WriteBoxes from "./WriteBoxes";
import { getBoardAttr } from "../lib/board";


export default function WriteList({bo_table, writes}: {bo_table: string, writes: IWrite[] | undefined}) {
  writes = writes ? writes.slice(0, 5) : [];
  const navigate = useNavigate();
  const {boardName, boardBackgroundColor} = getBoardAttr(bo_table);
  const boxWidth = "280px";
  return (
    <VStack width={boxWidth}>
      <Heading
        onClick={() => navigate(`/writes/${bo_table}`)}
        _hover={{cursor: "pointer"}}
        width={"100%"}
        height={"30px"}
        size="md"
        color={"white"}
        backgroundColor={boardBackgroundColor}
        alignContent={"center"}
        textAlign={"center"}
      >
        {boardName}
      </Heading>
      <WriteBoxes bo_table={bo_table} writes={writes} />
    </VStack>
  );
}