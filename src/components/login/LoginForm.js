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

const LoginForm = () => {

	const [error, setError] = useState("")
	const [details, setDetails] = useState({ username: "", password: "" });
	const context = useContext(UserContext);

	const submitHandler = (e) => {
		e.preventDefault();
    console.log(details)
		if (details.username && details.password)
			context.logIn(details, (_)=>setError(_));
		else
			setError("Both fields must be completed");
	
	};

	return (
		<Center
			style={{
				width: "100vw",
				height: "100vh",
				backgroundColor: backgroundColorCode,
				backgroundImage: backgroundImageGradient
			}}>
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
							color={primaryColor}>
							MedLine
							<GiPlagueDoctorProfile style={{ display: "inline-block", position: "relative", top: '-3px' }}></GiPlagueDoctorProfile>
						</Text>


						<FormControl>
							<FormLabel htmlFor="username">Username:</FormLabel>
							<Input
								required={true}
								size="md"
								variant="flushed"
								name="username"
								id="username"
								onChange={(e) => {
									setDetails({ ...details, username: e.target.value });
								}}
								value={details.username}
							/>
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
						<Button mt={4} colorScheme={secondaryColor} size="md" type="submit">
							Log in
						</Button>

						<Link href="/register" my={2}>
							Sign Up
						</Link>
						<Link href="/forgotPassword" my={2}>Forgot Password</Link>
					</Container>
				</form>
			</div>
		</Center>
	);
};

export default LoginForm;