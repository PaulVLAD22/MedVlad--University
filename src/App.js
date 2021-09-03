import { ChakraProvider } from '@chakra-ui/react';
import React, { createContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NotFoundPage } from "./components/404";
import { useUser } from "./components/Auth/useUser";
import { PageWrapper } from "./components/PageWrapper";
import LoginForm from './components/login/LoginForm';
import SignupForm from './components/login/SignupForm';
import HomePage from "./components/pages/HomePage"
import './App.css';
import ForgotPasswordForm from './components/login/ForgotPasswordForm';
import InfostationPage from './components/pages/InfostationPage';
import ChatPage from './components/pages/ChatPage';
import MailPage from './components/pages/MailPage';
import AcceptUsersPage from './components/pages/admin/AcceptUsersPage';
import AcceptDoctorsPage from './components/pages/admin/AcceptDoctorsPage';
import HistoryPage from './components/pages/admin/HistoryPage';
import AcceptQuestionsPage from './components/pages/admin/AcceptQuestionsPage';

export const UserContext = createContext(null);

function App() {
  const context = useUser();

  useEffect(() => {
    console.log(context.jwt);
    let token = localStorage.getItem("JWTToken");
    if (token != null) {
      if (!context.jwt) {
        context.setJwt(token);
        context.setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
      }
    }
  }, []);

  return (
    <ChakraProvider>
      <UserContext.Provider value={context}>
        <div className="App">
          <Router>
            {(!!context.jwt && context.userInfo.role == "user") &&
              <>
                {console.log(!!context.jwt)}
                <Switch>
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
                      <HomePage />
                    </PageWrapper>
                  </Route>

                  <Route exact path="*">
                    <PageWrapper>
                      <NotFoundPage />
                    </PageWrapper>
                  </Route>
                </Switch>
              </>
            }
            {(!!context.jwt && context.userInfo.role == "admin") &&
              <Switch>
                <Route exact path="/acceptUsers">
                  <PageWrapper>
                    <AcceptUsersPage />
                  </PageWrapper>
                </Route>
                <Route exact path="/acceptDoctors">
                  <PageWrapper>
                    <AcceptDoctorsPage />
                  </PageWrapper>
                </Route>
                <Route exact path="/acceptanceHistory">
                  <PageWrapper>
                    <HistoryPage />
                  </PageWrapper>
                </Route>
                <Route exact path="/acceptQuestions">
                  <PageWrapper>
                    <AcceptQuestionsPage></AcceptQuestionsPage>
                  </PageWrapper>
                </Route>
                {//TODO: Pagina de acceptat intrebari
                }
                <Route exact path="*">
                  <PageWrapper>
                    <NotFoundPage />
                  </PageWrapper>
                </Route>
              </Switch>
            }

            {(!context.jwt) &&
              <>
                {console.log(!!context.jwt, "from false")}
                <Switch>
                  <Route exact path="/login" component={LoginForm} />
                  <Route exact path="/register" component={SignupForm} />
                  <Route exact path="/forgotPassword" component={ForgotPasswordForm} />
                  <Route exact path="/" component={LoginForm} />
                  <Route exact path="*">
                    <NotFoundPage />
                  </Route>
                </Switch>
              </>
            }

          </Router>
        </div>
      </UserContext.Provider>
    </ChakraProvider>
  );
}

export default App;
