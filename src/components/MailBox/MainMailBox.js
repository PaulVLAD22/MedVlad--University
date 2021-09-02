import { Flex } from "@chakra-ui/react"
import MainMailMessage from "./MainMailMessage"
const MainMailBox = ({messages}) => {
    return (
        <Flex border="1px solid black" width="60%" p="5" flexDir="column" overflowY="auto" overflowX="hidden">
            <MainMailMessage side="left" />
            <MainMailMessage side="right"/>
        </Flex>
    )
}
export default MainMailBox