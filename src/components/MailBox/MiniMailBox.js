import { Flex, Text } from "@chakra-ui/react"

const MiniMailBox = ({username,messages,updateMainMailBox}) => {
    
    return (
        <Flex display="block" width="100%" flexDirection="column" textAlign="left" borderBottom="1px solid black"
            px="5" py="3"
            onClick={updateMainMailBox}
            >
            <Text fontSize="lg" marginBottom="1">{username}</Text>
            <Text fontSize="sm" textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap" >{messages[0]}</Text> 
            {//"Nu merge faza asta cu textOverflow  "}
            }
        </Flex>
    )
}
export default MiniMailBox