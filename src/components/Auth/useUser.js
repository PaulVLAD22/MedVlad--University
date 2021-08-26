import axios from "axios";
import https from 'https'
import { useState } from "react";
import { useHistory } from "react-router";

export const useUser = () => {
    const [jwt,setJwt] = useState("");
    const history = useHistory()

    const [userInfo,setUserInfo] = useState({})

    // const [user, setUser] = useState({ email: "", uid: 0 });
    const [error, setError] = useState("");
    const [pageToDisplay, setPageToDisplay] = useState("login");

    const logIn = async (details) => {
        let url = "https://medvlad.herokuapp.com/test/cox";
    const agent = new https.Agent({
      rejectUnauthorized: false
    });
    try {
      const res = await axios.get(url, {
        auth: {
          username: 'user',
          password: '123456'
        }
        ,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
          'Access-Control-Allow-Credentials': true,
          "Access-Control-Allow-Methods": 'HEAD, GET, POST, PUT, PATCH, DELETE',
          "Access-Control-Allow-Headers": 'Origin, Content-Type, X-Auth-Token',
        },
        httpsAgent: agent
      })
      return res;
    } catch (err) {
      console.log(err)
    }

        
    }

    const logOut = () => {
        console.log("logging out")
        localStorage.removeItem("JWTToken");
        localStorage.removeItem("userInfo")
        setJwt(null)
        setUserInfo(null)
    }

    return {jwt,setJwt,userInfo,setUserInfo,error,setError,pageToDisplay,setPageToDisplay, logOut, logIn}
}