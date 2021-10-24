import { Center, Flex } from "@chakra-ui/react";
import AcceptedRequest from "./adminRequests/AcceptedRequest";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../App";

const HistoryPage = () => {
  const context = useContext(UserContext);
  const [requests, setRequests] = useState([]);
  const [render, setRender] = useState(0);

  useEffect(async () => {
    let url = "/admin/getRegistrationResults";

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
    <Center width="100%" height="90%">
      <Flex
        flexDir="column"
        border="1px solid black"
        width="min(1024px,100%)"
        height="70%"
        overflow="auto"
        alignItems="center"
      >
        {requests.map((request,index)=>{
          console.log(request)
          return <AcceptedRequest 
          key={index}
          request={request}/>
        })}
      </Flex>
    </Center>
  );
};
export default HistoryPage;
