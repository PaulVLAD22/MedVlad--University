import { Center, Flex } from "@chakra-ui/react";
import { Button, Text, Input, Box } from "@chakra-ui/react";
import AcceptedRequest from "./adminRequests/AcceptedRequest";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../App";
import { ExportExcel } from "./ExportData/ExportExcel";

const HistoryPage = () => {
  const context = useContext(UserContext);
  const [registrationRequests, setRegistrationRequests] = useState([])
  const [questionRequests, setQuestionRequests] = useState([])
  const [render, setRender] = useState(0);
  const registrationCsv = "registrationCsv"

  useEffect(() => {
    const getAdminHistory = async () => {
      let url = "/admin/getAdminHistory";

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
          console.log(response.data.registrationResultList);
          setRegistrationRequests(response.data.registrationResultList)
          response.data.questions.map((question) => {
            let newQuestion = {
              "user": question.userDto.username,
              "content": question.content,
              "posting_date": question.postingDate,
              "comment": question.comment,
              "verdict": question.verdict
            }

            setQuestionRequests(arr => [...arr, newQuestion])
          })
          console.log(questionRequests)

        },
        async (getError) => {
          if (getError.response.status === 401) {
            console.log("SE CHEAMA REFRESH TOKEN");
            context.refreshAuthToken();
            setRender(render + 1);
          }
        }
      );
    }
    getAdminHistory();
  }, [render]);

  return (
    <Center width="100%" height="90%" flexDir="column">
      <Flex
        flexDir="column"
        border="1px solid black"
        width="min(1024px,100%)"
        height="70%"
        overflow="auto"
        alignItems="center"
      >
        {registrationRequests.map((request, index) => {
          console.log(request)
          return <AcceptedRequest
            key={index}
            request={request} />
        })}
        {questionRequests.map((question, index) => {
          return (
            <Box my="2" key={index} >
              <Text>Question : {question.content}</Text>
              <Text>Comment : {question.comment}</Text>
              <Text>Accepted : {question.verdict == true ? "Yes" : "No"}</Text>
            </Box>
          )
        })}
      </Flex>
      <ExportExcel text={"Export Registration Data"} csvData={registrationRequests} fileName={"RegistrationReport_" + context.userInfo.username} />
      <ExportExcel text={"Export Question Data"} csvData={questionRequests} fileName={"QuestionsReport_" + context.userInfo.username} />
    </Center>
  );
};
export default HistoryPage;
