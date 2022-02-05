import { Flex, Center, Text } from "@chakra-ui/react";
import UserRequest from "./adminRequests/UserRequest";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../App";

const AcceptUsersPage = ({ reRenderPage }) => {
  const context = useContext(UserContext);
  const [requests, setRequests] = useState([]);
  const [render, setRender] = useState(0);

  useEffect(() => {
    const loadUsers = async () => {
      let url = "/admin/getInactiveUsers";

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
          console.log(response.data);
          setRequests(response.data);
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
    loadUsers();
  }, [render]);

  return (
    <Center width="100%" height="100%" overflow="auto">
      {requests.length == 0 && <Text>No User Requests</Text>}
      {requests.length != 0 && (
        <Flex
          flexDir="column"
          px="5"
          width="min(1024px,100%)"
          height="70%"
          overflow="auto"
          alignItems="center"
        >
          {requests.map((user, index) => {
            console.log(user);
            return (
              <UserRequest
                key={index}
                user={user}
                reRenderPage={() => setRender(render + 1)}
              />
            );
          })}
        </Flex>
      )}
    </Center>
  );
};
export default AcceptUsersPage;
