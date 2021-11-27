import { Center } from "@chakra-ui/react";
import DoctorRequest from "./adminRequests/DoctorRequest";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../../App";
import { request } from "https";
import { Text } from "@chakra-ui/layout";
const AcceptDoctorsPage = ({ reRenderPage }) => {
  const context = useContext(UserContext);
  const [request, setRequest] = useState({});
  const [render, setRender] = useState(0);

  //TODO :: FA SA ACCEPTE SI SA REFUZE (REFUZA => SE STERGE DIN DB SI TRIMITE EMAIL)

  useEffect(() => {
    const getDoctor = async () => {
      let url = "/admin/getLastInactiveDoctor";

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
          setRequest(response.data);
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
    getDoctor();
  }, [render]);
  return (
    <Center width="100%" height="100%">
      {request.username != null &&
        <DoctorRequest
          user={request}
          reRenderPage={() => setRender(render + 1)}
        />
      }
      {request.username == null &&
        <Text>No Doctor Requests</Text>
      }
    </Center>
  );
};
export default AcceptDoctorsPage;
