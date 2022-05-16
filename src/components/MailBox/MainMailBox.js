import { Flex, Button, Textarea, Text } from "@chakra-ui/react";
import { Center } from "@chakra-ui/layout";
import { FiSend } from "react-icons/fi";
import MainMailMessage from "./MainMailMessage";
import { UserContext } from "../../App";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { RiMessageFill } from "react-icons/ri";
import "../../App.css";
const MainMailBox = ({
  messages,
  sendMessage,
  username,
  setLastMessages,
  lastMessages,
  reRenderPage,
}) => {
  const context = useContext(UserContext);
  const [messages2, setMessages2] = useState(messages);
  const [newMessageContent, setNewMessageContent] = useState("");
  const [render, setRender] = useState(0);

  useEffect(async () => {
    let url = "/getMessagesWithUser";

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
      params: { username2: username },
    }).then(
      (response) => {
        console.log("Salut " + username);
        setMessages2(response.data);
      },
      async (getError) => {
        if (getError.response.status === 401) {
          console.log("SE CHEAMA REFRESH TOKEN");
          context.refreshAuthToken();
          setRender(render + 1);
        }
      }
    );

    // this may produce a bug
    // -1 index, fa un caz special

    if (document.getElementById("mainDiv"))
      document.getElementById("mainDiv").scrollTop =
        document.getElementById("mainDiv").scrollHeight;
    reRenderPage();
    // console.log("MESSAGES 2 SUS");
    // const indexCurrentMessage = lastMessages.findIndex(
    //   (message) =>
    //     message.senderUsername == username ||
    //     message.receiverUsername == username
    // );
    // console.log(indexCurrentMessage);
    // console.log("AICI");
    // console.log(lastMessages);
    // console.log(lastMessages[-1]);

    // const currentMessage = { ...messages2[messages2.length - 1] };
    // const updatedLastMessages = [...lastMessages];
    // if (indexCurrentMessage != -1) {
    //   updatedLastMessages[indexCurrentMessage] = currentMessage;
    // } else {
    //   updatedLastMessages[0] = currentMessage;
    // }
    // console.log(updatedLastMessages);
    // updatedLastMessages.filter((message) => {
    //   return (
    //     message.senderUsername == username ||
    //     message.receiverUsername == username
    //   );
    // });
    // setLastMessages(updatedLastMessages);

    setTimeout(() => {
      setRender(render + 1);
    }, 10000);
  }, [render, messages]);

  return (
    <Flex flexDir="column" width="60%" paddingBottom="2">
      <Flex
        id="mainDiv"
        border="1px solid black"
        p="5"
        flexDir="column"
        overflowY="auto"
        overflowX="hidden"
        height={username !== "" ? "80%" : "auto"}
      >
        {messages2
          .sort((a, b) => {
            return (
              new Date(a.timeOfSending).valueOf() -
              new Date(b.timeOfSending).valueOf()
            );
          })
          .map((message, index) => {
            return (
              <MainMailMessage
                key={index}
                side={
                  message.senderUsername == context.userInfo.username
                    ? "left"
                    : "right"
                }
                content={message.content}
                timeOfSending={message.timeOfSending}
              />
            );
          })}
        {messages2.length == 0 && (
          <Center>
            <Text>Choose a conversation</Text>
          </Center>
        )}
      </Flex>
      {messages2.length != 0 && (
        <Flex
          className="responsive-flex"
          position="relative"
          m="1"
          marginTop="2"
        >
          <Textarea
            width="90%"
            resize="none"
            placeholder="Send a message"
            variant="filled"
            onChange={(e) => {
              setNewMessageContent(e.target.value);
            }}
            value={newMessageContent}
          ></Textarea>
          <Button
            position="absolute"
            right="0.5"
            width="20px"
            onClick={() => {
              setNewMessageContent("");
              sendMessage(newMessageContent);
            }}
          >
            <FiSend />
          </Button>
        </Flex>
      )}
    </Flex>
  );
};
export default MainMailBox;
