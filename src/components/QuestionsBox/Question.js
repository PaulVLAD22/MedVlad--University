import { Flex, Box,Text } from "@chakra-ui/react"
import Answer from "./Answer"
const Question = ({content,answerA,answerB,answerC}) => {
    console.log(content)
    return (
        <Flex width="80%" flexDirection="column" alignItems="center"
        border="1px solid black" m="3">
            <Text fontSize="medium" p="2"
            fontWeight="semibold">{content}</Text>
            <Flex width="100%" alignItems="center"
            justifyContent="center" flexDirection="column" >
                <Answer content={answerA.content} author={answerA.author} numberOfLikes={answerA.numberOfLikes} />
                <Answer content={answerB.content} author={answerB.author} numberOfLikes={answerB.numberOfLikes} />
                <Answer content={answerC.content} author={answerC.author} numberOfLikes={answerC.numberOfLikes} />
            </Flex>
        </Flex>
    )
}
export default Question