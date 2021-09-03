import { Flex, Center, Box, Text, Button, Img } from "@chakra-ui/react"
import { TiTick } from "react-icons/ti"
import { AiFillStop, AiOutlineStop } from "react-icons/ai"
const DoctorRequest = ({imgLink,name,nationality, hospital, profession}) => {
    return (
        <Flex height="400px" width="min(100%,720px)" flexDir="column">
            <Flex width="100%" mb="10">
                <Box>
                    <Img height="100%" src={imgLink}></Img>
                </Box>
                <Flex flexDir="column" border="1px solid black" p="3" width="50%" height="100%" overflow="auto" textAlign="left">
                    <Text>{name}</Text>
                    <Text>{nationality}</Text>
                    <Text>{hospital}</Text>
                    <Text>{profession}</Text>
                </Flex>
            </Flex>

            <Flex width="100%" justifyContent="space-between" fontSize="larger">
                <Button>
                    <AiFillStop></AiFillStop>
                </Button>
                <Button >
                    <TiTick></TiTick>
                </Button>


            </Flex>
        </Flex>
    )
}
export default DoctorRequest