import { Box, Text, Flex } from "@chakra-ui/layout"
const MainMailMessage = ({ side, content, timeOfSending }) => {
    const isToday = (stringDate) => {
        const today = new Date()
        const someDate = new Date(stringDate)
        return someDate.getDay() == today.getDay() &&
            someDate.getMonth() == today.getMonth() &&
            someDate.getFullYear() == today.getFullYear()
    }

    let year, month, day, hour, minute;

    console.log(timeOfSending)
    timeOfSending = String(timeOfSending)
    year = timeOfSending.substr(0, 4)
    month = timeOfSending.substr(5, 2)
    day = timeOfSending.substr(8, 2)
    hour = timeOfSending.substr(11, 2)
    minute = timeOfSending.substr(14, 2)
    return (
        <Flex flexDir="column"
            borderColor="#ccc"
            backgroundColor={side == "left" ? "#dcf5b7" : "#ddd"}
            borderRadius="md" borderTopLeftRadius={side == "left" ? "3xl" : null} borderTopRightRadius={side == "right" ? "3xl" : null} width="100%" textAlign={side} m="2" p="2"
        >
            <Text>{content}</Text>
            <Text fontSize="xs" textAlign="right">
                {(isToday(timeOfSending) ? "" : month
                    + "-" + day)+ " " + hour + ":" + (minute < 10 ? "0" + minute : minute)}
            </Text>
        </Flex>
    )
}
export default MainMailMessage