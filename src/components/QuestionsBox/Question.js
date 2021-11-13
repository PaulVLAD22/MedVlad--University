import { Flex, Box, Text, Input, Button, Img } from "@chakra-ui/react"
import Answer from "./Answer"
import { useContext, useState } from "react"
import { useHistory } from "react-router"
import { UserContext } from "../../App"
import { TiDeleteOutline } from "react-icons/ti"
import axios from 'axios'
const Question = ({ id, author, content, answers, reRenderPage }) => {
  const context = useContext(UserContext)
  const history = useHistory();
  const [render, setRender] = useState(0);
  const [questionAnswer, setQuestionAnswer] = useState("");
  const [errorMessage, setErrorMessage] = useState("")

  const sendQuestionAnswer = async () => {
    let url = "/doctor/postQuestionAnswer";

    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + context.jwt,
      },
    };

    await axios({
      method: "POST",
      url: url,
      headers: config.headers,
      params: { "questionId": id, content: questionAnswer }
    }).then(
      (response) => {
        console.log(response.data)
        setQuestionAnswer("")
        reRenderPage()
        setRender(render + 1)
      },
      async (getError) => {
        if (getError.response.status === 403) {
          console.log("SE CHEAMA REFRESH TOKEN")
          context.refreshAuthToken();
          setRender(render + 1);
        }
      }
    );
  };

  const deleteQuestion = async (id) => {
    console.log(id)

    let url = "/admin/deleteQuestion";

    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + context.jwt,
      },
    };

    await axios({
      method: "DELETE",
      url: url,
      headers: config.headers,
      params: { "questionId": id }
    }).then(
      (response) => {
        console.log(response.data)
        reRenderPage()
        setRender(render + 1)
      })
      .catch(async (getError) => {
        console.log("ACI")
        if (getError.response.status === 403) {
          console.log("SE CHEAMA REFRESH TOKEN")
          context.refreshAuthToken();
          setRender(render + 1);
        }
      }
      )
  }


  const openAuthorProfile = () => {
    history.push("/profile/" + author.username);
  }

  return (
    <Flex width="80%" flexDirection="column" alignItems="center"
      border="1px solid black" m="3" p="5">
      <Flex flexDir="column">
        <Img maxH="50px" src={author.profilePicture}></Img>
        <Text onClick={openAuthorProfile} fontWeight="bold" cursor="pointer">{author.username}</Text>
      </Flex>
      <Text fontSize="medium" p="2"
        fontWeight="semibold">{content}</Text>

      {context.userInfo.role == "ADMIN" &&
        <Button my="2" onClick={() => deleteQuestion(id)}>
          <TiDeleteOutline />
        </Button>
      }
      {context.userInfo.role == "DOCTOR" &&
        <>
          <Text>Write a response</Text>
          <Input m="1" variant="filled" onChange={(e) => { setQuestionAnswer(e.target.value) }} value={questionAnswer}></Input>
          <Button m="2" onClick={sendQuestionAnswer}>Submit</Button>
        </>
      }
      <Flex width="100%" alignItems="center"
        justifyContent="center" flexDirection="column" >
        {context.userInfo.role == "DOCTOR" &&
          answers.map((answer, index) => {
            console.log(answer)
            return <Answer doctorUsername={answer.doctor.username}
              doctorProfilePicture={answer.doctor.profilePicture}
              key={index} id={answer.id} content={answer.content}
              author={"Doctor " + answer.doctor.firstName + " " + answer.doctor.lastName}
              numberOfLikes={answer.numberOfLikes} reRenderPage={() => reRenderPage()}
              setQuestionError={(error) => setErrorMessage(error)} />
          })}
        {context.userInfo.role == "USER" &&
          answers.sort((a1, a2) => {
            return a2.numberOfLikes - a1.numberOfLikes
          }).slice(0, 3).map((answer, index) => {
            console.log(answer)
            return <Answer doctorUsername={answer.doctor.username}
              doctorProfilePicture={answer.doctor.profilePicture}
              key={index} id={answer.id} content={answer.content}
              author={"Doctor " + answer.doctor.firstName + " " + answer.doctor.lastName}
              numberOfLikes={answer.numberOfLikes} reRenderPage={() => reRenderPage()}
              setQuestionError={(error) => setErrorMessage(error)} />
          })
        }
        {context.userInfo.role == "ADMIN" &&
          answers.sort((a1, a2) => {
            return a2.numberOfLikes - a1.numberOfLikes
          }).map((answer, index) => {
            console.log(answer)
            return <Answer doctorUsername={answer.doctor.username}
              doctorProfilePicture={answer.doctor.profilePicture}
              key={index} id={answer.id} content={answer.content}
              author={"Doctor " + answer.doctor.firstName + " " + answer.doctor.lastName}
              numberOfLikes={answer.numberOfLikes} reRenderPage={() => reRenderPage()}
              setQuestionError={(error) => setErrorMessage(error)} />
          })
        }
        <Text mt="5" color="red.500" fontWeight="bold">{errorMessage}</Text>
      </Flex>
    </Flex>
  )
}
export default Question