import { Box, Center, Flex } from "@chakra-ui/layout";
import { Button, Input, Img, Text } from "@chakra-ui/react";
import { UserContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Question from "../QuestionsBox/Question";
import { RiAdminFill } from "react-icons/ri";

const AdminProfile = ({ user, reRenderPage }) => {
  const context = useContext(UserContext);
  const [render, setRender] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [changeFirstName, setChangeFirstName] = useState(false);
  const [changeLastName, setChangeLastName] = useState(false);
  const [changeProfilePicture, setChangeProfilePicture] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    //console.log(context.jwt);
    const loadQuestions = async () => {
      console.log("jwt:" + context.jwt);
      let url = "/getQuestionsForUser";

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
        params: { username: user.username },
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

  const updateFirstName = async () => {
    let url = "/updateFirstName";

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
      params: { firstName: firstName },
    }).then(
      (response) => {
        console.log(response.data);
        setFirstName("");
        setChangeFirstName(false);
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

  const updateLastName = async () => {
    let url = "/updateLastName";

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
      params: { lastName: lastName },
    }).then(
      (response) => {
        console.log(response.data);
        setLastName("");
        setChangeLastName(false);
        setRender(render + 1);
        reRenderPage();
        //nu se render-uiestre bine
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
  const updateProfilePicture = async () => {
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
        context.setUserInfo({
          ...context.userInfo,
          profilePicture: profilePicture,
        });
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            ...JSON.parse(localStorage.getItem("userInfo")),
            profilePicture: profilePicture,
          })
        );

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
            Joined on : {user.dateOfRegistration || "Unknown Error"}
          </Text>

          <Flex flexDir="column" alignItems="center">
            <Flex flexDir="column" alignItems="center">
              <Box mb="5">
                <RiAdminFill size="100" />
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
                <Flex flexDir="row" alignItems="center">
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
                {context.userInfo.username == user.username &&
                  user.firstName == null && (
                    <Button
                      mx="2"
                      size="xs"
                      onClick={() => setChangeFirstName(!changeFirstName)}
                    >
                      Change
                    </Button>
                  )}
                {changeFirstName && (
                  <Flex flexDir="row" alignItems="center">
                    <Input
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                      value={firstName}
                    />
                    <Button size="xs" onClick={updateFirstName}>
                      Set
                    </Button>
                  </Flex>
                )}
              </Center>
              <Center flexDir="row">
                <Text>
                  Last name : {user.lastName ? user.lastName : "Unknown"}
                </Text>
                {context.userInfo.username == user.username &&
                  user.lastName == null && (
                    <Button
                      mx="2"
                      size="xs"
                      onClick={() => setChangeLastName(!changeLastName)}
                    >
                      Change
                    </Button>
                  )}
                {changeLastName && (
                  <Flex flexDir="row" alignItems="center">
                    <Input
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                      value={lastName}
                    />
                    <Button size="xs" onClick={updateLastName}>
                      Set
                    </Button>
                  </Flex>
                )}
              </Center>
            </Flex>
          </Flex>
          <Flex my="2" flexDir="column" alignItems="start"></Flex>
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
export default AdminProfile;
