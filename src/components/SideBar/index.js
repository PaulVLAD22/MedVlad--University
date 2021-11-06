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
  const goToAccept = () =>{
    history.push("/accept")
  }
  const goToAcceptDoctors = () =>{
    history.push("/acceptDoctors")
  }
  const goToAcceptanceHistory = () =>{
    history.push("/acceptanceHistory")
  }
  const goToAcceptQuestions = () =>{
    history.push("/acceptQuestions")
  }
  const goToAnswerQuestion = () => {
    history.push("/answerQuestions")
  }
  const goToBanUser = () =>{
    history.push("/banUser")
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
          {context.userInfo.role=="USER" &&
          <> 
          <SidebarLink onClick={goToInfostation}>Infostation</SidebarLink>
          <SidebarLink onClick={goToChat}>Live Session</SidebarLink>
          <SidebarLink onClick={goToMail}>Messages</SidebarLink>
          </>}
          {context.userInfo.role=="ADMIN" &&
          <>
          <SidebarLink onClick={goToAccept}>Accept</SidebarLink>
          <SidebarLink onClick={goToAcceptanceHistory}>History</SidebarLink>
          <SidebarLink onClick={goToBanUser}>Ban User</SidebarLink>
          <SidebarLink onClick={goToInfostation}>Infostation</SidebarLink>
          </>}

          {context.userInfo.role=="DOCTOR" &&
          <>
          <SidebarLink onClick={goToAnswerQuestion}>Infostation</SidebarLink>
          <SidebarLink onClick={goToChat}>Live Session</SidebarLink>
          <SidebarLink onClick={goToMail}>Messages</SidebarLink>
          </>
          }
          
        </SidebarMenu>
      </SidebarWrapper>
    </SidebarContainer>
  )
}
export default SideBar