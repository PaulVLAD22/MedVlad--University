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
import { GiPlagueDoctorProfile } from 'react-icons/gi'
import { primaryColor, secondaryColor, backgroundColorCode, backgroundImageGradient, errorColor } from "../utils/colors"
import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import { apiClient } from "../utils/apiClient";

const SignupForm = () => {
    const [render,setRender] = useState(0)
    const [details, setDetails] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        licensePicture:""
    });
    
    const context = useContext(UserContext);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (details.password == details.confirmPassword) {
            context.signUp(details,"USER")
            setDetails({
                email: "",
                username: "",
                password: "",
                confirmPassword: "",
                licensePicture:""
            })
        }
    };

    return (
        <Center
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
                        borderColor="white"
                        backgroundColor="white"
                    >
                        {context.error != "" && (
                            <Text my={1} fontSize="lg" color={errorColor}>
                                {context.error}
                            </Text>
                        )}
                        <Text
                            letterSpacing="8px"
                            p="5"
                            fontWeight="semibold"
                            fontSize="4xl"
                            color={primaryColor}
                        >
                            MedLine<GiPlagueDoctorProfile style={{ display: "inline-block", position: "relative", top: '-3px' }}></GiPlagueDoctorProfile>
                        </Text>
                        <FormControl>
                            <FormLabel htmlFor="email">Email:</FormLabel>
                            <Input
                                required={true}
                                size="md"
                                variant="flushed"
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
                                variant="flushed"
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
                            <Input
                                required={true}
                                size="md"
                                variant="flushed"
                                type="password"
                                name="password"
                                id="password"
                                onChange={(e) => {
                                    setDetails({ ...details, password: e.target.value });
                                }}
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
                                variant="flushed"
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
                        {/* <FormControl>
                            <FormLabel htmlFor="profilePicture">Profile Picture:</FormLabel>
                            <Input
                            type="file" id="profilePicture" name="profilePicture" accept="image/png, image/jpeg">
                            </Input>
                        </FormControl> */}
                        <Button mt={4} colorScheme={secondaryColor} size="md" type="submit">
                            Sign up
                        </Button>

                        <Link href="/login" my={2}>
                            Log in
                        </Link>
                        <Link href="/doctorSignup" my={2}>
                            Doctor Registration
                        </Link>
                    </Container>
                </form>
            </div>
        </Center>
    );
};

export default SignupForm;