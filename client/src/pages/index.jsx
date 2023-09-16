import React from "react";
import { useStateProvider } from "@/context/StateContext";
import Main from "@/components/Main";

function index() {
  const { state: {userInfo, newUser}, dispatch } = useStateProvider();
  
  return <div >
    <Main />
  </div>;
}

export default index;
