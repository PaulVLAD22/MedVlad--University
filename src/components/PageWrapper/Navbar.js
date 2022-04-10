import { Button, Flex, Menu, Text, Box, Img } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../../App";
import {
  backgroundImageGradient,
  primaryColor,
  secondaryColor,
} from "../utils/colors";
import { AiOutlineBars } from "react-icons/ai";
import { primaryFont } from "../utils/colors";
import { useColorMode } from "@chakra-ui/react";
import { BsFillCloudMoonFill, BsFillSunFill } from "react-icons/bs";

const Navbar = ({ toggle }) => {
  const history = useHistory();
  const location = useLocation();
  const [darkColorMode, setDarkColorMode] = useState(false);
  const { toggleColorMode } = useColorMode();
  console.log(location.pathname);

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
    history.push("/accept");
  };
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
    history.push("/profile");
    if (location.pathname.includes("/profile/")) window.location.reload();
  };
  const goBanUser = () => {
    history.push("/banUser");
  };
  const goToDiagnosis = () => {
    history.push("/diagnosis");
  };

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
        {context.userInfo.role == "DOCTOR" && (
          <>
            <Button
              mx={3}
              onClick={goAnswerQuestions}
              fontSize="lg"
              letterSpacing="wider"
            >
              Answer Questions
            </Button>

            <Button
              mx={3}
              onClick={goToMail}
              fontSize="lg"
              letterSpacing="wider"
            >
              Messages
            </Button>
          </>
        )}
        {context.userInfo.role == "ADMIN" && (
          <>
            <Button
              mx={3}
              onClick={goAccept}
              fontSize="lg"
              letterSpacing="wider"
            >
              Accept
            </Button>

            <Button
              mx={3}
              onClick={goBanUser}
              fontSize="lg"
              letterSpacing="wider"
            >
              Ban User
            </Button>

            <Button
              mx={3}
              onClick={goAcceptanceHistory}
              fontSize="lg"
              letterSpacing="wider"
            >
              History
            </Button>
            <Button
              mx={3}
              onClick={goToInfostation}
              fontSize="lg"
              letterSpacing="wider"
            >
              Infostation
            </Button>
          </>
        )}
        {context.userInfo.role == "USER" && (
          <>
            <Button
              mx={3}
              onClick={goToDiagnosis}
              fontSize="lg"
              letterSpacing="wider"
            >
              Diagnosis
            </Button>
            <Button
              mx={3}
              onClick={goToInfostation}
              fontSize="lg"
              letterSpacing="wider"
            >
              Infostation
            </Button>

            <Button
              mx={3}
              onClick={goToMail}
              fontSize="lg"
              letterSpacing="wider"
            >
              Messages
            </Button>
          </>
        )}
      </LeftNavMenu>

      <Flex justifyContent="space-between" alignItems="center">
        <Flex width="100%" alignItems="center">
          {darkColorMode == false ? (
            <BsFillCloudMoonFill
              className="cursor-pointer"
              size="2rem"
              onClick={() => {
                toggleColorMode();
                setDarkColorMode(!darkColorMode);
              }}
            />
          ) : (
            <BsFillSunFill
              className="cursor-pointer"
              size="2rem"
              onClick={() => {
                toggleColorMode();
                setDarkColorMode(!darkColorMode);
              }}
            />
          )}
          <Button
            padding="3"
            px="5"
            mx="2"
            letterSpacing="wider"
            onClick={() => goToProfile()}
          >
            {context.userInfo.role + " " + context.userInfo.username}
          </Button>

          <Img maxH="50px" src={context.userInfo.profilePicture} />
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

export default React.memo(Navbar);
