import React, { useEffect, useState } from "react";
import ChatList from "./Chatlist/ChatList";
import Empty from "./Empty";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import axios from "axios";
import { CHECK_USER_ROUTE, GET_MESSAGES_ROUTE } from "@/utils/ApiRoutes";
import { useStateProvider } from "@/context/StateContext";
import { useRouter } from "next/router";
import { reducerCases } from "@/context/constants";
import Chat from "./Chat/Chat";

function Main() {
  const [redirectLogin, setredirectLogin] = useState(false);
  const {
    state: { userInfo, currentChatUser },
    dispatch,
  } = useStateProvider();
  const router = useRouter();

  useEffect(() => {
    if (redirectLogin) router.push("/login");
  }, [redirectLogin]);

  onAuthStateChanged(firebaseAuth, async (currentUser) => {
    if (!currentUser) setredirectLogin(true);
    if (!userInfo && currentUser?.email) {
      const { data } = await axios.post(CHECK_USER_ROUTE, {
        email: currentUser.email,
      });

      if (!data.status) {
        router.push("/login");
      }
      const {
        data: { id, name, email, profilePicture: profileImage, status },
      } = data;
      dispatch({
        type: reducerCases.SET_USER_INFO,
        userInfo: { id, name, email, profileImage, status },
      });
    }
  });

  useEffect(() => {
    const getMessages = async () => {
      const { data } = await axios.get(
        `${GET_MESSAGES_ROUTE}/${userInfo?.id}/${currentChatUser?.id}`
      );
      console.log(data);
    };
    if (currentChatUser?.id) {
      getMessages();
    }
  }, [currentChatUser]);
  return (
    <>
      <div className="grid grid-cols-main h-screen w-screen max-h-screen max-w-full overflow-hidden">
        <ChatList />
        {currentChatUser ? <Chat /> : <Empty />}
      </div>
    </>
  );
}

export default Main;
