import QuestionRequest from "./adminRequests/QuestionRequest";
import { Center, Flex } from "@chakra-ui/layout";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../App";
const AcceptQuestionsPage = () => {
  const context = useContext(UserContext);
  const [questions, setQuestions] = useState([]);
  const [render, setRender] = useState(0);

  useEffect(async () => {
    let url = "/getInactiveQuestions";

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
        console.log(response.data);
        setQuestions(response.data);
      },
      async (getError) => {
        if (getError.response.status === 403) {
          console.log("SE CHEAMA REFRESH TOKEN");
          context.refreshAuthToken();
          setRender(render + 1);
        }
      }
    );
  }, [render]);

  return (
    <Center width="100%" height="100%" overflow="auto">
      <Flex
        flexDir="column"
        border="1px solid black"
        width="min(1024px,100%)"
        height="70%"
        overflow="auto"
        alignItems="center"
      >
        {questions.map((question, index) => {
          return <QuestionRequest key={index} question={question} />;
        })}
      </Flex>
    </Center>
  );
};
export default AcceptQuestionsPage;
