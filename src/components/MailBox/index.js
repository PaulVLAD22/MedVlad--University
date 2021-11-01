import { Flex, Text, Input, Button } from "@chakra-ui/react"
import MainMailMessage from "./MainMailMessage"
import MainMailBox from "./MainMailBox"
import MiniMailBox from "./MiniMailBox"
import { useContext, useState, useEffect } from "react"
import { UserContext } from "../../App"
import axios from 'axios'

const MailBox = () => {
    const context = useContext(UserContext)
    const [messages, setMessages] = useState([])
    const [render, setRender] = useState(0)
    const [messageContent, setMessageContet] = useState("")
    const [receiverUsername, setReceiverUsername] = useState("")

    useEffect(async () => {

        //TODO:: Ordonezi dupa timestamp
        //TODO:: iei ultimul mesaj de la fiecare user cu care a conversat
        // in functie de daca l am trimis eu sau el sa fie o iconita jos

        let url = "/getMessages";

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
                setMessages(response.data)
            },
            async (getError) => {
                if (getError.response.status === 403) {
                    console.log("SE CHEAMA REFRESH TOKEN")
                    context.refreshAuthToken();
                    setRender(render + 1);
                }
            }
        );
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
                setRender(render + 1)
            },
            async (getError) => {
                if (getError.response.status === 403) {
                    console.log("SE CHEAMA REFRESH TOKEN")
                    context.refreshAuthToken();
                    setRender(render + 1);
                }
            }
        );

    };

    const openChat = async (username) => {
        console.log(username);
    }


    return (
        <Flex width="min(1024px,100%)" height="60%" boxShadow="dark-lg" >
            <Flex width="40%" flexDir="column" >
                <Flex flexDir="row">
                    <Input width="60%" placeholder="message..."
                        onChange={(e) => { setMessageContet(e.target.value) }} value={messageContent} />
                    <Input width="30%" placeholder="user..."
                        onChange={(e) => { setReceiverUsername(e.target.value) }} value={receiverUsername} />
                    <Button onClick={() => sendMessage(messageContent, receiverUsername)} />
                </Flex>
                {
                    messages.map((message,index)=>{
                        return <MiniMailBox key={index}  onClick={()=>openChat(message.senderUsername)} 
                        username={message.senderUsername==context.userInfo.username ? message.receiverUsername : message.senderUsername} 
                        message={message.content} />
                    })
                }
                
            </Flex>
            <MainMailBox messages={messages}>
            </MainMailBox>
        </Flex>
    )
}
export default MailBox