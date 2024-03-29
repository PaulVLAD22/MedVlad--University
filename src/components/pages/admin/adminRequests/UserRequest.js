import { Button, Flex, Text, Input } from "@chakra-ui/react";
import { TiTickOutline } from "react-icons/ti";
import { AiOutlineStop } from "react-icons/ai";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../../../App";
import styled from "styled-components";
const UserRequest = ({ user, reRenderPage }) => {
  const context = useContext(UserContext);
  const [render, setRender] = useState(0);
  const [comment, setComment] = useState("");
  const [message,setMessage] = useState("")

  const sendRequestResponse = async (verdict) => {
    let url = "/admin/acceptUserRegistration";

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
      params: { username: user.username, comment: comment, verdict: verdict },
    }).then(
      (response) => {
        setMessage("")
        console.log(response.data);
        setRender(render + 1);
        console.log("rerender")
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
    <UsersList
      flexDir="column"
      width="100%"
      justifyContent="space-between"
      borderBottom="1px solid black"
      my="2"
      alignItems="center"
      p="3"
    >
      <Text color="red" my="2">{message}</Text>
      <Text>{user.username}</Text>
      <Text>{user.email}</Text>
      <Button onClick={() => sendRequestResponse(false)}>
        <AiOutlineStop

        ></AiOutlineStop>
      </Button>
      <Button onClick={() => sendRequestResponse(true)}>
        <TiTickOutline
        ></TiTickOutline>
      </Button>
      <Input
        my={2}
        width="50%"
        placeholder="comment..."
        onChange={(e) => {
          setComment(e.target.value);
        }}
      ></Input>
    </UsersList>
  );
};
export const UsersList = styled(Flex)`
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
export default UserRequest;
