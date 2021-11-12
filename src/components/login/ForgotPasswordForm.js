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
import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import { GiPlagueDoctorProfile } from 'react-icons/gi'
import { primaryColor, secondaryColor, backgroundColorCode, backgroundImageGradient, errorColor } from "../utils/colors"
import axios from "axios";

const ForgotPasswordForm = () => {
    const [error, setError] = useState("")
    const [email,setEmail] = useState("")

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log("send email")

        console.log(email)


        let url = "/forgotPassword";

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        };

        await axios({
            method: "POST",
            url: url,
            headers: config.headers,
            params: { email: email }
        }).then(
            (response) => {
                console.log(response.data);
                setError("You will receive an email shortly.")
            },
            async (getError) => {
            }
        )
    }

    return (
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
                            fontSize="4xl">
                            MedLine
                            <GiPlagueDoctorProfile style={{ display: "inline-block", position: "relative", top: '-3px' }}></GiPlagueDoctorProfile>
                        </Text>

                        <FormControl>
                            <FormLabel htmlFor="email">Email:</FormLabel>
                            <Input
                                required={true}
                                size="md"
                                variant="flushed"
                                name="email"
                                id="email"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                  }}
                                  value={email}
                            />
                        </FormControl>
                        <Button mt={4} colorScheme={secondaryColor} size="md" type="submit">
                            Send email
                        </Button>
                        <Link href="/login" my={2}>
                            Log in
                        </Link>
                    </Container>
                </form>
            </div>
        </Center>
    );
};

export default ForgotPasswordForm