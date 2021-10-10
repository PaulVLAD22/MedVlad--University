import { Flex, Box, Text, Input, Button, Img } from "@chakra-ui/react"
import Answer from "./Answer"
import { useContext } from "react"
import { UserContext } from "../../App"
const Question = ({ author,content, answers }) => {
    const context = useContext(UserContext)
    console.log(content)
    return (
        <Flex width="80%" flexDirection="column" alignItems="center"
            border="1px solid black" m="3">
            <Flex>
              <Img src={author.profilePicture}></Img>
              <Text>{author.username}</Text>
            </Flex>
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
                {answers.map((answer,index)=>{
                  return <Answer key={index} content={answer.content} author={answer.author} numberOfLikes={answer.numberOfLikes} />
                })}
                </Flex>
        </Flex>
    )
}
export default Question