import { Flex, Text } from "@chakra-ui/react"

const MiniMailBox = ({updateMainChat,username,message,timeOfSending, senderUsername}) => {
    const minutes = (new Date(timeOfSending)).getMinutes();
    return (
        <Flex cursor="pointer" onClick={updateMainChat} display="block" width="100%" flexDirection="column" textAlign="left" borderBottom="1px solid black"
            px="5" py="3"            
            >
                {console.log(message,username,senderUsername,timeOfSending)}
            <Text fontSize="lg" >{username}</Text>
            <Text fontSize="md" textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap" mb="2" >{message}</Text> 
            <Text fontSize="xs" >{(new Date(timeOfSending)).getMonth()+"-"+(new Date(timeOfSending)).getDay() +" "+ (new Date(timeOfSending)).getHours() +":"+ (minutes <10 ? "0"+minutes : minutes)}</Text> 
            <Text fontSize="xs">{senderUsername==username ? "received" : "sent"}</Text>
            {//"Nu merge faza asta cu textOverflow  "}
            }
        </Flex>
    )
}
export default MiniMailBox