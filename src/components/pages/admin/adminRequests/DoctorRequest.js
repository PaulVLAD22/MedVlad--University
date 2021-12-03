import { Flex, Center, Box, Text, Button, Img, Input } from "@chakra-ui/react";
import { TiTick } from "react-icons/ti";
import { AiFillStop, AiOutlineStop } from "react-icons/ai";
import axios from "axios";
import { UserContext } from "../../../../App";
import { useContext, useState } from "react";
import userEvent from "@testing-library/user-event";
const DoctorRequest = ({ user, reRenderPage }) => {
  const context = useContext(UserContext);
  const [render, setRender] = useState(0);
  const [comment, setComment] = useState("");
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [message, setMessage] = useState("")

  const sendRequestResponse = async (verdict) => {
    let url = "/admin/acceptDoctorRegistration";

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
      params: { username: user.username, firstName: firstName, lastName: lastName, comment: comment, verdict: verdict },
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
    <Flex height="400px" width="min(100%,720px)" flexDir="column">
      <Flex width="100%" mb="10">

        <Flex flexDir="row">
          <Text color="red">{message}</Text>
          <Img height="100%" src={user.licensePicture}></Img>
        </Flex>
        <Flex
          flexDir="column"
          border="1px solid black"
          p="3"
          width="50%"
          height="100%"
          overflow="auto"
          textAlign="left"
        >
          <Text>{user.username}</Text>
          <Text>{user.email}</Text>
        </Flex>
      </Flex>

      <Flex width="100%" flexDir="column" alignItems="center">
        <Flex width="100%" justifyContent="space-between" fontSize="larger">
          <Button onClick={() => sendRequestResponse(false)}>
            <AiFillStop></AiFillStop>
          </Button>
          <Button onClick={() => sendRequestResponse(true)}>
            <TiTick ></TiTick>
          </Button>
        </Flex>
        <Input
          my={2}
          width="50%"
          placeholder="First Name"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          value={firstName}
        ></Input>
        <Input
          my={2}
          width="50%"
          placeholder="Last Name"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          value={lastName}
        ></Input>
        <Input
          my={2}
          width="50%"
          placeholder="comment..."
          onChange={(e) => {
            setComment(e.target.value);
          }}
          value={comment}
        ></Input>
      </Flex>
    </Flex>
  );
};
export default DoctorRequest;
