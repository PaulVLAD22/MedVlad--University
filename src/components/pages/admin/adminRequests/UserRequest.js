import { Button, Flex, Text } from "@chakra-ui/react"
import { TiTickOutline } from "react-icons/ti"
import { AiOutlineStop } from "react-icons/ai"
import styled from "styled-components"
const UserRequest = ({ firstName,lastName, username, email }) => {
    return (
        <UsersList flexDir="row" width="100%" justifyContent="space-between" borderBottom="1px solid black" my="2" alignItems="center" p="3">
            <Text>{username}</Text>
            <Text>{email}</Text>
            <Button>
                <AiOutlineStop></AiOutlineStop>
            </Button>
            <Button>
                <TiTickOutline></TiTickOutline>
            </Button>
        </UsersList>
    )
}
export const UsersList = styled(Flex)`
@media screen and (max-width: 768px) {
    flex-direction:column;
}
`
export default UserRequest