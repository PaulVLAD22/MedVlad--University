import { Button } from "@chakra-ui/react";
import React from "react";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
const SOCKET_URL = 'http://localhost:8080/chat';

const ChatPage = () => {
  // CAUTA ALTA IMPLEMENTARE, ASTA NU MERGE
  var connected = false;
  var socket = '';
  var stompClient = '';

  const connect = () => {
    const socket = new SockJS('/chat')
    stompClient = Stomp.over(socket)
    stompClient.connect({}, onConnected, onError)
  }

  const onError = (error) => {
    console.log(error)
  }

  const onConnected = () => {
    stompClient.subscribe('/topic/public', onMessageReceived)
    stompClient.send("/app/chat.newUser",
      {},
      (JSON.stringify({
        "sender": "senderUsername", "type": 'CONNECT'
      }))
    )
  }

  const onMessageReceived = (payload) => {
    const message = JSON.parse(payload.body);
    console.log(message)
  }

  const sendMessage = (event) => {

    const messageContent = "Salut!"

    if (messageContent && stompClient) {
      const chatMessage = {
        sender: "senderUsername",
        content: "Content Trimis",
        type: 'CHAT',
        time: "time"
      }
      stompClient.send("/app/chat.send", {}, JSON.stringify(chatMessage))

    }
    event.preventDefault();
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
    </>
  )

  // const [message, setMessage] = useState('You server message here.');

  // let onConnected = () => {
  //   console.log("Connected!!")
  // }

  // let onMessageReceived = (msg) => {
  //   setMessage(msg.message);
  // }

  // return (
  //   <Center width="100%" height="100%">
  //     {/* <Button>Connect</Button>
  //   <ChatBox></ChatBox> */}
  //     <SockJsClient
  //       url={SOCKET_URL}
  //       topics={['/topic/public']}
  //       onConnect={onConnected}
  //       onDisconnect={console.log("Disconnected!")}
  //       onMessage={msg => onMessageReceived(msg)}
  //       debug={false}
  //     />

  //     <div>{message}</div>
  //   </Center>
  // );
};
export default ChatPage;
