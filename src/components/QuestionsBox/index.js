import { Flex, Center, Box, Text, Input,Button } from "@chakra-ui/react"
import Question from "./Question"
import InfostationDescription from "./InfostationDescription"
const QuestionsBox = () => {
    return (
        <Center>
            <Flex
                position="relative"
                flexDirection="column"
                overflowY="auto"
                width="min(1024px,100vw)"
                height="100vh"
                boxShadow="dark-lg"
                alignItems="center"
                p={5}>
                <InfostationDescription/>
                <Question content="Intrebare lunga lunga lunga lunga lunga lunga lunga lunga?" answerB={{content:"Raspuns Corect",author:"Doctor Marian",numberOfLikes:20}} />
                <Question content="Intrebare lunga lunga lunga lunga lunga lunga lunga lunga?" answerB={{content:"Raspuns Corect",author:"Doctor Marian",numberOfLikes:20}}/>
                <Flex m="5" width="70%" flexDirection="column" alignItems="center">
                    <Text fontSize="lg">Submit your own question</Text>
                    <Input variant="filled"></Input>
                    <Button m="2" width="50%">Submit</Button>
                </Flex>
            </Flex>
        </Center>
    )
}
export default QuestionsBox