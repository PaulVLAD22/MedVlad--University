import { ChakraProvider } from "@chakra-ui/react";
import React, { createContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";
import { NotFoundPage } from "./components/404";
import { useUser } from "./components/Auth/useUser";
import DoctorSignupForm from "./components/login/DoctorSignupForm";
import ForgotPasswordForm from "./components/login/ForgotPasswordForm";
import LoginForm from "./components/login/LoginForm";
import ResetPasswordForm from "./components/login/ResetPasswordForm";
import SignupForm from "./components/login/SignupForm";
import AcceptPage from "./components/pages/admin/AcceptPage";
import AdminHome from "./components/pages/admin/AdminHome";
import BanUserPage from "./components/pages/admin/BanUserPage";
import HistoryPage from "./components/pages/admin/HistoryPage";
import ChatPage from "./components/pages/ChatPage";
import DiagnosisPage from "./components/pages/DiagnosisPage";
import DoctorHome from "./components/pages/doctor/DoctorHome";
import HomePage from "./components/pages/HomePage";
import InfostationPage from "./components/pages/InfostationPage";
import MailPage from "./components/pages/MailPage";
import ProfilePage from "./components/pages/ProfilePage";
import { PageWrapper } from "./components/PageWrapper";

export const UserContext = createContext(null);

function App() {
  const context = useUser();

  useEffect(() => {
    console.log("USE EFFECT");

    let token = localStorage.getItem("JWTToken");
    let refreshToken = localStorage.getItem("refresh_token");

    if (token != null) {
      if (context.jwt == "" || context.jwt == null) {
        console.log("CONTEXT JWT NU EXISTA");
        console.log(context.jwt);
        context.setJwt(token);
        context.setRefreshToken(refreshToken);
        context.setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
      }
    }
    console.log(context);
  }, []);

  return (
    <ChakraProvider>
      <div className="App">
        <UserContext.Provider value={context}>
          {context.jwt != "" && context.jwt != null ? (
            <>
              {console.log(context)}
              {context.userInfo.role == "USER" && (
                <>
                  {console.log(!!context.jwt)}
                  {console.log("USER")}
                  <Switch>
                    <Route exact path="/diagnosis">
                      <PageWrapper>
                        <DiagnosisPage />
                      </PageWrapper>
                    </Route>
                    <Route exact path="/infostation">
                      <PageWrapper>
                        <InfostationPage />
                      </PageWrapper>
                    </Route>
                    <Route exact path="/chat">
                      <PageWrapper>
                        <ChatPage />
                      </PageWrapper>
                    </Route>
                    <Route exact path="/mail">
                      <PageWrapper>
                        <MailPage />
                      </PageWrapper>
                    </Route>
                    <Route exact path="/">
                      <PageWrapper>
                        <DiagnosisPage />
                      </PageWrapper>
                    </Route>
                    <Route exact path="/login">
                      <Redirect
                        to={{
                          pathname: "/",
                        }}
                      />
                    </Route>
                    <Route path="/profile/:username?">
                      <PageWrapper>
                        <ProfilePage></ProfilePage>
                      </PageWrapper>
                    </Route>
                    <Route exact path="*">
                      <PageWrapper>
                        <NotFoundPage />
                      </PageWrapper>
                    </Route>
                  </Switch>
                </>
              )}
              {context.userInfo.role == "ADMIN" && (
                <Switch>
                  <Route exact path="/accept">
                    <PageWrapper>
                      <AcceptPage />
                    </PageWrapper>
                  </Route>
                  <Route exact path="/acceptanceHistory">
                    <PageWrapper>
                      <HistoryPage />
                    </PageWrapper>
                  </Route>
                  <Route exact path="/banUser">
                    <PageWrapper>
                      <BanUserPage />
                    </PageWrapper>
                  </Route>
                  <Route exact path="/infostation">
                    <PageWrapper>
                      <InfostationPage></InfostationPage>
                    </PageWrapper>
                  </Route>
                  <Route exact path="/">
                    <PageWrapper>
                      <AdminHome />
                    </PageWrapper>
                  </Route>
                  <Route path="/profile/:username?">
                    <PageWrapper>
                      <ProfilePage></ProfilePage>
                    </PageWrapper>
                  </Route>
                  <Route exact path="/login">
                    <Redirect
                      to={{
                        pathname: "/",
                      }}
                    />
                  </Route>
                  <Route exact path="*">
                    <PageWrapper>
                      <NotFoundPage />
                    </PageWrapper>
                  </Route>
                </Switch>
              )}
              {context.userInfo.role == "DOCTOR" && (
                <Switch>
                  <Route exact path="/answerQuestions">
                    <PageWrapper>
                      <InfostationPage></InfostationPage>
                    </PageWrapper>
                  </Route>
                  <Route exact path="/mail">
                    <PageWrapper>
                      <MailPage></MailPage>
                    </PageWrapper>
                  </Route>
                  <Route exact path="/chat">
                    <PageWrapper>
                      <ChatPage></ChatPage>
                    </PageWrapper>
                  </Route>
                  <Route path="/profile/:username?">
                    <PageWrapper>
                      <ProfilePage></ProfilePage>
                    </PageWrapper>
                  </Route>
                  <Route exact path="/">
                    <PageWrapper>
                      <DoctorHome />
                    </PageWrapper>
                  </Route>
                  {
                    // redirectionam /login (pus pt ca la inceput se incarca context.jwt==="" si ne redictioneaza la /login si noi tre sa redictionam iar la /)
                  }
                  <Route exact path="/login">
                    <Redirect
                      to={{
                        pathname: "/",
                      }}
                    />
                  </Route>
                  <Route exact path="*">
                    <PageWrapper>
                      <NotFoundPage />
                    </PageWrapper>
                  </Route>
                </Switch>
              )}
            </>
          ) : (
            <>
              {console.log(context)}
              <Switch>
                <Route exact path="/login" component={LoginForm} />
                <Route exact path="/" component={LoginForm} />
                <Route exact path="/register" component={SignupForm} />
                <Route path="/resetPassword/:token/:email">
                  <ResetPasswordForm />
                </Route>
                <Route
                  exact
                  path="/doctorSignup"
                  component={DoctorSignupForm}
                />
                <Route
                  exact
                  path="/forgotPassword"
                  component={ForgotPasswordForm}
                />
                <Route exact path="*">
                  <NotFoundPage />
                </Route>
              </Switch>
            </>
          )}
        </UserContext.Provider>
      </div>
    </ChakraProvider>
  );
}

export default App;
