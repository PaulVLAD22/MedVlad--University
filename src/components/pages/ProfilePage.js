import { Center, Flex } from "@chakra-ui/layout"
import { Button, Input, Img, Text } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import axios from 'axios'
import Question from "../QuestionsBox/Question";
import { UserContext } from "../../App";
import { useLocation } from 'react-router-dom'
import UserProfile from "../Profile/UserProfile";
import AdminProfile from "../Profile/AdminProfile";
import DoctorProfile from "../Profile/DoctorProfile";
import { useParams } from "react-router";

const ProfilePage = () => {
    const context = useContext(UserContext)
    const location = useLocation();
    const [user, setUser] = useState({ role: "" });
    const [render, setRender] = useState(0)
    let username = useParams().username;

    useEffect(async () => {
        console.log(location.pathname);
        console.log(username)
        if (username == undefined) {
            username = context.userInfo.username;
        }
        console.log(username)
        //console.log(context.jwt);
        console.log("jwt:" + context.jwt)
        let url = "/getUserByUsername";

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                Authorization: "Bearer " + context.jwt,
            },
        };

        await axios({
            method: "GET",
            url: url,
            headers: config.headers,
            params: { "username": username }
        }).then(
            (response) => {
                console.log(response.data)
                setUser(response.data)
            },
            async (getError) => {
                if (getError.response.status === 403) {
                    console.log("SE CHEAMA REFRESH TOKEN")
                    context.refreshAuthToken();
                    setRender(render + 1);
                }
            }
        );

    }, [render])

    return (
        <>
            {user.role.name === "USER" &&
                <UserProfile user={user} reRenderPage={() => setRender(render + 1)} />}
            {user.role.name === "ADMIN" &&
                <AdminProfile user={user} reRenderPage={() => setRender(render + 1)} />}
            {user.role.name === "DOCTOR" &&
                <DoctorProfile user={user} reRenderPage={() => setRender(render + 1)} />}
        </>)

}
export default ProfilePage