import { Flex } from "@chakra-ui/layout"
import { useState } from "react"
import AcceptDoctorsPage from "./AcceptDoctorsPage"
import AcceptQuestionsPage from "./AcceptQuestionsPage"
import AcceptUsersPage from "./AcceptUsersPage"

const AcceptPage = () => {
    const [render,setRender] = useState(0)

    return (
        <Flex flexDir="row" width="100%" height="100%" p="5">
            <AcceptUsersPage reRenderPage={()=>setRender(render+1)}/>
            <AcceptDoctorsPage reRenderPage={()=>setRender(render+1)}/>
            <AcceptQuestionsPage reRenderPage={()=>setRender(render+1)}/>
        </Flex>
    )
}
export default AcceptPage