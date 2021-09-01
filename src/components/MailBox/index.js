import { Flex, Text } from "@chakra-ui/react"
import MainMailMessage from "./MainMailMessage"
import MainMailBox from "./MainMailBox"
import MiniMailBox from "./MiniMailBox"
const MailBox = () => {
    return (
        <Flex width="min(1024px,100%)" height="60%" boxShadow="dark-lg">
            <Flex width="40%" flexDir="column" > 
            <MiniMailBox/>
            <MiniMailBox/>
            <MiniMailBox/>
            </Flex>
            <MainMailBox>
            </MainMailBox>
        </Flex>
    )
}
export default MailBox