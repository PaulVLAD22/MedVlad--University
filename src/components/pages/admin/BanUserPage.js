import { Input } from "@chakra-ui/input";
import { Center, Flex, Text } from "@chakra-ui/layout";
import { useContext, useState } from "react";
import { UserContext } from "../../../App";
import axios from "axios";
import { Button } from "@chakra-ui/button";
import { ImUserMinus } from "react-icons/im";
const BanUserPage = () => {
  const context = useContext(UserContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  const [render, setRender] = useState(0);

  const deleteUser = async () => {
    let url = "/admin/deleteUser";
    setLoading(true);
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + context.jwt,
      },
    };

    await axios({
      method: "DELETE",
      url: url,
      headers: config.headers,
      params: { username: username, comment: comment },
    }).then(
      (response) => {
        console.log(response.data);
        setUsername("");
        setComment("");
        setError("");
        setLoading(false);
      },
      async (getError) => {
        if (getError.response.status === 401) {
          console.log("SE CHEAMA REFRESH TOKEN");
          context.refreshAuthToken();
          setRender(render + 1);
        }
        if (getError.response.status === 404) {
          setLoading(false);
          setError("Wrong username");
        }
      }
    );
  };

  return (
    <Center width="100%" height="100%" overflow="auto">
      <Center
        flexDir="column"
        width="min(1024px,100%)"
        height="70%"
        alignItems="center"
        flexDirection="column"
      >
        {loading && (
          <Text color="orange.400" my="5" fontSize="lg">
            Loading...
          </Text>
        )}
        <Text color="red" my="2" fontSize="lg">
          {error}
        </Text>
        <ImUserMinus size="100" />
        <Text fontSize="x-large" mt="10">
          Username:
        </Text>
        <Input
          placeholder="Username..."
          width="50%"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          value={username}
        />
        <Text fontSize="x-large" mt="2">
          Comment:
        </Text>
        <Input
          placeholder="Reason..."
          width="50%"
          onChange={(e) => {
            setComment(e.target.value);
          }}
          value={comment}
        />
        <Button mt="10" onClick={deleteUser}>
          {" "}
          Ban{" "}
        </Button>
      </Center>
    </Center>
  );
};
export default BanUserPage;
