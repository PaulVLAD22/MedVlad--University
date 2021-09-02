import { Flex, Img, Text,Box } from "@chakra-ui/react"
import { secondaryColor } from "../utils/colors"

export const ChatMessage = ({time,content}) => {
  return <Flex alignItems="start" m="1">
    <Box src="https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
    width="50px" marginRight="1" color={secondaryColor}>{time}</Box>
    <Text width="100%"
    textAlign="left">{content}</Text>
  </Flex>
}
export default ChatMessage