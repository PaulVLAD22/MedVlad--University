import { Flex } from "@chakra-ui/react"
import MainMailMessage from "./MainMailMessage"
const MainMailBox = () => {
    return (
        <Flex border="1px solid blue" width="60%" p="5" flexDir="column">
            <MainMailMessage side="left" />
            <MainMailMessage side="right"/>
        </Flex>
    )
}
export default MainMailBox