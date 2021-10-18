import { Flex, Box, Text, Input, Button, Img } from "@chakra-ui/react"
import Answer from "./Answer"
import { useContext, useState } from "react"
import { UserContext } from "../../App"
const Question = ({ author,content, answers }) => {
    const context = useContext(UserContext)
    const [questionAnswer,setQuestionAnswer] = useState("");

    const sendQuestionAnswer = () => {
      console.log(questionAnswer);
    }
    
    
    return (
        <Flex width="80%" flexDirection="column" alignItems="center"
            border="1px solid black" m="3">
            <Flex>
              <Img src={author.profilePicture}></Img>
              <Text>{author.username}</Text>
            </Flex>
            <Text fontSize="medium" p="2"
                fontWeight="semibold">{content}</Text>
            {context.userInfo.role == "DOCTOR" &&
                <>
                    <Text>Write a response</Text>
                    <Input m="1" variant="filled" onChange={(e) => {setQuestionAnswer(e.target.value)}}></Input>
                    <Button m="2">Submit</Button>
                </>
            }
            <Flex width="100%" alignItems="center"
                justifyContent="center" flexDirection="column" >
                {answers.map((answer,index)=>{
                  console.log(answer)
                  return <Answer key={index} content={answer.content} author={"Doctor "+answer.doctor.firstName+" "+answer.doctor.lastName} numberOfLikes={answer.numberOfLikes} />
                })}
                </Flex>
        </Flex>
    )
}
export default Question