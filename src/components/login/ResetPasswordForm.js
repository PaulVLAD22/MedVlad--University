import { useLocation } from 'react-router-dom'
import {
    Button,
    Container,
    FormControl,
    FormLabel,
    Input,
    Link,
    Text,
    Center
} from "@chakra-ui/react";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../App";
import { GiPlagueDoctorProfile } from 'react-icons/gi'
import { primaryColor, secondaryColor, backgroundColorCode, backgroundImageGradient, errorColor } from "../utils/colors"
import axios from "axios";
import { useHistory } from 'react-router';

const ResetPasswordForm = () => {
    const location = useLocation();
    const history = useHistory();
    const [render, setRender] = useState(0);
    const [badToken, setBadToken] = useState(false)
    const [userEmail, setUserEmail] = useState("")
    const [error, setError] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [token, setToken] = useState("")

    useEffect(async () => {
        console.log(location.pathname);
        let token = location.pathname.substr(15, location.pathname.length)
        setToken(token);
        console.log(token)

        let url = "/verifyToken";

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        };

        await axios({
            method: "GET",
            url: url,
            headers: config.headers,
            params: { "token": token }
        }).then(
            (response) => {
                console.log(response.data)
                setUserEmail(response.data)
            },
            (getError) => {
                if (getError.response.status == 470) {
                    setBadToken(true);
                }
            }
        );

    }, [render])

    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return
        }

        let url = "/resetPassword";

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        };

        await axios({
            method: "PUT",
            url: url,
            headers: config.headers,
            params: { email: userEmail, password: password, token: token }
        }).then(
            (response) => {
                console.log(response.data);
                setError("Your password was just reset.")
                history.push("/login")
            },
            async (getError) => {
            }
        )
    }


    return (
        <>

            <Center
                width="100vw"
                height="100vh"
                backgroundColor={primaryColor}
            >
                <div
                    style={{
                        width: "100vw",
                        height: "90vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    <form onSubmit={submitHandler}>
                        <Container
                            width="min(400px,100vw)"
                            boxShadow="2xl"
                            p="10"
                            borderRadius="10"
                            centerContent={true}
                            backgroundColor="white">
                            {error != "" && (
                                <Text my={1} fontSize="lg" color={errorColor}>
                                    {error}
                                </Text>
                            )}
                            <Text
                                letterSpacing="8px"
                                p="5"
                                fontWeight="semibold"
                                fontSize="4xl"
                               >
                                MedLine
                                <GiPlagueDoctorProfile style={{ display: "inline-block", position: "relative", top: '-3px' }}></GiPlagueDoctorProfile>
                            </Text>
                            {!badToken ?
                                <>
                                    <FormControl>
                                        <FormLabel>Password</FormLabel>
                                        <Input
                                            required={true}
                                            size="md"
                                            variant="flushed"
                                            type="password"
                                            onChange={(e) => {
                                                setPassword(e.target.value);
                                            }}
                                            value={password}
                                        />
                                        <FormLabel>Confirm Password</FormLabel>
                                        {password !== confirmPassword && (
                                            <Text color={errorColor}>Your passwords must match.</Text>
                                        )}
                                        <Input
                                            required={true}
                                            size="md"
                                            variant="flushed"
                                            type="password"
                                            onChange={(e) => {
                                                setConfirmPassword(e.target.value);
                                            }}
                                            value={confirmPassword}
                                        />
                                    </FormControl>
                                    <Button mt={4} colorScheme={secondaryColor} size="md" type="submit">
                                        Reset Password
                                    </Button>
                                </>
                                :
                                <Text>Bad Token</Text>
                            }
                            <Link href="/login" my={2}>
                                Log in
                            </Link>
                        </Container>
                    </form>
                </div>
            </Center>

        </>
    )

}
export default ResetPasswordForm