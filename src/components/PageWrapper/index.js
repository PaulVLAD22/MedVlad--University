import { Box, Flex } from "@chakra-ui/layout";
import React from "react";
import { Navbar } from "./Navbar";

export const PageWrapper = (props) => {
  return (
    <Flex direction="column" height="100vh" width="100vw" overflowY="hidden">
      <Navbar />
      <Box width="100%" height="calc(100vh - 60px)" overflowY="auto">
        {props.children}
      </Box>
    </Flex>
  );
};