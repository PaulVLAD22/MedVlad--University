import { Flex, Button, Textarea, Text } from "@chakra-ui/react"
import { Center } from "@chakra-ui/layout"
import { FiSend } from "react-icons/fi"
import MainMailMessage from "./MainMailMessage"
import { UserContext } from "../../App"
import axios from 'axios'
import { useContext, useEffect, useState } from "react"
const MainMailBox = ({ messages, sendMessage,username, setLastMessages }) => {
    const context = useContext(UserContext)
    const [messages2,setMessages2] = useState(messages) 
    const [newMessageContent, setNewMessageContent] = useState("")
    const [render,setRender] =useState(0)

    useEffect(async () => {
        document.getElementById('mainDiv').scrollTop = document.getElementById('mainDiv').scrollHeight;
        let url = "/getMessagesWithUser";

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                Authorization: "Bearer " + context.jwt,
            },
        };

        await axios({
            method: "GET",
            url: url,
            headers: config.headers,
            params: { "username2": username }
        }).then(
            (response) => {
                setMessages2(response.data)
                setRender(render+1)
            },
            async (getError) => {
                if (getError.response.status === 401) {
                    console.log("SE CHEAMA REFRESH TOKEN")
                    context.refreshAuthToken();
                    setRender(render+1)
                }
            }
        );
        setTimeout(() => {
            
        }, 3000)
        
    },[render])

    return (
        <Flex flexDir="column" width="60%" paddingBottom="2">
            <Flex id="mainDiv" border="1px solid black" p="5" flexDir="column" overflowY="auto" overflowX="hidden">
                {
                    messages2.sort( (a, b) => {
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