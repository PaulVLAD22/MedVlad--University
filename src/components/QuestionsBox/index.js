import { Flex, Center, Box, Text, Input, Button } from "@chakra-ui/react";
import Question from "./Question";
import InfostationDescription from "./InfostationDescription";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../App";
const QuestionsBox = () => {
  const context = useContext(UserContext);
  const [searchWord, setSearchWord] = useState("");
  const [questions, setQuestions] = useState([]);
  const [render,setRender] = useState(0);
  const [postQuestionResponse,setPostQuestionResponse] = useState("")
  const [postingQuestion,setPostingQuestion] = useState("")

  useEffect(async () => {
    //console.log(context.jwt);
    console.log("jwt:" + context.jwt)
    let url = "/getQuestions";

    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + context.jwt,
      },
    };

    await axios({
      method: "GET",
      url: url,
      headers: config.headers,
    }).then(
      (response) => {
        console.log(response.data)
        setQuestions(response.data);
      
      },
      async (getError) => {
        if (getError.response.status === 403) {
          console.log("SE CHEAMA REFRESH TOKEN")
          context.refreshAuthToken();
          setRender(render+1);
        }
      }
    );
  },[render]);
  // TODO:: nu primesc VALORILE

  const postQuestion = async (e) => {
    e.preventDefault();
    
    let url = "/user/postQuestion"; //TODO:: Not Found

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
      params:{"content":postingQuestion}
    }).then(
      (response) => {
        console.log(response.data)
        setPostQuestionResponse("Question sent for verification");
      },
      async (getError) => {
        if (getError.response.status === 403) {
          console.log("SE CHEAMA REFRESH TOKEN")
          context.refreshAuthToken();
          setRender(render+1);
        }
      }
    );
    };
  


  return (
    
    <Center>
    {console.log(context.jwt)}
      <Flex
        position="relative"
        flexDirection="column"
        overflowY="auto"
        width="min(1024px,100vw)"
        height="100vh"
        boxShadow="dark-lg"
        alignItems="center"
        p={5}
      >
        {context.userInfo.role == "doctor" && (
          <>
            <h2>SUNT UN DOCTOR</h2>
            <h2>ADAUGA SA POT DA LIKE LA COMMENT-URI SI SA ADAUG RASPUNS</h2>
            <h2>Doctorii pot sa vada toate raspunsurile</h2>
            <h2>Userii doar pe primele 3 cele mai populare</h2>
          </>
        )}
        <InfostationDescription />

        <Flex width="50%" m="3">
          <Input
            width="90%"
            mx="2"
            placeholder="Search for a question..."
            onChange={(e) => {
              setSearchWord(e.target.value);
            }}
            value={searchWord}
          ></Input>
          <Button width="10%">
            <BsSearch />
          </Button>
        </Flex>
        {questions.map((question, index) => {
          console.log(question)
          if (question.content.includes(searchWord))
            return (
              <Question
                key={index}
                author={question.userDto}
                content={question.content}
                answers={question.questionAnswerList}
              />
            );
        })}
      
        <Flex m="5" width="70%" flexDirection="column" alignItems="center">
          {context.userInfo.role == "USER" && (
            <form onSubmit={postQuestion}>
              <Text>Submit Your Own Question</Text>
              <Input margin="2" onChange={(e) => {setPostingQuestion(e.target.value)}} value={postingQuestion}></Input>
              <Button type="submit">Submit</Button>
              {postQuestionResponse}
            </form>
          )}
        </Flex>
      </Flex>
    </Center>
    //TODO:: FA CA DIN BACK END SA PRIMESC DOAR CELE MAI BUNE RASPUINSURI SI SA FIE ORDONATE BINE,
  );
};
export default QuestionsBox;
