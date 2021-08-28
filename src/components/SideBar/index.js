import React from 'react'
import  {SidebarContainer,Icon,CloseIcon,SidebarWrapper,SidebarMenu,SidebarLink} from './SidebarElements'
import { useHistory } from "react-router";

const SideBar = ({isOpen,toggle}) =>{

  const history = useHistory();

  const goHome = () => {
		history.push("/");
	};
  
  const goToChat = () => {
    history.push("/chat");
  }
  const goToMail = () => {
    history.push("/mail");
  }
  const goToInfostation = () =>{
    history.push("/infostation");
  }

  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon>
        </CloseIcon>
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink onClick={goHome}>Home</SidebarLink>
          <SidebarLink onClick={goToChat}>Live Chat</SidebarLink>
          <SidebarLink onClick={goToInfostation}>Infostation</SidebarLink>
          <SidebarLink onClick={goToMail}>Mail</SidebarLink>
        </SidebarMenu>
      </SidebarWrapper>
    </SidebarContainer>
  )

}
export default SideBar