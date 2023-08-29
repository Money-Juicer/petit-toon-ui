import React, { useEffect, useState } from "react";
import Header from "./Header/Header.js";
import Profile from "./UserinfoPage/Profile.js";
import Works from "./UserinfoPage/Works.js";
import { getUserInfo } from "../API/UserAPI.js";
import { useParams } from "react-router-dom";
import { Error404 } from "./ToonPage/Loading404";

const UserinfoPage = () => {
  const [userinfo, setUserinfo] = useState({});
  const [is404, setIs404] = useState(false);
  const userid = useParams().id;

  //404에러 핸들러
  const handleUndefinedUser = (errorResponseData) => {
    console.log("error code:", errorResponseData.code);
    console.log("error message:", errorResponseData.message);
    if (errorResponseData && errorResponseData.code === "404") {
      setIs404(true);
    }
  };

  useEffect(() => {
    if (userid) {
      getUserInfo(userid, setUserinfo, handleUndefinedUser);
    }
  }, [userid]);

  return (
    <div className="container">
      <div className="item">
        <Header />
        <div className="divLineHeader" />
        {is404 ? (
          <Error404 what = {'유저를'} />
        ) : (
          <>
            <Profile userinfo={userinfo} />
            <div className="divLineMid" />
            <Works userinfo={userinfo} />
            <div className="divLineBottom" />
          </>
        )}
      </div>
    </div>
  );
};

export default UserinfoPage;
