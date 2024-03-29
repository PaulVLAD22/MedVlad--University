import { Box, Center, Flex } from "@chakra-ui/layout";
import { Button, Input, Img, Text } from "@chakra-ui/react";
import { UserContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Question from "../QuestionsBox/Question";
import { GiPlagueDoctorProfile } from "react-icons/gi";
const DoctorProfile = ({ user, reRenderPage }) => {
  const context = useContext(UserContext);
  const [error, setError] = useState("");
  const [render, setRender] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [changeProfilePicture, setChangeProfilePicture] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    //console.log(context.jwt);
    const loadQuestions = async () => {
      console.log("jwt:" + context.jwt);
      let url = "/getQuestionsForDoctor";

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
        params: { doctorUsername: user.username },
      }).then(
        (response) => {
          console.log(response.data);
          setQuestions(response.data);
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
    loadQuestions();
  }, [render]);

  const updateProfilePicture = async () => {
    if (profilePicture.length > 200) {
      setError("Please input a shorter link");
      setProfilePicture("");
      return;
    }
    console.log("update profile pciture");
    let url = "/updateProfilePicture";

    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + context.jwt,
      },
    };

    await axios({
      method: "PUT",
      url: url,
      headers: config.headers,
      params: { profilePicture: profilePicture },
    }).then(
      (response) => {
        console.log(response.data);
        setProfilePicture("");
        setChangeProfilePicture(false);
        setRender(render + 1);
        reRenderPage();
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
    <Center width="100%">
      <Center>
        {console.log(context.jwt)}
        <Flex
          position="relative"
          flexDirection="column"
          overflowY="auto"
          width="min(1024px,100vw)"
          height="100%"
          boxShadow="dark-lg"
          p={5}
        >
          <Text
            position="absolute"
            right="5%"
            padding="2"
            letterSpacing="wide"
            fontWeight="500"
          >
            Joined on : {user.dateOfRegistration}
          </Text>

          <Flex flexDir="column" alignItems="center">
            <Flex flexDir="column" alignItems="center">
              <Box mb="5">
                <GiPlagueDoctorProfile size="100" />
              </Box>
              <Img
                maxHeight="200px"
                maxWidth="200px"
                src={user.profilePicture}
              />
              {context.userInfo.username == user.username && (
                <Button
                  my="1.5"
                  size="xs"
                  onClick={() => setChangeProfilePicture(!changeProfilePicture)}
                >
                  Change profile picture
                </Button>
              )}
              {changeProfilePicture && (
                <Flex flexDir="column" alignItems="center">
                  <Text color="red">{error}</Text>
                  <Input
                    onChange={(e) => {
                      setProfilePicture(e.target.value);
                    }}
                    value={profilePicture}
                  />
                  <Button size="xs" onClick={updateProfilePicture}>
                    Set
                  </Button>
                </Flex>
              )}
              <Text>{user.username}</Text>
            </Flex>

            <Flex flexDir="column" width="50%" my="2">
              <Center flexDir="row">
                <Text>
                  First name : {user.firstName ? user.firstName : "Unknown"}
                </Text>
              </Center>
              <Center flexDir="row">
                <Text>
                  Last name : {user.lastName ? user.lastName : "Unknown"}
                </Text>
              </Center>
            </Flex>
          </Flex>
          <Flex my="2" flexDir="column" alignItems="start">
            <Text fontWeight="bold">Infostation History:</Text>
            <Flex flexDir="column" my="1" width="100%" alignItems="center">
              {questions.map((question, index) => {
                return (
                  <Question
                    key={question.id}
                    id={question.id}
                    symptoms={question.symptoms}
                    author={question.userDto}
                    content={question.content}
                    answer={question.answer}
                    reRenderPage={() => setRender(render + 1)}
                  />
                );
              })}
            </Flex>
          </Flex>
          {/* <Flex width="50%" my="2">
                        <Text>Doctors user interacted with:</Text>
                        <Text>Poti sa faci bazat pe cu cine are mail-uri.</Text>
                    </Flex>
                    <Flex width="50%" my="2">
                        <Text textAlign="left">As putea face ca doctorii sa dea un rating la pacienti. Si verific daca au comunicat inainte pe chat/mail.</Text>
                    </Flex> */}
        </Flex>
      </Center>
    </Center>
  );
};
export default DoctorProfile;
