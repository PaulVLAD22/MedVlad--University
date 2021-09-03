import { Flex, Text } from "@chakra-ui/react"

const AcceptedRequest = ({name, username, email, acceptance}) =>{
    return (
        <Flex width="100%" justifyContent="space-between" flexDir="column" borderBottom="1px solid black">
            <Text>{name}</Text>
            <Text>{username}</Text>
            <Text>{email}</Text>
            <Text>{acceptance}</Text>
        </Flex>
    )
}
export default AcceptedRequest