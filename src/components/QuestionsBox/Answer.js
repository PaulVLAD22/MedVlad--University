import { Flex, Text, Button } from "@chakra-ui/react"
import { useContext, useState } from "react"
import { UserContext } from "../../App"
import axios from 'axios'
const Answer = ({ id,content, author, numberOfLikes,reRenderPage }) => {
    const context = useContext(UserContext);
    const [render,setRender] = useState("");

    const likeQuestionAnswer = async () => {
        console.log(id);
        
        let url = "/doctor/likeQuestionAnswer";

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                Authorization: "Bearer " + context.jwt,
            },
        };

        await axios({
            method: "POST",
            url: url,
            headers: config.headers,
            params: { "questionAnswerId": id }
        }).then(
            (response) => {
                console.log(response.data)
                reRenderPage()
                setRender(render + 1)
            },
            async (getError) => {
                if (getError.response.status === 403) {
                    console.log("SE CHEAMA REFRESH TOKEN")
                    context.refreshAuthToken();
                    setRender(render + 1);
                }
            }
        );

    }

    return (
        <Flex border="1px solid black"
            alignItems="center"
            width="100%"
            padding="2"
            textAlign="left"
            fontSize="sm"
        >
            {console.log(content)}
            {context.userInfo.role == "DOCTOR" &&
                <Button width="10%" onClick={likeQuestionAnswer}>{numberOfLikes}</Button>
            }
            {context.userInfo.role == "USER" &&
                <Text width="10%">{numberOfLikes}</Text>
            }
            <Text width="70%" m="2">{content}</Text>
            <Text width="20%">{author}</Text>
        </Flex>
    )
}
export default Answer