import { Input } from "@chakra-ui/input"
import { Center, Flex } from "@chakra-ui/layout"
import { useContext, useState } from "react"
import { UserContext } from "../../../App"
import axios from "axios"
import { Button } from "@chakra-ui/button"
import {ImUserMinus} from "react-icons/im"
const BanUserPage = () => {
    const context = useContext(UserContext)
    const [username, setUsername] = useState("")
    const [render,setRender] = useState(0)

    const deleteUser = async () => {
        let url = "/admin/deleteUser";

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
            params: { "username" : username }
        }).then(
            (response) => {
                console.log(response.data)
                setUsername("")
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
        <Center width="100%" height="100%" overflow="auto">
            <Center 
                flexDir="column"
                border="1px solid black"
                width="min(1024px,100%)"
                height="70%"
                alignItems="center"
                flexDirection="column"
            >
                <ImUserMinus size="100"/>
                <Input mt="10" width="50%" onChange={(e) => { setUsername(e.target.value) }} value={username} />
                <Button mt="10" onClick={deleteUser}  > Ban </Button>
            </Center>

        </Center>
    )
}
export default BanUserPage