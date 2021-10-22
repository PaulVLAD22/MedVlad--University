import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { apiClient } from "../utils/apiClient";
import axios from "axios";
import https from "https";

export const useUser = () => {
  const [jwt, setJwt] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  const history = useHistory();

  const [userInfo, setUserInfo] = useState({});

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

    try {
      const res = await axios.post(url, params, config);
      let token = res.data.access_token;
      console.log(res);
      res.data.userInfo.role = res.data.userInfo.role.name;
      const userInfoJson = res.data.userInfo;
      const userObj = JSON.stringify(userInfoJson);

      // mai lucreaza la forma datelor in functie de ce iti trebuie
    
      const parsedUserObj = JSON.parse(userObj);
      
      console.log(userObj)
      await localStorage.setItem("JWTToken", token);
      await localStorage.setItem("refresh_token", res.data.refresh_token);
      await localStorage.setItem("userInfo", userObj);
      
      setJwt(token);
      setRefreshToken(res.data.refresh_token);
      setUserInfo(parsedUserObj);

      history.push("/");
      //TODO:: nu merge history push / 


    } catch (err) {
      console.log(err);
    }
  };

  const refreshAuthToken = async () => {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " +refreshToken,
      },
    };
    await axios({
      method: "GET",
      url: "/token/refresh",
      headers: config.headers,
    }).then(
      (response) => {
        console.log(jwt)
        console.log("acces:"+response.data.access_token)
        setJwt(response.data.access_token)
        setRefreshToken(response.data.refresh_token)
        localStorage.setItem("JWTToken", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        console.log(jwt)
        console.log(response)
        
      },
      (getError) => {
        console.log(getError)
      }
    );
  };

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

  
  const signUp = async (details,role) => {
    
    let url = "/register";

    await axios({
      method: "POST",
      url: url,
      params:{
        "email": details.email,
        "username": details.username,
        "password": details.password,
        "licensePicture": details.licensePicture,
        "role":role
      }
    }).then(
      (response) => {
        console.log(response.data)
        //TODO :: redirect to login
        
      },
      async (getError) => {
        console.log(getError)
      }
    );

  }



  const logOut = () => {
    console.log("logging out");
    localStorage.removeItem("JWTToken");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("userInfo");
    setJwt(null);
    setUserInfo(null);
  };

  return {
    jwt,
    setJwt,
    refreshToken,
    setRefreshToken,
    refreshAuthToken,
    userInfo,
    setUserInfo,
    error,
    signUp,
    setError,
    pageToDisplay,
    setPageToDisplay,
    logOut,
    logIn,
  };
};
