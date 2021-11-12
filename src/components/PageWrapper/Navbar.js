import { Button, Flex, Menu, Text, Box, Img } from "@chakra-ui/react";
import React, { useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { UserContext } from "../../App";
import { backgroundImageGradient, primaryColor, secondaryColor } from "../utils/colors";
import { AiOutlineBars } from "react-icons/ai";
import { primaryFont } from "../utils/colors";
export const Navbar = ({ toggle }) => {
  const history = useHistory();

  const context = useContext(UserContext);
  console.log(context);

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

  const goAcceptUsers = () => {
    history.push("/acceptUsers");
  };
  const goAccept = () => {
    history.push("/accept")
  }
  const goAcceptDoctors = () => {
    history.push("/acceptDoctors");
  };
  const goAcceptanceHistory = () => {
    history.push("/acceptanceHistory");
  };
  const goAcceptQuestions = () => {
    history.push("/acceptQuestions");
  };
  const goAnswerQuestions = () => {
    history.push("/answerQuestions");
  };
  const goToProfile = () => {
    history.push("/profile")
    window.location.reload()
  }
  const goBanUser = () => {
    history.push("/banUser")
  }

  const handleLogout = () => {
    history.push("/");
    context.logOut();
  };
  return (

    <Flex
      background={primaryColor}
      width="100vw"
      height="70px"

      justifyContent="space-between"
      alignItems="center"
      paddingX="5"
    >
      {console.log(context)}
      <LeftNavMenu>
        <Button
          background="white"
          mx={3}
          onClick={goHome}
          fontSize="lg"
          color="black"
          letterSpacing="wider"
        >
          Home
        </Button>
        {context.userInfo.role == "DOCTOR" && (
          <>
            <Button
              background="white"

              mx={3}
              onClick={goAnswerQuestions}
              fontSize="lg"
              color="black"
              letterSpacing="wider"
            >
              Answer Questions
            </Button>
            <Button
              background="white"

              mx={3}
              onClick={goToChat}
              fontSize="lg"
              color="black"
              letterSpacing="wider"
            >
              Live Session
            </Button>
            <Button
              background="white"

              mx={3}
              onClick={goToMail}
              fontSize="lg"
              color="black"
              letterSpacing="wider"
            >
              Messages
            </Button>
          </>
        )}
        {context.userInfo.role == "ADMIN" && (
          <>
            <Button
              background="white"

              mx={3}
              onClick={goAccept}
              fontSize="lg"
              color="black"
              letterSpacing="wider"
            >
              Accept
            </Button>

            <Button
              background="white"

              mx={3}
              onClick={goBanUser}
              fontSize="lg"
              color="black"
              letterSpacing="wider"
            >
              Ban User
            </Button>

            <Button
              background="white"

              mx={3}
              onClick={goAcceptanceHistory}
              fontSize="lg"
              color="black"
              letterSpacing="wider"
            >
              History
            </Button>
            <Button
              background="white"

              mx={3}
              onClick={goToInfostation}
              fontSize="lg"
              color="black"
              letterSpacing="wider"
            >
              Infostation
            </Button>

          </>
        )}
        {context.userInfo.role == "USER" && (
          <>
            <Button
              background="white"

              mx={3}
              onClick={goToInfostation}
              fontSize="lg"
              color="black"
              letterSpacing="wider"
            >
              Infostation
            </Button>
            <Button
              background="white"

              mx={3}
              onClick={goToChat}
              fontSize="lg"
              color="black"
              letterSpacing="wider"
            >
              Live Session
            </Button>
            <Button
              background="white"

              mx={3}
              onClick={goToMail}
              fontSize="lg"
              color="black"
              letterSpacing="wider"
            >
              Messages
            </Button>
          </>
        )}
      </LeftNavMenu>

      <Flex justifyContent="space-between" alignItems="center">
        <Flex width="100%" alignItems="center">

          <Button
            padding="3"
            px="5"
            mx="2"
            letterSpacing="wider"
            onClick={() => goToProfile()}
          >
            {context.userInfo.role +
              " " +
              context.userInfo.username}
          </Button>

          <Img
            maxH="50px"
            src={context.userInfo.profilePicture}
          />
        </Flex>
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
  @media screen and (max-width: 1000px) {
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
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
