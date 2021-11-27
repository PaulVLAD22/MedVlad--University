import { Button } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import ChatBox from "../ChatBox";
import axios from "axios";

const SOCKET_URL = '/chat';

const ChatPage = () => {

  const [messages, setMessages] = useState([])
  const context = useContext(UserContext)

  const username = context.userInfo.username
  console.log(context)
  var connected = false;
  var socket = '';
  var stompClient = '';
  let topic;

  const joinQueue = async () => {

    let url = context.userInfo.role == "USER" ? "/user/joinQueue" : "/doctor/joinQueue"

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

      },
      async (getError) => {
        if (getError.response.status === 401) {
          console.log("SE CHEAMA REFRESH TOKEN")
          context.refreshAuthToken();
        }
      }
    );

  }

  const connect = () => {
    const socket = new window.SockJS(SOCKET_URL+"?jwt="+context.jwt)
    stompClient = window.Stomp.over(socket)
    stompClient.connect({}, onConnected, onError)
  }

  const onError = (error) => {
    console.log(error)
  }

  const onConnected = () => {
    stompClient.subscribe('/user/queue/errors', onMessageReceived)
    stompClient.subscribe("/user/queue/reply", onMessageReceived);

    stompClient.send("/app/chat.newUser",
      {},
      (JSON.stringify({
        "sender": username, "type": 'CONNECT', "to": "doctor"
      }))
    )
  }

  const onMessageReceived = (payload) => {
    const message = JSON.parse(payload.body);
    console.log(message)
  }

  const sendMessage = (content) => {

    const messageContent = "Salut!"

    if (messageContent && stompClient) {
      const chatMessage = {
        sender: username,
        content: content,
        type: 'CHAT',
        time: "time"
      }
      stompClient.send("/app/chat.send", {}, JSON.stringify(chatMessage))

    }

  }

  // const hashCode = (str) => {
  //   let hash = 0
  //   for (let i = 0; i < str.length; i++) {
  //      hash = str.charCodeAt(i) + ((hash << 5) - hash)
  //   }
  //   return hash
  // }


  const disconnect = () => {
    if (stompClient) {
      stompClient.disconnect();
    }
    connected = false;
  }

  const tickleConnection = () => {
    connected ? disconnect() : connect();
  }
  return (
    <>
      <Button onClick={sendMessage}>Send </Button>
      <Button onClick={tickleConnection}>Tickle Connection</Button>
      <Button onClick={joinQueue}>Join Queue</Button>
      <ChatBox />
    </>
  )
};
export default ChatPage;
