import { Box, Text,Flex } from "@chakra-ui/layout"
const MainMailMessage = ({ side,content, timeOfSending }) => {
    const isToday = (stringDate) => {
        const today = new Date()
        const someDate = new Date(stringDate)
        return someDate.getDay() == today.getDay() &&
          someDate.getMonth() == today.getMonth() &&
          someDate.getFullYear() == today.getFullYear()
      }
    return (
        <Flex flexDir="column"
        borderColor="#ccc"
        backgroundColor={side=="left"? "#dcf5b7" : "#ddd"} 
        borderRadius="md" borderTopLeftRadius={side == "left" ? "3xl" : null} borderTopRightRadius={side == "right" ? "3xl" : null} width="100%" textAlign={side} m="2" p="2"
        >
            <Text>{content}</Text>
            <Text fontSize="xs" textAlign="right">
                {(isToday(timeOfSending) ? "" : new Date(timeOfSending).getMonth()
                +"-"+new Date(timeOfSending).getDay())+" "+(new Date(timeOfSending)).getHours() +":"+ (new Date(timeOfSending)).getMinutes()}
                </Text>
        </Flex>
    )
}
export default MainMailMessage