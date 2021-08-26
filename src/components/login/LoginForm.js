import {
	Button,
	Container,
	FormControl,
	FormLabel,
	Input,
	Link,
	Text,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import { GiPlagueDoctorProfile } from 'react-icons/gi'
import { primaryColor, secondaryColor,backgroundColorCode,backgroundImageGradient, errorColor } from "../utils/colors"

const LoginForm = ({ Login, error }) => {
	console.log(backgroundColorCode)
	const [details, setDetails] = useState({ email: "", password: "" });
	const context = useContext(UserContext);

	const submitHandler = (e) => {
		e.preventDefault();
		Login(details);
	};

	const handleLogin = () => {

		context.logIn(details);
	};

	return (
		<div
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
						border="1px"
						borderColor = "white"
						backgroundColor="white">
						<Text
							letterSpacing="5px"
							p="5"
							fontWeight="semibold"
							fontSize="4xl"
							color={primaryColor}>
							MedLine
							<GiPlagueDoctorProfile style={{ display: "inline-block", position: "relative", top: '-3px' }}></GiPlagueDoctorProfile>
						</Text>

						{error != "" && (
							<Text fontSize="lg" color={errorColor}>
								{error}
							</Text>
						)}
						<FormControl>
							<FormLabel htmlFor="email">Username:</FormLabel>
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
							<FormLabel htmlFor="password">Password</FormLabel>
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
								value={details.password}
							/>
						</FormControl>
						<Button mt={4} colorScheme={secondaryColor} size="md" onClick={handleLogin}>
							Log in
						</Button>

						<Link href="/register" my={2}>
							Sign Up
						</Link>
					</Container>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;