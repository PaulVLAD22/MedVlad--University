import { Flex, Center, Box, Text, Button, Img, Input } from "@chakra-ui/react";
import { TiTick } from "react-icons/ti";
import { AiFillStop, AiOutlineStop } from "react-icons/ai";
import axios from "axios";
import { UserContext } from "../../../../App";
import { useContext, useState } from "react";
const DoctorRequest = ({ user }) => {
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
        window.location.reload();
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
    <Flex height="400px" width="min(100%,720px)" flexDir="column">
      <Flex width="100%" mb="10">
        <Box>
          <Img height="100%" src={user.licensePicture}></Img>
        </Box>
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
        </Flex>
      </Flex>

      <Flex width="100%" flexDir="column" alignItems="center">
        <Flex width="100%" justifyContent="space-between" fontSize="larger">
          <Button>
            <AiFillStop onClick={()=>sendRequestResponse(false)}></AiFillStop>
          </Button>
          <Button>
            <TiTick onClick={()=>sendRequestResponse(true)}></TiTick>
          </Button>
        </Flex>
        <Input
          my={2}
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
export default DoctorRequest;
