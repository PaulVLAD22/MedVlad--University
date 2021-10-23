import { Flex, Center, Text } from "@chakra-ui/react";
import UserRequest from "./adminRequests/UserRequest";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../App";

const AcceptUsersPage = () => {
  const context = useContext(UserContext);
  const [requests, setRequests] = useState([]);
  const [render, setRender] = useState(0);

  //TODO :: FA SA ACCEPTE SI SA REFUZE (REFUZA => SE STERGE DIN DB SI TRIMITE EMAIL)

  useEffect(async () => {
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
        if (getError.response.status === 403) {
          console.log("SE CHEAMA REFRESH TOKEN");
          context.refreshAuthToken();
          setRender(render + 1);
        }
      }
    );
  }, [render]);

  return (
    <Center width="100%" height="100%" overflow="auto">
      <Flex
        flexDir="column"
        border="1px solid black"
        width="min(1024px,100%)"
        height="70%"
        overflow="auto"
        alignItems="center"
      >
        <Text>
          {" "}
          Gandeste-te cum faci useful pagina asta (sa aiba mai multe de
          verificat admin-ul)
        </Text>
        {requests.map((user, index) => {
          console.log(user)
          return (
            <UserRequest
              key={index}
              user = {user}
            />
          );
        })}
      </Flex>
    </Center>
  );
};
export default AcceptUsersPage;
