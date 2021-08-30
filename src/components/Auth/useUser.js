import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { apiClient } from "../utils/apiClient"

export const useUser = () => {
  const [jwt, setJwt] = useState("");

  const history = useHistory();

  const [userInfo, setUserInfo] = useState({})

  const [error, setError] = useState("");
  const [pageToDisplay, setPageToDisplay] = useState("login");

  const logIn = async (details) => {
    console.log("LOGIN")

    const token = "1134135315135135"

    const userObj = JSON.stringify({
      access_token: "123", username: "vlad", email: "paulvlad34@gmail.com",
      role: "user"
    })

    const parsedUserObj = JSON.parse(userObj)

    await localStorage.setItem("JWTToken", token);
    await localStorage.setItem("userInfo", userObj);

    setUserInfo(parsedUserObj);
    setJwt(token);


    // nu merge - history.go(0)

    // let url = "http://localhost:8080/test/cox";
    // const agent = new https.Agent({
    //   rejectUnauthorized: false
    // });
    // try {
    //   const res = await axios.get(url, {
    //     auth: {
    //       username: 'user',
    //       password: '123456'
    //     }
    //     ,
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //       "Access-Control-Allow-Origin": "*",
    //       'Access-Control-Allow-Credentials': true,
    //       "Access-Control-Allow-Methods": 'HEAD, GET, POST, PUT, PATCH, DELETE',
    //       "Access-Control-Allow-Headers": 'Origin, Content-Type, X-Auth-Token',
    //     },
    //     httpsAgent: agent
    //   })
    //   return res;
    // } catch (err) {
    //   console.log(err)
    // }
  }

  const signUp = async (details) => {
    // try {
    //   const res = await apiClient.post("/api/Account/Register", {
    //     Email: details.email,
    //     Username: details.username,
    //     Password: details.password,
    //     ConfirmPassword: details.confirmPassword,
    //   });

    //   setError("");
    //   history.push("/login");
    //   history.go(0);
    // } catch (err) {
    //   console.log(err.response.data.Message);

    //   setError(err.response.data.Message ?? "An error has occcured");
    // }
  }

  const logOut = () => {
    console.log("logging out")
    localStorage.removeItem("JWTToken");
    localStorage.removeItem("userInfo")
    setJwt(null)
    setUserInfo(null)
  }

  return { jwt, setJwt, userInfo, setUserInfo, error, setError, pageToDisplay, setPageToDisplay, logOut, logIn }
}
