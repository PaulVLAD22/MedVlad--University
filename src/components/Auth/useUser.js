import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { apiClient } from "../utils/apiClient";
import axios from "axios";
import https from "https";
import { isContext } from "vm";

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

  const logIn = async (details, setError) => {
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
      const res =
        await axios.post(url, params, config)
          .catch((error) => {
            if (error.response.status == 403) {
              setError("Wrong Credentials")
            }
            else {
              setError("Unknown Error")
            }
            return
          })

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

      // am schimbat ordinea dintre refresh token , user info si jwt si
      setRefreshToken(res.data.refresh_token);
      setUserInfo(parsedUserObj);
      setJwt(token);

      console.log(userInfo)
    } catch (err) {
      console.log(err);
    }
  };

  const refreshAuthToken = async () => {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + refreshToken,
      },
    };
    await axios({
      method: "GET",
      url: "/token/refresh",
      headers: config.headers,
    }).then(
      (response) => {
        console.log(jwt)
        console.log("acces:" + response.data.access_token)
        setJwt(response.data.access_token)
        setRefreshToken(response.data.refresh_token)
        localStorage.setItem("JWTToken", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        console.log(jwt)
        console.log(response)

      },
      (getError) => {
        if (getError.response.status == 403) {
          if (jwt !== "" && jwt != null) {
            history.push("/")
            logOut();
          }
        }
      }
    );
  };

  const signUp = async (details, role, setMessage, clearDetails) => {

    let url = "/register";

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
      },
    };

    const params = new URLSearchParams();
    params.append("grant_type", "password");
    params.append("email", details.email);
    params.append("username", details.username);
    params.append("password", details.password);
    params.append("licensePicture", details.licensePicture)
    params.append("role", role)

    await axios({
      method: "POST",
      url: url,
      params: params,
      config: config
    }).then(
      (response) => {
        console.log(response.data)
        setMessage("Request sent to admins")
        clearDetails();
      },
      async (getError) => {
        if (getError.response.status == 409) {
          setMessage("Username Or Email already taken");
        }
        else {
          setMessage("Unknown error")
        }
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
    setRefreshToken(null)
    console.log(userInfo)
    console.log(jwt)
    //window.location.reload()
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
