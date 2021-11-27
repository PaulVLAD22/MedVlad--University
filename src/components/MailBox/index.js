import { Flex, Text, Input, Button, Box } from "@chakra-ui/react"
import MainMailMessage from "./MainMailMessage"
import MainMailBox from "./MainMailBox"
import MiniMailBox from "./MiniMailBox"
import { useContext, useState, useEffect } from "react"
import { UserContext } from "../../App"
import axios from 'axios'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const MailBox = () => {
    const context = useContext(UserContext)
    const [lastMessages, setLastMessages] = useState([])
    const [render, setRender] = useState(0)
    const [messageContent, setMessageContet] = useState("")
    const [receiverUsername, setReceiverUsername] = useState("")
    const [mainMessages, setMainMessages] = useState([])
    const [userTalkingTo, setUserTalkingTo] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        //TODO:: Ordonezi dupa timestamp
        //TODO:: iei ultimul mesaj de la fiecare user cu care a conversat
        // in functie de daca l am trimis eu sau el sa fie o iconita jos
        const loadMessages = async () => {
            setLoading(true)
            let url = "/getLastMessages";

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
            }).then(
                (response) => {
                    console.log(response.data)
                    setLastMessages(response.data)
                },
                async (getError) => {
                    if (getError.response.status === 401) {
                        console.log("SE CHEAMA REFRESH TOKEN")
                        context.refreshAuthToken();
                        setRender(render + 1);
                    }
                }
            );
            setLoading(false)
        }

        loadMessages();
    }, [render]);

    const sendMessage = async (messageContent, receiverUsername) => {

        let url = "/postMessage";

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                Authorization: "Bearer " + context.jwt,
            },
        };

        await axios({
            method: "POST",
            url: url,
            headers: config.headers,
            params: { "content": messageContent, "receiverUsername": receiverUsername }
        }).then(
            (response) => {
                console.log(response.data)
                openChat(receiverUsername)
                setRender(render+1)
            },
            async (getError) => {
                if (getError.response.status === 401) {
                    console.log("SE CHEAMA REFRESH TOKEN")
                    context.refreshAuthToken();
                    sendMessage(messageContent,receiverUsername)
                }
            }
        );

    };

    const openChat = async (username) => {
        console.log(username);
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
                console.log("AICI")
                console.log(response.data)
                setMainMessages(response.data)
                setUserTalkingTo(username)
            },
            async (getError) => {
                if (getError.response.status === 401) {
                    console.log("SE CHEAMA REFRESH TOKEN")
                    context.refreshAuthToken();
                    setRender(render + 1);
                }
            }
        );
    }


    return (
        <Flex width="min(1024px,100%)" height="60%" boxShadow="dark-lg" >
            <Flex width="40%" flexDir="column" alignItems="center" >
                <Flex flexDir="row">
                    <Input width="60%" placeholder="message..."
                        onChange={(e) => { setMessageContet(e.target.value) }} value={messageContent} />
                    <Input width="30%" placeholder="user..."
                        onChange={(e) => { setReceiverUsername(e.target.value) }} value={receiverUsername} />
                    <Button onClick={() => sendMessage(messageContent, receiverUsername)} />
                </Flex>
                {loading == true ?
                    <Box my="10" alignItems="center">
                        <AiOutlineLoading3Quarters fontSize="30px" />
                    </Box>
                    :
                    <>{
                        lastMessages.sort(function (a, b) {
                            return new Date(b.timeOfSending).valueOf() - new Date(a.timeOfSending).valueOf();
                        }).
                            map((message, index) => {
                                return <MiniMailBox key={index}
                                    updateMainChat={() => {
                                        if (message.senderUsername == context.userInfo.username)
                                            openChat(message.receiverUsername)
                                        else
                                            openChat(message.senderUsername)
                                    }
                                    }
                                    username={message.senderUsername == context.userInfo.username ? message.receiverUsername : message.senderUsername}
                                    message={message.content}
                                    timeOfSending={message.timeOfSending}
                                    senderUsername={message.senderUsername} />
                            })
                    }
                    </>}


            </Flex>
            <MainMailBox messages={mainMessages} sendMessage={(_) => sendMessage(_, userTalkingTo)}>
            </MainMailBox>
        </Flex>
    )
}
export default MailBox