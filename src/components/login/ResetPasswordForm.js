import {
    Button, Center, Container,
    FormControl,
    FormLabel,
    Input,
    Link,
    Text
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { GiPlagueDoctorProfile } from 'react-icons/gi';
import { useHistory, useParams } from 'react-router';
import { useLocation } from 'react-router-dom';
import { errorColor, primaryColor, secondaryColor } from "../utils/colors";

const ResetPasswordForm = () => {
    const location = useLocation();
    const history = useHistory();
    const [render, setRender] = useState(0);
    const [badToken, setBadToken] = useState(false)
    const [email,setEmail] = useState("")
    const [error, setError] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const params = useParams()
    let token = params.token;
    let emailParam = params.email

    useEffect(async () => {
        console.log(location.pathname);
    
        setEmail(old => emailParam)
        console.log(token)
        console.log(email)
        console.log(emailParam)
        console.log("Mai sus e email")

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
            params: { "token": token, "email":emailParam }
        }).then(
            (response) => {
                console.log(response.data)
            },
            (getError) => {
                if (getError.response.status == 475) {
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
            params: { email: emailParam, password: password}
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