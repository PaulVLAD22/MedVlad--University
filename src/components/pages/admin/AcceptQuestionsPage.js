import QuestionRequest from "./adminRequests/QuestionRequest"
import { Center,Flex } from "@chakra-ui/layout"
const AcceptQuestionsPage = () => {
    return (
        <Center width="100%" height="100%" overflow="auto">
            <Flex flexDir="column" border="1px solid black" width="min(1024px,100%)" height="70%" overflow="auto" alignItems="center">
                <QuestionRequest></QuestionRequest>
            </Flex>
        </Center>
    )
}
export default AcceptQuestionsPage