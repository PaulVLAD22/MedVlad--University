import React from 'react'
import  {SidebarContainer,Icon,CloseIcon,SidebarWrapper,SidebarMenu,SidebarLink} from './SidebarElements'
import { useHistory } from "react-router";
import { useContext } from 'react';
import { UserContext } from '../../App';
const SideBar = ({isOpen,toggle}) =>{
  const context = useContext(UserContext);
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
  const goToAcceptUsers = () =>{
    history.push("/acceptUsers")
  }
  const goToAcceptDoctors = () =>{
    history.push("acceptDoctors")
  }

  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon>
        </CloseIcon>
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          {context.userInfo.role=="user" &&
          <> 
          <SidebarLink onClick={goHome}>Home</SidebarLink>
          <SidebarLink onClick={goToChat}>Live Chat</SidebarLink>
          <SidebarLink onClick={goToInfostation}>Infostation</SidebarLink>
          <SidebarLink onClick={goToMail}>Mail</SidebarLink>
          </>}
          {context.userInfo.role=="admin" &&
          <>
          <SidebarLink onClick={goToAcceptUsers}>Users</SidebarLink>
          <SidebarLink onClick={goToAcceptDoctors}>Doctors</SidebarLink>
          </>}
          
        </SidebarMenu>
      </SidebarWrapper>
    </SidebarContainer>
  )
}
export default SideBar