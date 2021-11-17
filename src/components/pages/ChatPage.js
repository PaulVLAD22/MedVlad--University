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
        {/* import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
var connected =false;
var socket ='';
var stompClient = '';
const  send = ()=> {
      let send_message = 'hello !';
      if (stompClient && stompClient.connected) {
        const msg = { name: send_message };
        stompClient.send("/app/hello", JSON.stringify(msg), {});
      }
    }
    const connect =()=> {
      socket = new SockJS("http://uat.wealthbrain.com:7777/gs-guide-websocket");
      stompClient = Stomp.over(socket);
      stompClient.connect(
        {},
        frame => {
          connected = true;
          stompClient.subscribe("/topic/greetings", tick => {
          });
        },
        error => {
          console.log(error);
          connected = false;
        }
      );
    }
    const disconnect =()=> {
      if (stompClient) {
        stompClient.disconnect();
      }
      connected = false;
    }
    const tickleConnection =()=> {
      connected ? disconnect() : connect();
    }  */}
        <div>{message}</div>
      </Center>
    );
  };
  export default ChatPage;
