import { Box, Flex, Text } from '@chakra-ui/layout'
import React from 'react'
import { useHistory } from 'react-router'
const DiagnosisResult = ({ diagnosisResult }) => {
    const history = useHistory()
    const openDoctorProfile = () => {
        history.push("/profile/" + diagnosisResult.similarQuestionDoctor.username);
      }
    console.log(diagnosisResult)
    return (
        <Flex width="100%" height="90%" alignItems="center" justifyContent="space-between">
            {diagnosisResult.condition == null ?
                <Text fontSize="x-large" position="absolute" left="50%" transform="translate(-50%,0)">Calculation Results</Text>
                :
                <>
                    <Flex alignItems="center" justifyContent="center" flexDir="column" w="30%">
                        <Text fontSize="lg">Condition:</Text>
                        <Text fontSize="x-large" fontWeight="500">
                            {diagnosisResult.condition}
                        </Text>
                    </Flex>
                    <Flex alignItems="center" justifyContent="center" flexDir="column" w="30%">
                        <Text fontSize="lg">Similarity Score:</Text>
                        <Text fontSize="x-large" fontWeight="500">
                            {diagnosisResult.similarityScore}
                        </Text>
                    </Flex>
                    <Flex alignItems="center" justifyContent="center" flexDir="column" w="30%">
                        <Text fontSize="lg">Diagnostician:</Text>
                        <Text fontSize="x-large" fontWeight="500" onClick={openDoctorProfile} cursor="pointer">
                            {diagnosisResult.similarQuestionDoctor.username}
                        </Text>
                    </Flex>
                </>
            }
        </Flex>
    )
}

export default DiagnosisResult
