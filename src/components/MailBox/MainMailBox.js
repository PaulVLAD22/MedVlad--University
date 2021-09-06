import { Flex, Button, Textarea } from "@chakra-ui/react"
import {FiSend} from "react-icons/fi"
import MainMailMessage from "./MainMailMessage"
const MainMailBox = ({ messages }) => {
    return (
        <Flex border="1px solid black" width="60%" p="5" flexDir="column" overflowY="auto" overflowX="hidden">
            <MainMailMessage side="left" />
            <MainMailMessage side="right" />
            <Flex position="relative" m="1" marginTop="2">
                <Textarea width="90%"
                    resize="none"
                    placeholder="Send a message"
                    variant="filled"
                ></Textarea>
                <Button
                    position="absolute"
                    right="0.5"
                    width="20px">
                    <FiSend />
                </Button>
            </Flex>
        </Flex>
            )
}
export default MainMailBox