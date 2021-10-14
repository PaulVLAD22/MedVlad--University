import {Flex, Text, Button} from "@chakra-ui/react"
import { useContext } from "react"
import { UserContext} from "../../App"
const Answer = ({content,author,numberOfLikes}) => {
    const context = useContext(UserContext);

    return(
        <Flex border="1px solid black" 
        alignItems="center"
        width="100%"
        padding="2"
        textAlign="left"
        fontSize="sm"
        >
        {console.log(author)}
            {context.userInfo.role=="DOCTOR" &&
            <Button width="10%">{numberOfLikes}</Button>
            }
            {context.userInfo.role=="USER" &&
            <Text width="10%">{numberOfLikes}</Text>
            }
            <Text width="70%" m="2">{content}</Text>
            <Text width="20%">{author}</Text>
        </Flex>
    )
}
export default Answer