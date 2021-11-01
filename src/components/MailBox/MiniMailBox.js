import { Flex, Text } from "@chakra-ui/react"

const MiniMailBox = ({username,message}) => {
    
    return (
        <Flex display="block" width="100%" flexDirection="column" textAlign="left" borderBottom="1px solid black"
            px="5" py="3"
            
            >
            <Text fontSize="lg" marginBottom="1">{username}</Text>
            <Text fontSize="sm" textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap" >{message}</Text> 
            {//"Nu merge faza asta cu textOverflow  "}
            }
        </Flex>
    )
}
export default MiniMailBox