import { Flex, Text, Button,Img } from "@chakra-ui/react"
import { useContext, useState } from "react"
import { useHistory } from "react-router"
import { UserContext } from "../../App"
import { TiDeleteOutline } from "react-icons/ti"
import axios from 'axios'
const Answer = ({ doctorUsername, id, content,doctorProfilePicture, author, numberOfLikes, reRenderPage, setQuestionError }) => {
    const context = useContext(UserContext);
    const [render, setRender] = useState("");
    const history = useHistory();

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
                setQuestionError("")
            },
            async (getError) => {
                if (getError.response.status === 401) {
                    console.log("SE CHEAMA REFRESH TOKEN")
                    context.refreshAuthToken();
                    setRender(render + 1);
                }
                if (getError.response.status === 452) {
                    setQuestionError("Already Liked Answer.");
                }

            }
        );

    }

    const deleteAnswer = async (id) => {
        console.log(id)

        let url = "/admin/deleteQuestionAnswer";

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                Authorization: "Bearer " + context.jwt,
            },
        };

        await axios({
            method: "DELETE",
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
                if (getError.response.status === 401) {
                    console.log("SE CHEAMA REFRESH TOKEN")
                    context.refreshAuthToken();
                    setRender(render + 1);
                }
            }
        );
    }
    const openDoctorProfile = () => {
        history.push("/profile/" + doctorUsername)
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
            {(context.userInfo.role == "USER" || context.userInfo.role == "ADMIN") &&
                <Text width="10%">{numberOfLikes}</Text>
            }
            <Text width="70%" m="2">{content}</Text>
            <Text width="20%" onClick={openDoctorProfile} fontWeight="bold" cursor="pointer">{author}</Text>
            {console.log(doctorProfilePicture)}
            <Img maxHeight="80px" src={doctorProfilePicture}/>
            {context.userInfo.role == "ADMIN" &&
                <Button onClick={() => deleteAnswer(id)}>
                    <TiDeleteOutline />
                </Button>
            }
        </Flex>
    )
}
export default Answer