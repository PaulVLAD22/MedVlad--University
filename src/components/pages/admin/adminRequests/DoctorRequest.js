import { Flex, Center, Box, Text, Button, Img } from "@chakra-ui/react"
import { TiTick } from "react-icons/ti"
import { AiFillStop, AiOutlineStop } from "react-icons/ai"
const DoctorRequest = () => {
    return (
        <Flex height="400px" width="min(100%,720px)" flexDir="column">
            <Flex width="100%" mb="10">
                <Box>
                    <Img height="100%" src="https://media.istockphoto.com/vectors/female-asian-doctor-id-card-templatemedical-identity-badge-with-vector-id1141608383?k=20&m=1141608383&s=612x612&w=0&h=6xls_f7xY40UtP7jM7yYUiMNU1zid85x21mrMeUwHDI="></Img>
                </Box>
                <Flex flexDir="column" border="1px solid black" p="3" width="50%" height="100%" overflow="auto">
                    <Text>Marian Algeria</Text>
                    <Text>Roman</Text>
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