import {
    Button,
    Container,
    FormControl,
    FormLabel,
    Input,
    Link,
    Text,
} from "@chakra-ui/react";
import { GiPlagueDoctorProfile } from 'react-icons/gi'
import { primaryColor, secondaryColor, backgroundColorCode, backgroundImageGradient, errorColor } from "../utils/colors"
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../../App";
import { apiClient } from "../utils/apiClient";

const SignupForm = () => {
    const [details, setDetails] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });
    const history = useHistory();
    const context = useContext(UserContext);

    const submitHandler = async () => {
        if (details.password != details.confirmPassword) {

            context.setError("Passwords don't match");
        } else {
            try {
                const res = await apiClient.post("/api/Account/Register", {
                    Email: details.email,
                    Username: details.username,
                    Password: details.password,
                    ConfirmPassword: details.confirmPassword,
                });

                context?.setError("");
                history.push("/login");
                history.go(0);
            } catch (err) {
                console.log(err.response.data.Message);

                context?.setError(err.response.data.Message ?? "An error has occcured");
            }
        }
    };

    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                backgroundColor: backgroundColorCode,
                backgroundImage: backgroundImageGradient
            }}
        >
            <div
                style={{
                    width: "100vw",
                    height: "90vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <form onSubmit={submitHandler}>
                    <Container
                        width="min(400px,100vw)"
                        boxShadow="2xl"
                        p="10"
                        borderRadius="10"
                        centerContent={true}
                        border="1px"
                        borderColor = "white"
                        backgroundColor="white"
                    >
                        <Text
                            letterSpacing="5px"
                            p="5"
                            fontWeight="semibold"
                            fontSize="4xl"
                            color={primaryColor}
                        >
                            MedLine<GiPlagueDoctorProfile style={{ display: "inline-block", position: "relative", top: '-3px' }}></GiPlagueDoctorProfile>
                        </Text>

                        {
                            //@ts-ignore
                            context.error != "" && (
                                <Text fontSize="lg" color={errorColor}>
                                    {
                                        //@ts-ignore
                                        context.error
                                    }
                                </Text>
                            )
                        }
                        <FormControl>
                            <FormLabel htmlFor="email">Email:</FormLabel>
                            <Input
                                required={true}
                                size="md"
                                variant="filled"
                                type="email"
                                name="email"
                                id="email"
                                onChange={(e) => {
                                    setDetails({ ...details, email: e.target.value });
                                }}
                                value={details.email}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="usename">Username:</FormLabel>
                            <Input
                                required={true}
                                size="md"
                                variant="filled"
                                name="usename"
                                id="usename"
                                onChange={(e) => {
                                    setDetails({ ...details, username: e.target.value });
                                }}
                                value={details.username}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            {
                                // !genericPasswordRegex.test(details.password) && (
                                //   <Text color="red.600">
                                //     Your password must contain at least 8 characters, a number,
                                //     uppercase and lowercase letters and a special character.
                                //   </Text>
                                //)
                            }

                            <Input
                                required={true}
                                size="md"
                                variant="filled"
                                type="password"
                                name="password"
                                id="password"
                                onChange={(e) => {
                                    setDetails({ ...details, password: e.target.value });
                                }}
                                error={details.password !== details.confirmPassword}
                                value={details.password}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                            {details.password !== details.confirmPassword && (
                                <Text color={errorColor}>Your passwords must match.</Text>
                            )}
                            <Input
                                required={true}
                                size="md"
                                variant="filled"
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                error={details.password !== details.confirmPassword}
                                onChange={(e) => {
                                    setDetails({ ...details, confirmPassword: e.target.value });
                                }}
                                value={details.confirmPassword}
                            />
                        </FormControl>
                        <Button mt={4} colorScheme={secondaryColor} size="md" onClick={submitHandler}>
                            Sign up
                        </Button>

                        <Link href="/login" my={2}>
                            Log in
                        </Link>
                    </Container>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;