import { Flex,Center } from "@chakra-ui/react"
import UserRequest from "./adminRequests/UserRequest"
const AcceptUsersPage = () => {
    return (
        <Center width="100%" height="100%" overflow="auto">
            <Flex flexDir="column" border="1px solid black" width="min(1024px,100%)" height="70%" overflow="auto" alignItems="center">
                <UserRequest></UserRequest>
                <UserRequest></UserRequest>
            </Flex>
        </Center>
    )
}
export default AcceptUsersPage