import { Flex, Box,Text } from "@chakra-ui/react"
import Answer from "./Answer"
const Question = ({content,answerA,answerB,answerC}) => {
    console.log(content)
    return (
        <Flex width="80%" flexDirection="column" alignItems="center"
        border="1px solid black" m="3">
            <Text fontSize="lg"
            fontWeight="bold">{content}</Text>
            <Flex width="100%" alignItems="center"
            justifyContent="center" flexDirection="column" >
                <Answer content="Raspuns A raspuns lung cu multe cuvinte si o gramdade de litere poate chiar cifre daca vorbeste de gramaj doctorul" author="Doctor Marin" numberOfLikes={20} />
                <Answer content={answerB.content} author={answerB.author} numberOfLikes={answerB.numberOfLikes} />
                <Answer content="Raspuns A" author="Doctor Marin" numberOfLikes={20} />
            </Flex>
        </Flex>
    )
}
export default Question