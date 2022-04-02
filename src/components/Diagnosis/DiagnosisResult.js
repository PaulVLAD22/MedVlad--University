import { Box, Flex, Text } from "@chakra-ui/layout";
import React from "react";
import { Spring } from "react-spring/renderprops";
import { useHistory } from "react-router";
const DiagnosisResult = ({ diagnosisResult }) => {
  const history = useHistory();
  const openDoctorProfile = () => {
    history.push("/profile/" + diagnosisResult.similarQuestionDoctor.username);
  };
  console.log(diagnosisResult);
  return (
    <Flex
      width="100%"
      height="90%"
      alignItems="center"
      justifyContent="space-between"
    >
      {diagnosisResult.condition == null ? (
        <Text
          fontSize="x-large"
          position="absolute"
          left="50%"
          transform="translate(-50%,0)"
        >
          Calculation Results
        </Text>
      ) : (
        <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
          {(props) => (
            <>
              <Flex
                style={props}
                alignItems="center"
                justifyContent="center"
                flexDir="column"
                w="30%"
                style={props}
              >
                <Text fontSize="lg">Condition:</Text>
                <Text fontSize="x-large" fontWeight="500">
                  {diagnosisResult.condition}
                </Text>
              </Flex>
              <Flex
                alignItems="center"
                justifyContent="center"
                flexDir="column"
                w="30%"
                style={props}
              >
                <Text fontSize="lg">Similarity Score:</Text>
                <Text fontSize="x-large" fontWeight="500">
                  {(diagnosisResult.similarityScore * 100).toFixed(1) + "%"}
                </Text>
              </Flex>
              <Flex
                alignItems="center"
                justifyContent="center"
                flexDir="column"
                w="30%"
                style={props}
              >
                <Text fontSize="lg">Diagnostician:</Text>
                <Text
                  fontSize="x-large"
                  fontWeight="500"
                  onClick={openDoctorProfile}
                  cursor="pointer"
                >
                  {diagnosisResult.similarQuestionDoctor.username}
                </Text>
              </Flex>
            </>
          )}
        </Spring>
      )}
    </Flex>
  );
};

export default DiagnosisResult;
