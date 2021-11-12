import { Flex, Text } from "@chakra-ui/react"

const AcceptedRequest = ({request}) =>{
    return (
        <Flex width="100%" justifyContent="space-between" flexDir="column" borderBottom="1px solid black">
            <Text>Username : {request.user}</Text>
            <Text>Email : {request.email}</Text>
            <Text>Accepted : {request.verdict==true ? "Yes" : "No"}</Text>
            <Text>Comment : {request.comment}</Text>
        </Flex>
    )
}
export default AcceptedRequest