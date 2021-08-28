import { TriangleDownIcon } from "@chakra-ui/icons";
import {
	Avatar,
	Button,
	Flex,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Text,
	Divider,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../../App";
import { backgroundImageGradient, secondaryColor } from "../utils/colors";

export const Navbar = () => {
	const history = useHistory();

	const context = useContext(UserContext);

	const goHome = () => {
		history.push("/");
	};
  
  const goToChat = () => {
    history.push("/chat");
  }
  const goToMail = () => {
    history.push("/mail");
  }
  const goToInfostation = () =>{
    history.push("/infostation");
  }

	const handleLogout = () => {
		context.logOut();
		history.push("/");
	};
	return (
		<Flex
      background={backgroundImageGradient}
			width="100vw"
			height="60px"
			borderBottom="0.5px solid black"
			justifyContent="space-between"
			alignItems="center"
      paddingLeft="5">
			<Flex 
      >
				<Button 
        background="white"
        colorScheme={secondaryColor} mx={3} onClick={goHome}
          fontFamily="sans-serif"
						fontSize="24"
						fontWeight="bold"
						color="black"
						alignSelf="center"
            >
						Home
				</Button>

        <Button 
        background="white"
        colorScheme={secondaryColor} mx={3} onClick={goToInfostation}
          fontFamily="sans-serif"
						fontSize="24"
						fontWeight="bold"
						color="black"
						alignSelf="center"
            >
						Infostation
				</Button>
        <Button 
        background="white"
        colorScheme={secondaryColor} mx={3} onClick={goToChat}
          fontFamily="sans-serif"
						fontSize="24"
						fontWeight="bold"
						color="black"
						alignSelf="center"
            >
						Live Chat
				</Button>
        <Button 
        background="white"
        colorScheme={secondaryColor} mx={3} onClick={goToMail}
          fontFamily="sans-serif"
						fontSize="24"
						fontWeight="bold"
						color="black"
						alignSelf="center"
            >
						Mail 
				</Button>
			</Flex>

			<Menu>
				<Flex>

					<Divider />

					<MenuItem>
						<Button
							fontSize="18px"
							width="100%"
							display="flex"
							justifyContent="center"
							onClick={handleLogout}>
							Log out
						</Button>
					</MenuItem>
				</Flex>

			</Menu>
		</Flex>
	);
};