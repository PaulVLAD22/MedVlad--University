import { Center, Flex } from "@chakra-ui/react"
import AcceptedRequest from "./adminRequests/AcceptedRequest"

const HistoryPage = () => {
    return (
        <Center width="100%" height="90%">
            <Flex flexDir="column" border="1px solid black" width="min(1024px,100%)" height="70%" overflow="auto" alignItems="center">
                <AcceptedRequest name="Nume" username="username" email="email@email.com" acceptance="Accepted"/>
                <AcceptedRequest name="Nume" username="username" email="email@email.com" acceptance="Accepted"/>
            </Flex >
        </Center>
    )
}
export default HistoryPage