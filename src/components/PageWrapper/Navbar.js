import { Button, Flex, Menu, Text, Box } from "@chakra-ui/react";
import React, { useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { UserContext } from "../../App";
import { backgroundImageGradient, secondaryColor } from "../utils/colors";
import { AiOutlineBars } from "react-icons/ai";
import { primaryFont } from "../utils/colors";
export const Navbar = ({ toggle }) => {
  const history = useHistory();
  
  const context = useContext(UserContext);
  console.log(context)

  const goHome = () => {
    history.push("/");
  };

  const goToChat = () => {
    history.push("/chat");
  };
  const goToMail = () => {
    history.push("/mail");
  };
  const goToInfostation = () => {
    history.push("/infostation");
  };

  const handleLogout = () => {
    context.logOut();
    history.push("/");
  };
  return (
    <Flex
      background={backgroundImageGradient}
      width="100vw"
      height="70px"
      borderBottom="0.5px solid black"
      justifyContent="space-between"
      alignItems="center"
      paddingX="5"
    >
      <LeftNavMenu>
        <Button
          background="white"
          colorScheme={secondaryColor}
          mx={3}
          onClick={goHome}
          fontFamily="sans-serif"
          fontSize="20"
          fontWeight="bold"
          color="black"
          alignSelf="center"
        >
          Home
        </Button>

        <Button
          background="white"
          colorScheme={secondaryColor}
          mx={3}
          onClick={goToInfostation}
          fontFamily="sans-serif"
          fontSize="20"
          fontWeight="bold"
          color="black"
          alignSelf="center"
        >
          Infostation
        </Button>
        <Button
          background="white"
          colorScheme={secondaryColor}
          mx={3}
          onClick={goToChat}
          fontFamily="sans-serif"
          fontSize="20"
          fontWeight="bold"
          color="black"
          alignSelf="center"
        >
          Live Chat
        </Button>
        <Button
          background="white"
          colorScheme={secondaryColor}
          mx={3}
          onClick={goToMail}
          fontFamily="sans-serif"
          fontSize="20"
          fontWeight="bold"
          color="black"
          alignSelf="center"
        >
          Mail
        </Button>
      </LeftNavMenu>

      <Flex
        justifyContent="space-between"
        alignItems="center"
        
      >
        <Box width="100%">
          <Text
            fontSize="2xl"
            color="black"
            padding="3"
            px="5"
            fontWeight="bold"
            fontFamily={primaryFont}
            letterSpacing="wider"
          >
            Hello {context.userInfo.username}
          </Text>
        </Box>
        <Button
          fontSize="18px"
          width="100px"
          display="flex"
          justifyContent="center"
          onClick={handleLogout}
        >
          Log out
        </Button>
        <MobileIcon onClick={toggle}>
          <AiOutlineBars />
        </MobileIcon>
      </Flex>
    </Flex>
  );
};

export const MobileIcon = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
    color: white;
  }
`;
export const LeftNavMenu = styled.div`
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
