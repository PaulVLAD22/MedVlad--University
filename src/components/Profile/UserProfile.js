import { Box, Center, Flex } from "@chakra-ui/layout"
import { Button, Input, Img, Text } from "@chakra-ui/react"
import { UserContext } from "../../App";
import { useContext, useEffect, useState } from "react"
import axios from 'axios'
import Question from "../QuestionsBox/Question";
import { backgroundColorCode, secondaryColor } from "../utils/colors";
import { FiUser } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
const UserProfile = ({ user, reRenderPage }) => {
    const context = useContext(UserContext)
    const [render, setRender] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [changeFirstName, setChangeFirstName] = useState(false)
    const [changeLastName, setChangeLastName] = useState(false)
    const [changeProfilePicture, setChangeProfilePicture] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [profilePicture, setProfilePicture] = useState("")
    const [loading, setLoading] = useState(false)
    // fa folder profile

    useEffect(() => {
        //console.log(context.jwt);
        const loadQuestions = async () => {
            console.log("jwt:" + context.jwt)
            setLoading(true)
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
                    if (getError.response.status === 401) {
                        console.log("SE CHEAMA REFRESH TOKEN")
                        context.refreshAuthToken();
                        setRender(render + 1);
                    }
                }
            );
            setLoading(false)
        }
        loadQuestions();
    }, [render]);

    const updateFirstName = async () => {

        let url = "/user/updateFirstName";

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
            params: { "firstName": firstName }
        }).then(
            (response) => {
                console.log(response.data)
                context.setUserInfo({ ...context.userInfo, "firstName": firstName })
                localStorage.setItem("userInfo", JSON.stringify({ ...JSON.parse(localStorage.getItem("userInfo")), "firstName": firstName }))
                setFirstName("")
                setChangeFirstName(false)
                reRenderPage()
                //nu e bine
            },
            async (getError) => {
                if (getError.response.status === 401) {
                    console.log("SE CHEAMA REFRESH TOKEN")
                    context.refreshAuthToken();
                    setRender(render + 1);
                }
            }
        );
    };



    const updateLastName = async () => {
        let url = "/user/updateLastName";

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
            params: { "lastName": lastName }
        }).then(
            (response) => {
                console.log(response.data)
                context.setUserInfo({ ...context.userInfo, "lastName": lastName })
                localStorage.setItem("userInfo", JSON.stringify({ ...JSON.parse(localStorage.getItem("userInfo")), "lastName": lastName }))
                setLastName("")
                setChangeLastName(false)
                setRender(render + 1)
                reRenderPage()
                //nu se render-uiestre bine
            },
            async (getError) => {
                if (getError.response.status === 401) {
                    console.log("SE CHEAMA REFRESH TOKEN")
                    context.refreshAuthToken();
                    setRender(render + 1);
                }
            }
        );
    }
    const updateProfilePicture = async () => {
        console.log("update profile pciture")
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
            params: { "profilePicture": profilePicture }
        }).then(
            (response) => {
                context.setUserInfo({ ...context.userInfo, "profilePicture": profilePicture })
                localStorage.setItem("userInfo", JSON.stringify({ ...JSON.parse(localStorage.getItem("userInfo")), "profilePicture": profilePicture }))
                setProfilePicture("")
                setChangeProfilePicture(false)
                setRender(render + 1)
                reRenderPage()
            },
            async (getError) => {
                if (getError.response.status === 401) {
                    console.log("SE CHEAMA REFRESH TOKEN")
                    context.refreshAuthToken();
                    updateProfilePicture()
                    setRender(render + 1);
                }
            }
        );
    }

    return (
        <Center width="100%">
            <Center >
                {console.log(context.jwt)}
                <Flex
                    position="relative"
                    flexDirection="column"
                    overflowY="auto"
                    width="min(1024px,100vw)"
                    height="100%"
                    boxShadow="dark-lg"
                    backgroundColor="gray.50"
                    p={5}
                >
                    <Text position="absolute" right="5%" padding="2"
                        letterSpacing="wide" fontWeight="500">Joined on : {user.dateOfRegistration}</Text>
                    <Flex flexDir="column" alignItems="center" >
                        <Box mb="5"><FiUser size="100" /></Box>
                        <Flex flexDir="column" alignItems="center">
                            <Img maxHeight="200px" maxWidth="200px" src={context.userInfo.username == user.username ? context.userInfo.profilePicture : user.profilePicture} />
                            {(context.userInfo.username == user.username) &&
                                <Button my="1.5" size="xs" onClick={() => setChangeProfilePicture(!changeProfilePicture)}>
                                    Change profile picture
                                </Button>}
                            {changeProfilePicture &&
                                <Flex flexDir="row" alignItems="center">
                                    <Input onChange={(e) => { setProfilePicture(e.target.value) }} value={profilePicture} />
                                    <Button size="xs" onClick={updateProfilePicture}>Set</Button>
                                </Flex>
                            }
                            <Text fontWeight="bold" fontSize="x-large" fontFamily="cursive" >{user.username}</Text>
                            <Text mt="2" fontWeight="500">User Points : {user.points}</Text>
                        </Flex>

                        <Flex flexDir="column" width="50%" my="2">
                            <Center my="1" flexDir="column">
                                <Text>
                                    First name : {user.firstName ? user.firstName : "Unknown"}
                                </Text>
                                {(context.userInfo.username == user.username) &&
                                    <Button mx="2" size="xs" onClick={() => setChangeFirstName(!changeFirstName)}>
                                        Change
                                    </Button>}
                                {changeFirstName &&
                                    <Flex flexDir="row" alignItems="center">
                                        <Input onChange={(e) => { setFirstName(e.target.value) }} value={firstName} />
                                        <Button size="xs" onClick={updateFirstName}>Set</Button>
                                    </Flex>
                                }
                            </Center>
                            <Center my="1" flexDir="column">
                                <Text>
                                    Last name : {user.lastName ? user.lastName : "Unknown"}
                                </Text>
                                {(context.userInfo.username == user.username) &&
                                    <Button mx="2" size="xs" onClick={() => setChangeLastName(!changeLastName)}>
                                        Change
                                    </Button>}
                                {changeLastName &&
                                    <Flex flexDir="row" alignItems="center">
                                        <Input onChange={(e) => { setLastName(e.target.value) }} value={lastName} />
                                        <Button size="xs" onClick={updateLastName}>Set</Button>
                                    </Flex>
                                }
                            </Center>
                        </Flex>
                    </Flex>
                    <Flex my="2" flexDir="column" alignItems="start">
                        <Text fontWeight="bold" >Infostation History:</Text>
                        <Flex flexDir="column" my="1" width="100%" alignItems="center">
                            {loading == false ?
                                questions.map((question, index) => {
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
                                })
                                :
                                <Box my="10">
                                    <AiOutlineLoading3Quarters fontSize="30px" />
                                </Box>
                            }

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
    )
}
export default UserProfile