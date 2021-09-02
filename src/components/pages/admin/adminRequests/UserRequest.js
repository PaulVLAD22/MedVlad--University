import { Button, Flex, Text } from "@chakra-ui/react"
import { TiTickOutline } from "react-icons/ti"
import {AiOutlineStop} from "react-icons/ai"
import styled from "styled-components"
const UserRequest = () => {
    return (
        <UsersList flexDir="row" width="100%" justifyContent="space-between" borderBottom="1px solid black" my="2" alignItems="center" p="3">
            <Text>Marian Claudiu</Text>
            <Text>Romania</Text>
            <Text>Casatorit</Text>
            <Text>usernam11</Text>
            <Text>email@email.com</Text>
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