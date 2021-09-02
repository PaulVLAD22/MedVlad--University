import { Center, Flex, Img, Text,Input,Button,Textarea } from "@chakra-ui/react";
import ChatMessage from "./ChatMessage";
import {secondaryColor} from "../utils/colors"
import {FiSend} from "react-icons/fi"
const ChatBox = () => {
  return (
    <Flex
      flexDirection="column"
      border="0px black solid"
      width="min(450px,100%)"
      height="min(70%,500px)"
      padding="4"
      boxShadow="dark-lg"
      borderRadius="10"
      backgroundColor="white"
    >
      <Flex justifyItems="center" alignItems="center" width="100%"
      height="100px">
        <Img
          src="https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
          width="100px"
          padding="3"
        ></Img>
        <Text fontSize="20" fontWeight="semibold">
          Doctor Marin Johnson
        </Text>
      </Flex>
      <Flex padding="2" flexDirection="column" 
      height="80%">
        <Flex
        flexDir="column"
        overflowY="auto"
        marginBottom="2"
        >
        <ChatMessage time="12:23" content="Hi John, What's your problem you retard? Trying to copy me?" />
        <ChatMessage time="12:23" content="Hi John, What's your problem you retard?" />
        <ChatMessage time="12:23" content="Hi John, What's your problem you retard?" />
        <ChatMessage time="12:23" content="Hi John, What's your problem you retard?" />
        <ChatMessage time="12:24" content="Hi John, What's your problem you retard?" />
        <ChatMessage time="12:24" content="Hi John, What's your problem you retard?" />
        <ChatMessage time="12:24" content="Hi John, What's your problem you retard?" />
        <ChatMessage time="12:24" content="Hi John, What's your problem you retard?" />
        <ChatMessage time="12:24" content="Hi John, What's your problem you retard?" />
        <ChatMessage time="12:25" content="Hi John, What's your problem you retard?" />
        
        </Flex>
        <Flex position="relative" m="1" marginTop="2">
        <Textarea width="85%"
        resize="none"
        placeholder="Send a message"
        variant="filled"
        ></Textarea>
        <Button
        position="absolute"
        right="0.5" 
        width="20px">
          <FiSend/>
        </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default ChatBox;
