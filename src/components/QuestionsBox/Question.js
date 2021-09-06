import { Flex, Box, Text, Input, Button } from "@chakra-ui/react"
import Answer from "./Answer"
import { useContext } from "react"
import { UserContext } from "../../App"
const Question = ({ content, answerA, answerB, answerC }) => {
    const context = useContext(UserContext)
    console.log(content)
    return (
        <Flex width="80%" flexDirection="column" alignItems="center"
            border="1px solid black" m="3">
            <Text fontSize="medium" p="2"
                fontWeight="semibold">{content}</Text>
            {context.userInfo.role == "doctor" &&
                <>
                    <Text>Write a response</Text>
                    <Input m="1" variant="filled"></Input>
                    <Button m="2">Submit</Button>
                </>
            }
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