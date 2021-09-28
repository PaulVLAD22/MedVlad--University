import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { apiClient } from "../utils/apiClient"
import axios from 'axios'
import https from 'https'

export const useUser = () => {
  const [jwt, setJwt] = useState("");

  const history = useHistory();

  const [userInfo, setUserInfo] = useState({})

  const [error, setError] = useState("");
  const [pageToDisplay, setPageToDisplay] = useState("login");

  // const logIn = async (details) => {
  //   console.log("LOGIN")

  //   // const token = "1134135315135135"

  //   // const userObj = JSON.stringify({
  //   //   access_token: "123", username: "vlad", email: "paulvlad34@gmail.com",
  //   //   role: "user"
  //   // })

  //   // const parsedUserObj = JSON.parse(userObj)

  //   // await localStorage.setItem("JWTToken", token);
  //   // await localStorage.setItem("userInfo", userObj);

  //   // setUserInfo(parsedUserObj);
  //   // setJwt(token);


  //   //nu merge - history.go(0)
  // }

    const logIn = async (details) => {
      let url = "/login";
      const params = new URLSearchParams();
      params.append("grant_type", "password");
      params.append("username", details.username);
      params.append("password", details.password);
  
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
        },
      };

      try{
          const res = await axios.post(url, params, config);
          let token = res.data.access_token;
          console.log(res)  
          res.data.userInfo.role=res.data.userInfo.role.name
          const userInfoJson = res.data.userInfo
          const userObj = JSON.stringify({
            access_token:token,
            refresh_token:res.data.refresh_token,
            firstName:userInfoJson.firstName,
            lastName:userInfoJson.lastName,
            dateOfRegistration:userInfoJson.dateOfRegistration,
            adminPoints:userInfoJson.adminPoints,
            doctorPoints:userInfoJson.doctorPoints,
            profilePicture:userInfoJson.profilePicture,
            role:userInfoJson.role,
            username:userInfoJson.username
          });
          
          // mai lucreaza la forma datelor in functie de ce iti trebuie
          console.log("aici")
          const parsedUserObj = JSON.parse(userObj)
          console.log("acolo")
          console.log(parsedUserObj)
          await localStorage.setItem("JWTToken", token);
          await localStorage.setItem("userInfo", userObj);
          console.log("ASta e nukll :" + token)
          setJwt(token);
          setUserInfo(parsedUserObj);

          
      }catch(err){
          console.log(err)
      }
      
  }

  // let url = "/test/cox";
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
  //       'Content-Type': 'application/json',
  //       "Access-Control-Allow-Origin": "http://localhost:8080",
  //       'Access-Control-Allow-Credentials': true,
  //       "Access-Control-Allow-Methods": 'HEAD, GET, POST, PUT, PATCH, DELETE',
  //       "Access-Control-Allow-Headers": 'Origin, Content-Type, X-Auth-Token',
  //     },
  //     httpsAgent: agent
  //   })
  //   console.log(res)
  // } catch (err) {
  //   console.log(err)
  // }










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
