import { Center, Flex, Button } from "@chakra-ui/react";
import SockJsClient from 'react-stomp';
import ChatBox from "../ChatBox"
import React, { useState, useEffect } from "react"
import axios from 'axios'
const SOCKET_URL = 'http://localhost:8080/chat';

const ChatPage = () => {
  
    const [message, setMessage] = useState('You server message here.');

    let onConnected = () => {
      console.log("Connected!!")
    }

    let onMessageReceived = (msg) => {
      setMessage(msg.message);
    }

    return (
      <Center width="100%" height="100%">
        {/* <Button>Connect</Button>
      <ChatBox></ChatBox> */}
        <SockJsClient
          url={SOCKET_URL}
          topics={['/topic/public']}
          onConnect={onConnected}
          onDisconnect={console.log("Disconnected!")}
          onMessage={msg => onMessageReceived(msg)}
          debug={false}
        />
        <div>{message}</div>
      </Center>
    );
  };
  export default ChatPage;
