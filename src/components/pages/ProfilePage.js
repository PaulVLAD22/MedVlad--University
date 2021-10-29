import { Center, Flex } from "@chakra-ui/layout"
import { Button, Input, Img, Text } from "@chakra-ui/react"
import { UserContext } from "../../App";
import { useContext, useEffect, useState } from "react"
import axios from 'axios'

const ProfilePage = () => {
    const [render, setRender] = useState(0);
    const [questions, setQuestions] = useState([]);
    // fa folder profile

    useEffect(async () => {
        //console.log(context.jwt);
        console.log("jwt:" + context.jwt)
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
        }).then(
            (response) => {
                console.log(response.data)
                setQuestions(response.data);

            },
            async (getError) => {
                if (getError.response.status === 403) {
                    console.log("SE CHEAMA REFRESH TOKEN")
                    context.refreshAuthToken();
                    setRender(render + 1);
                }
            }
        );
    }, [render]);
    const context = useContext(UserContext);
    return (
        <Center width="100%">
            <Center>
                {console.log(context.jwt)}
                <Flex
                    position="relative"
                    flexDirection="column"
                    overflowY="auto"
                    width="min(1024px,100vw)"
                    height="100vh"
                    boxShadow="dark-lg"

                    p={5}
                >
                    <Center flexDir="column">
                        <Flex flexDir="column">
                            <Img src={context.userInfo.profilePicture} />
                            <Text>{context.userInfo.username}</Text>
                        </Flex>

                        <Flex flexDir="column" width="50%" my="2">
                            <Text>
                                First name : {context.userInfo.firstName ? context.userInfo.firstName : "Unknown"}
                            </Text>
                            <Text>
                                Last name : {context.userInfo.lastName ? context.userInfo.lastName : "Unknown"}
                            </Text>
                        </Flex>
                    </Center>
                    <Flex width="50%" my="2" flexDir="column" alignItems="start">
                        <Text>Infostation History:</Text>
                        <Flex flexDir="column" my="1">
                            {// AFISEAZA DIFERIT }
                            }
                            {questions.map((question, index) => {
                                return <Text>{question.content}</Text>
                            })}
                        </Flex>
                    </Flex>
                    <Flex width="50%" my="2">
                        <Text>Doctors interacted with:</Text>
                    </Flex>
                    <Flex width="50%" my="2">
                        <Text textAlign="left">As putea face ca doctorii sa dea un rating la pacienti. Si verific daca au comunicat inainte pe chat/mail.</Text>
                    </Flex>


                </Flex>
            </Center>
        </Center>
    )
}
export default ProfilePage