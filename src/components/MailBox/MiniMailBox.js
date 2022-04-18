import { Flex, Text } from "@chakra-ui/react";

const MiniMailBox = ({
  updateMainChat,
  username,
  message,
  timeOfSending,
  senderUsername,
}) => {
  let year, month, day, hour, minute;

  timeOfSending = String(timeOfSending);
  year = timeOfSending.substr(0, 4);
  month = timeOfSending.substr(5, 2);
  day = timeOfSending.substr(8, 2);
  hour = timeOfSending.substr(11, 2);
  minute = timeOfSending.substr(14, 2);
  const conversationPartner = (
    <Text fontSize="xs">
      {senderUsername == username ? "received" : "sent"}
    </Text>
  );

  return (
    <Flex
      cursor="pointer"
      onClick={updateMainChat}
      display="block"
      width="100%"
      flexDirection="column"
      textAlign="left"
      borderBottom="1px solid black"
      px="5"
      py="3"
    >
      {console.log(message, username, senderUsername, timeOfSending)}
      <Text fontSize="lg">{username}</Text>
      <Text
        fontSize="md"
        textOverflow="ellipsis"
        overflow="hidden"
        whiteSpace="nowrap"
        mb="2"
      >
        {message}
      </Text>
      <Text fontSize="xs">
        {month +
          "-" +
          day +
          " " +
          hour +
          ":" +
          (minute < 10 ? "0" + minute : minute)}
      </Text>
      {conversationPartner}
    </Flex>
  );
};
export default MiniMailBox;
