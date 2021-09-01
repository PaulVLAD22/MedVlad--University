import { Flex, Text } from "@chakra-ui/react"

const MiniMailBox = () => {
    return (
        <Flex display="block" width="100%" flexDirection="column" textAlign="left" borderBottom="1px solid black"
            px="5" py="2" backgroundColor="red">
            <Text fontSize="lg">Doctor Marin John</Text>
            <Text fontSize="sm" textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap" >Sunt de acord ne vedem luni.Te vad maine ne vedem maine ne vedem maine</Text>
            {//"Nu merge faza asta cu textOverflow  "}
            }
        </Flex>
    )
}
export default MiniMailBox