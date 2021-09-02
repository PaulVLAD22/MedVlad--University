import {Flex, Text, Button} from "@chakra-ui/react"
const Answer = ({content,author,numberOfLikes}) => {
    return(
        <Flex border="1px solid black" 
        alignItems="center"
        width="100%"
        padding="2"
        textAlign="left"
        fontSize="sm"
        >
            <Button width="10%">{numberOfLikes}</Button>
            <Text width="70%" m="2">{content}</Text>
            <Text width="20%">{author}</Text>
        </Flex>
    )
}
export default Answer