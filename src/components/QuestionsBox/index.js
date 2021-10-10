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

  useEffect(async () => {
    //console.log(context.jwt);

    let url = "/getQuestions";

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
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
        console.log(response);
        setQuestions(response.data);
      },
      (getError) => {
        console.log(getError);
      }
    );
  });

  return (
    <Center>
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
          <Question
            author={question.userDto}
            content={question.content}
            answers={question.questionAnswersList}
          />;
        })}
        {"Intrebare lunga lunga lunga lunga lunga lunga lunga lunga?".includes(
          searchWord
        ) && (
          <Question
            author={{
              active: false,
              adminPoints: 0,
              dateOfRegistration: null,
              doctorPoints: 0,
              firstName: null,
              id: 0,
              lastName: null,
              profilePicture: null,
              role: { id: 1, name: "USER" },
              token: 0,
              username: "user5",
            }}
            content="Intrebare lunga lunga lunga lunga lunga lunga lunga lunga?"
            answers={[
            {
              content: "Raspuns Corect",
              author: "Doctor Marian",
              numberOfLikes: 20,
            },
            {
              content: "Raspuns Corect",
              author: "Doctor Marian",
              numberOfLikes: 20,
            },
            {
              content: "Raspuns Corect",
              author: "Doctor Marian",
              numberOfLikes: 20,
            } 
            ]}
          />
        )}
        <Flex m="5" width="70%" flexDirection="column" alignItems="center">
          {context.userInfo.role == "user" && (
            <>
              <Text>Submit Your Own Question</Text>
              <Input></Input>
            </>
          )}
        </Flex>
      </Flex>
    </Center>
    //TODO:: FA CA DIN BACK END SA PRIMESC DOAR CELE MAI BUNE RASPUINSURI SI SA FIE ORDONATE BINE,
    // SI FA QUESTIONANSWERLIST SA AIBA PROPRIETEATILE PE CARE LE VREA Answer.js
  );
};
export default QuestionsBox;
