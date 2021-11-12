import { Button, Center, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router";
import {backgroundImageGradient, primaryColor} from '../utils/colors'

export const NotFoundPage  = () => {
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };
  return (
    <Center
      width="100vw"
      height="90vh"
    >
      <Flex
        direction="column"
        padding={3}
        bgGradient= {primaryColor}
        borderRadius="10"
      >
      <Text fontWeight="semibold" fontSize="24" color="white" fontFamily="cursive">
          Error 404: Page not found
        </Text>

        <Text fontSize="18px" color="white">
          This page doesn't exist. Click{" "}
          <Button
            variant="link"
            onClick={goBack}
            color={"black"}
            fontSize="18px"
          >
            here
          </Button>{" "}
          to go back.
        </Text>
      </Flex>
    </Center>
  );
};