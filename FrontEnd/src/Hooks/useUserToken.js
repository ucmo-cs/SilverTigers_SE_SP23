import { useState } from "react";

export default function () {
  const getUserToken = () => {
    const tokenString = sessionStorage.getItem("userToken");
    const userToken = JSON.parse(tokenString);
    return userToken;
  };

  const [userToken, setUserToken] = useState(getUserToken());

  const saveUserToken = (userToken) => {
    sessionStorage.setItem("userToken", JSON.stringify(userToken));
    setUserToken(userToken);
  };

  return {
    setUserToken: saveUserToken,
    userToken
  }
}
