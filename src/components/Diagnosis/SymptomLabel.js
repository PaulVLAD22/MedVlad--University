import { Box, Flex, Text } from "@chakra-ui/layout";
import React from "react";
import { TiTick } from "react-icons/ti";

const SymptomLabel = ({ name, selected, selectSymptom }) => {
  console.log(selected);
  return (
    <Flex
      onClick={selectSymptom}
      px="5"
      py="1"
      m="2"
      boxShadow="md"
      position="relative"
      alignItems="center"
    >
      <Text whiteSpace="nowrap" textAlign="left" mr="3" width="80%">
        {name}
      </Text>
      {selected && <TiTick size="20px" />}
    </Flex>
  );
};

export default SymptomLabel;
