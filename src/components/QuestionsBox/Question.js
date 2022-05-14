import {
  Flex,
  Box,
  Text,
  Input,
  Button,
  Img,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import Answer from "./Answer";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../../App";
import { TiDeleteOutline } from "react-icons/ti";
import axios from "axios";
import { FiUser } from "react-icons/fi";
const Question = ({ id, symptoms, author, content, answer, reRenderPage }) => {
  const context = useContext(UserContext);
  const history = useHistory();
  const [render, setRender] = useState(0);
  const [condition, setCondition] = useState("");
  const [answerComment, setAnswerComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
      data: { questionId: id, comment: answerComment, condition: condition },
    }).then(
      (response) => {
        console.log(response.data);
        setAnswerComment("");
        setCondition("");
        reRenderPage();
        setRender(render + 1);
      },
      async (getError) => {
        if (getError.response.status === 401) {
          console.log("SE CHEAMA REFRESH TOKEN");
          context.refreshAuthToken();
          setRender(render + 1);
        }
      }
    );
  };

  const deleteQuestion = async (id) => {
    console.log(id);

    let url = "/admin/deleteQuestion";

    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + context.jwt,
      },
    };
    console.log(id);

    await axios({
      method: "DELETE",
      url: url,
      headers: config.headers,
      params: { questionId: id },
    })
      .then((response) => {
        console.log(response.data);
        reRenderPage();
        setRender(render + 1);
      })
      .catch(async (getError) => {
        console.log("ACI");
        if (getError.response.status === 401) {
          console.log("SE CHEAMA REFRESH TOKEN");
          context.refreshAuthToken();
          setRender(render + 1);
        }
      });
  };

  const openAuthorProfile = () => {
    history.push("/profile/" + author.username);
  };

  return (
    <Flex
      width="80%"
      flexDirection="column"
      alignItems="center"
      border="1px solid black"
      m="3"
      p="5"
    >
      <Flex flexDir="column" alignItems="center" justifyContent="center">
        {author.profilePicture ? (
          <Img maxH="50px" src={author.profilePicture}></Img>
        ) : (
          <FiUser size="50px" />
        )}
        <Text onClick={openAuthorProfile} fontWeight="bold" cursor="pointer">
          {author.username}
        </Text>
      </Flex>
      {console.log(symptoms)}
      <Flex flexDir="column">
        {symptoms.map((symptom) => {
          return <Text color="orange.700">{symptom.name}</Text>;
        })}
      </Flex>

      <Text fontSize="medium" p="2" fontWeight="semibold">
        {content}
      </Text>

      {context.userInfo.role == "ADMIN" && (
        <Button my="2" onClick={() => deleteQuestion(id)}>
          <TiDeleteOutline />
        </Button>
      )}
      {context.userInfo.role == "DOCTOR" && answer == null && (
        <>
          <Text>Write a response</Text>
          <Text>Condition:</Text>
          <Input
            width="50%"
            m="1"
            variant="filled"
            onChange={(e) => {
              setCondition(e.target.value);
            }}
            value={condition}
          />
          <Text>Comment:</Text>
          <Input
            width="50%"
            m="1"
            variant="filled"
            onChange={(e) => {
              setAnswerComment(e.target.value);
            }}
            value={answerComment}
          />

          <Button m="2" onClick={sendQuestionAnswer}>
            Submit
          </Button>
        </>
      )}
      {answer != null && (
        <>
          <Flex
            width="100%"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            {context.userInfo.role == "DOCTOR" && (
              <Answer
                condition={answer.condition}
                doctorUsername={answer.doctor.username}
                doctorProfilePicture={answer.doctor.profilePicture}
                id={answer.id}
                content={answer.content}
                author={
                  "Doctor " +
                  answer.doctor.firstName +
                  " " +
                  answer.doctor.lastName
                }
                numberOfLikes={answer.numberOfLikes}
                reRenderPage={() => reRenderPage()}
                setQuestionError={(error) => setErrorMessage(error)}
              />
            )}
            {context.userInfo.role == "USER" && (
              <Answer
                condition={answer.condition}
                doctorUsername={answer.doctor.username}
                doctorProfilePicture={answer.doctor.profilePicture}
                id={answer.id}
                content={answer.content}
                author={
                  "Doctor " +
                  answer.doctor.firstName +
                  " " +
                  answer.doctor.lastName
                }
                numberOfLikes={answer.numberOfLikes}
                reRenderPage={() => reRenderPage()}
                setQuestionError={(error) => setErrorMessage(error)}
              />
            )}

            {context.userInfo.role == "ADMIN" && (
              <Answer
                condition={answer.condition}
                doctorUsername={answer.doctor.username}
                doctorProfilePicture={answer.doctor.profilePicture}
                id={answer.id}
                content={answer.content}
                author={
                  "Doctor " +
                  answer.doctor.firstName +
                  " " +
                  answer.doctor.lastName
                }
                numberOfLikes={answer.numberOfLikes}
                reRenderPage={() => reRenderPage()}
                setQuestionError={(error) => setErrorMessage(error)}
              />
            )}
            <Text mt="5" color="red.500" fontWeight="bold">
              {errorMessage}
            </Text>
          </Flex>
        </>
      )}
    </Flex>
  );
};
export default Question;
