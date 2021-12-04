import { Flex, Text } from '@chakra-ui/layout'
import React from 'react'

const DiagnosisResult = ({ diagnosisResult }) => {
    console.log(diagnosisResult)
    return (
        <Flex width="100%" height="90%" alignItems="center" justifyContent="space-between">
            {diagnosisResult.condition == null ?
                <Text fontSize="x-large" position="absolute" left="50%" transform="translate(-50%,0)">Calculation Results</Text>
                :
                <>
                    <Text>
                        {diagnosisResult.condition}
                    </Text>
                    <Text>
                        Similarity Score : {diagnosisResult.similarityScore}
                    </Text>
                    <Text>
                        Diagnostician Doctor: {diagnosisResult.similarQuestionDoctor.username}
                    </Text>
                </>
            }
        </Flex>
    )
}

export default DiagnosisResult
