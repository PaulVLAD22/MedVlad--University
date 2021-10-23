import { Button, Flex, Text, Input } from "@chakra-ui/react";
import { TiTickOutline } from "react-icons/ti";
import { AiOutlineStop } from "react-icons/ai";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../../../App";
import styled from "styled-components";
const UserRequest = ({ user }) => {
  const context = useContext(UserContext);
  const [render, setRender] = useState(0);
  const [comment, setComment] = useState("");

  const sendRequestResponse = async (verdict) => {
    let url = "/admin/acceptUserRegistration";

    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + context.jwt,
      },
    };

    await axios({
      method: "POST",
      url: url,
      headers: config.headers,
      params: { username: user.username, comment: comment, verdict: verdict },
    }).then(
      (response) => {
        console.log(response.data);
        setRender(render + 1);
        window.location.reload()
      },
      async (getError) => {
        if (getError.response.status === 403) {
          console.log("SE CHEAMA REFRESH TOKEN");
          context.refreshAuthToken();
          setRender(render + 1);
        }
      }
    );
  };
  return (
    <UsersList
      flexDir="row"
      width="100%"
      justifyContent="space-between"
      borderBottom="1px solid black"
      my="2"
      alignItems="center"
      p="3"
    >
      <Text>{user.username}</Text>
      <Text>{user.email}</Text>
      <Button>
        <AiOutlineStop
          onClick={() => sendRequestResponse(false)}
        ></AiOutlineStop>
      </Button>
      <Button>
        <TiTickOutline
          onClick={() => sendRequestResponse(true)}
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
