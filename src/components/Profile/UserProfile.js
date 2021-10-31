import { Center, Flex } from "@chakra-ui/layout"
import { Button, Input, Img, Text } from "@chakra-ui/react"
import { UserContext } from "../../App";
import { useContext, useEffect, useState } from "react"
import axios from 'axios'
import Question from "../QuestionsBox/Question";
const UserProfile = ({ user }) => {
    const context = useContext(UserContext)
    const [render, setRender] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [changeFirstName, setChangeFirstName] = useState(false)
    const [changeLastName, setChangeLastName] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
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
            params: { "username": user.username }
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
                            <Img src={user.profilePicture} />
                            <Text>{user.username}</Text>
                            <Text>User Points : {user.points}</Text>
                        </Flex>

                        <Flex flexDir="column" width="50%" my="2">
                            <Center flexDir="row">
                                <Text>
                                    First name : {user.firstName ? user.firstName : "Unknown"}
                                </Text>
                                {(context.userInfo.username == user.username && user.firstName == null) &&
                                    <Button mx="2" size="xs" onClick={() => setChangeFirstName(!changeFirstName)}>
                                        Change
                                    </Button>}
                                {changeFirstName &&
                                    <Flex flexDir="row" alignItems="center">
                                        <Input onChange={(e) => { setFirstName(e.target.value) }} value={firstName} />
                                        <Button size="xs">Set</Button>
                                    </Flex>
                                }
                            </Center>
                            <Center flexDir="row">
                                <Text>
                                    Last name : {user.lastName ? user.lastName : "Unknown"}
                                </Text>
                                {(context.userInfo.username == user.username && user.firstName == null) &&
                                    <Button mx="2" size="xs" onClick={() => setChangeLastName(!changeLastName)}>
                                        Change
                                    </Button>}
                                {changeLastName &&
                                    <Flex flexDir="row" alignItems="center">
                                        <Input onChange={(e) => { setLastName(e.target.value) }} value={lastName} />
                                        <Button size="xs">Set</Button>
                                    </Flex>
                                }
                            </Center>
                        </Flex>
                    </Center>
                    <Flex my="2" flexDir="column" alignItems="start">
                        <Text>Infostation History:</Text>
                        <Flex flexDir="column" my="1" width="100%">

                            {questions.map((question, index) => {
                                return <Question key={index}
                                    author={question.userDto}
                                    content={question.content}
                                    answers={question.questionAnswerList}
                                />
                            })}

                        </Flex>
                    </Flex>
                    <Flex width="50%" my="2">
                        <Text>Doctors user interacted with:</Text>
                        <Text>Poti sa faci bazat pe cu cine are mail-uri.</Text>
                    </Flex>
                    <Flex width="50%" my="2">
                        <Text textAlign="left">As putea face ca doctorii sa dea un rating la pacienti. Si verific daca au comunicat inainte pe chat/mail.</Text>
                    </Flex>


                </Flex>
            </Center>
        </Center>
    )
}
export default UserProfile