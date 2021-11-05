import { Flex, Button, Textarea, Text } from "@chakra-ui/react"
import { Center } from "@chakra-ui/layout"
import { FiSend } from "react-icons/fi"
import MainMailMessage from "./MainMailMessage"
import { UserContext } from "../../App"
import { useContext, useEffect, useState } from "react"
const MainMailBox = ({ messages, sendMessage }) => {
    const context = useContext(UserContext)
    const [newMessageContent, setNewMessageContent] = useState("")

    useEffect(() => {
        console.log("A");
        document.getElementById('mainDiv').scrollTop = document.getElementById('mainDiv').scrollHeight;
    })
    return (
        <Flex flexDir="column" width="60%" paddingBottom="2">
            <Flex id="mainDiv" border="1px solid black" p="5" flexDir="column" overflowY="auto" overflowX="hidden">
                {
                    messages.sort( (a, b) => {
                        return new Date(a.timeOfSending).valueOf() - new Date(b.timeOfSending).valueOf();
                    }).map((message, index) => {

                        return <MainMailMessage key={index}
                            side={message.senderUsername == context.userInfo.username ? "left" : "right"}
                            content={message.content}
                            timeOfSending={message.timeOfSending}
                        />
                    })
                }
                {
                    messages.length == 0 &&
                    <Center>
                        <Text>Chose a conversation</Text>
                    </Center>
                }
            </Flex>
            {messages.length != 0 &&

                <Flex position="relative" m="1" marginTop="2">
                    <Textarea width="90%"
                        resize="none"
                        placeholder="Send a message"
                        variant="filled"
                        onChange={(e) => { setNewMessageContent(e.target.value) }} value={newMessageContent}
                    ></Textarea>
                    <Button
                        position="absolute"
                        right="0.5"
                        width="20px"
                        onClick={() => {
                            setNewMessageContent("")
                            sendMessage(newMessageContent)
                        }
                        }>
                        <FiSend />
                    </Button>
                </Flex>
            }
        </Flex>

    )
}
export default MainMailBox