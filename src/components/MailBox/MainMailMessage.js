import { Box, Text } from "@chakra-ui/layout"
const MainMailMessage = ({ side }) => {
    console.log(side)
    return (
        <Box borderRadius="md" borderTopLeftRadius={side == "left" ? "3xl" : null} borderTopRightRadius={side == "right" ? "3xl" : null} width="100%" textAlign={side} backgroundColor="green" m="2" p="2">
            <Text> Mesaj 1Mesaj 1Mesaj 1Mesaj 1Mesaj 1Mesaj 1Mesaj 1Mesaj 1Mesaj 1Mesaj 1Mesaj 1Mesaj 1Mesaj 1Mesaj 1Mesaj 1Mesaj 1Mesaj 1Mesaj 1Mesaj 1Mesaj 1Mesaj 1Mesaj 1Mesaj 1Mesaj 1Mesaj 1Mesaj 1Mesaj 1Mesaj 1Mesaj 1Mesaj 1Mesaj 1Mesaj 1Mesaj 1Mesaj 1Mesaj 1 </Text>
        </Box>
    )
}
export default MainMailMessage