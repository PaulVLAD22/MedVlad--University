import { Button, Flex, Text, Input } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { AiFillStop } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import axios from "axios";
import { UserContext } from "../../../../App";

const QuestionRequest = ({ question,reRenderPage }) => {
  const context = useContext(UserContext);
  const [render, setRender] = useState(0);
  const [comment, setComment] = useState("");
  const [message,setMessage] = useState("")


  const sendQuestionResponse = async (verdict) => {
    let url = "/admin/acceptQuestion";

    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + context.jwt,
      },
    };
    setMessage("sending...")
    await axios({
      method: "POST",
      url: url,
      headers: config.headers,
      params: {id:question.id, comment:comment, verdict:verdict},
    }).then(
      (response) => {
        console.log(response.data);
        setRender(render + 1);
        console.log("rerender")
        setComment("")
        reRenderPage()
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

  return (
    <Flex flexDir="column" width="100%" p="2" borderBottom="1px solid black">
      <Text color="red">{message}</Text>
      <Text>{question.content}</Text>

      <Flex width="100%" flexDir="column" alignItems="center">
        <Flex width="100%" justifyContent="space-between" fontSize="larger">
          <Button  onClick={() => sendQuestionResponse(false)}>
            <AiFillStop
             
            ></AiFillStop>
          </Button>
          <Button onClick={() => sendQuestionResponse(true)}>
            <TiTick ></TiTick>
          </Button>
        </Flex>
        <Input
          width="50%"
          placeholder="comment..."
          onChange={(e) => {
            setComment(e.target.value);
          }}
        ></Input>
      </Flex>
    </Flex>
  );
};
export default QuestionRequest;
