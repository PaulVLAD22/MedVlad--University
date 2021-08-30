import {Box, Text } from "@chakra-ui/react"

const InfostationDescription = () => {
    return (
        <Box  border="1px solid black" p="5" m="3">
            <Text fontSize="24px" m="3">Find your question!</Text>
            <Text fontSize="md" textAlign="left">Don't bother starting a live chat. Here you can browse through all the questions other users like you asked and the answers given by our doctors. If you can't find the solution to your problem feel free to ask yourself and also help others in the process.</Text>
            <Text fontSize="md" textAlign="left">After each question you can see the number of likes given by other doctors, the response and the doctor's name </Text>
        </Box>
    )
}
export default InfostationDescription