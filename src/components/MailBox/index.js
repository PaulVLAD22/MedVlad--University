import { Flex, Text } from "@chakra-ui/react"
import MainMailMessage from "./MainMailMessage"
import MainMailBox from "./MainMailBox"
import MiniMailBox from "./MiniMailBox"
import { useState } from "react"
const MailBox = () => {
    const [messages,setMessages] = useState(["mesaj1","mesaj2"])
    const updateMainMailBox = () =>{
        console.log("")
    }
    return (
        <Flex width="min(1024px,100%)" height="60%" boxShadow="dark-lg" >
            <Flex width="40%" flexDir="column" > 
            <MiniMailBox username="Doctor Marin John" messages={messages} updateMainMailBox={updateMainMailBox}/>
            <MiniMailBox username="Doctor Marin John" messages={messages} updateMainMailBox={updateMainMailBox}/>
            <MiniMailBox username="Doctor Marin John" messages={messages} updateMainMailBox={updateMainMailBox} />
            </Flex>
            <MainMailBox messages={messages}>
            </MainMailBox>
        </Flex>
    )
}
export default MailBox