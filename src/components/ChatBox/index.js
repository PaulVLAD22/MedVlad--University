import { Center, Flex, Img, Text,Input,Button } from "@chakra-ui/react";
import ChatMessage from "./ChatMessage";
import {secondaryColor} from "../utils/colors"
import {FiSend} from "react-icons/fi"
const ChatBox = () => {
  return (
    <Flex
      flexDirection="column"
      border="0px black solid"
      width="min(400px,100%)"
      height="50%"
      padding="4"
      boxShadow="dark-lg"
      borderRadius="10"
    >
      <Flex justifyItems="center" alignItems="center" width="100%" height="20%">
        <Img
          src="https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
          width="100px"
          padding="3"
        ></Img>
        <Text fontSize="20" fontWeight="semibold">
          Doctor Marin Johnson
        </Text>
      </Flex>
      <Flex padding="2" flexDirection="column" border="1px black solid">
        <ChatMessage content="Hi John, What's your problem you retard? Trying to copy me?" />
        <ChatMessage content="Hi John, What's your problem you retard?" />
        <Flex>
        <Input width="100%"
        placeholder="..."
        variant="filled"
        ></Input>
        <Button width="20px">
          <FiSend/>
        </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default ChatBox;
