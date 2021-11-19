import { Box, Flex } from "@chakra-ui/layout";
import React, { useState } from "react";
import Navbar from "./Navbar";
import SideBar from "../SideBar"

export const PageWrapper = (props) => {
  const [isOpen,setIsOpen] = useState(false);

  const toggle = () =>{
    setIsOpen(!isOpen);
  }

  return (
    <Flex direction="column" height="100vh" width="100vw" overflowY="hidden">
      <SideBar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle}/>
      <Box width="100%" height="calc(100vh - 60px)" overflowY="auto">
        {props.children}
      </Box>
    </Flex>
  );
};