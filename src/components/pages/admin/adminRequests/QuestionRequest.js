import { Button, Flex, Text, Input } from "@chakra-ui/react"
import { AiFillStop } from "react-icons/ai"
import { TiTick } from "react-icons/ti"

const QuestionRequest = () => {
    return (
        <Flex flexDir="column" width="100%" p="2" borderBottom="1px solid black">
            <Text>
                For how long should I take nurofen?
            </Text>

            <Flex width="100%" flexDir="column" alignItems="center" >

                <Flex width="100%" justifyContent="space-between" fontSize="larger">
                    <Button>
                        <AiFillStop></AiFillStop>
                    </Button>
                    <Button >
                        <TiTick></TiTick>
                    </Button>
                </Flex>
                <Input width="50%" placeholder="comment...">
                </Input>
            </Flex>
        </Flex>
    )
}
export default QuestionRequest