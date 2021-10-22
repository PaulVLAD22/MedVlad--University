import { Flex, Center, Box, Text, Button, Img, Input } from "@chakra-ui/react";
import { TiTick } from "react-icons/ti";
import { AiFillStop, AiOutlineStop } from "react-icons/ai";
const DoctorRequest = ({ imgLink, username }) => {
  return (
    <Flex height="400px" width="min(100%,720px)" flexDir="column">
      <Flex width="100%" mb="10">
        <Box>
          <Img height="100%" src={imgLink}></Img>
        </Box>
        <Flex
          flexDir="column"
          border="1px solid black"
          p="3"
          width="50%"
          height="100%"
          overflow="auto"
          textAlign="left"
        >
          <Text>{username}</Text>
        </Flex>
      </Flex>

      <Flex width="100%" flexDir="column" alignItems="center">
        <Flex width="100%" justifyContent="space-between" fontSize="larger">
          <Button>
            <AiFillStop></AiFillStop>
          </Button>
          <Button>
            <TiTick></TiTick>
          </Button>
        </Flex>
        <Input width="50%" placeholder="comment..."></Input>
      </Flex>
    </Flex>
  );
};
export default DoctorRequest;
