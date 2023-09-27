import React, { useState } from "react";
import Avatar from "../common/Avatar";
import { useStateProvider } from "@/context/StateContext";
import { BsFillChatLeftTextFill, BsThreeDotsVertical } from "react-icons/bs";
import { reducerCases } from "@/context/constants";
import { useRouter } from "next/router";
import ContextMenu from "../common/ContextMenu";

function ChatListHeader() {
  const {
    state: { userInfo },
    dispatch,
  } = useStateProvider();
  const router = useRouter();

  const [contextMenuCordinate, setcontextMenuCordinate] = useState({
    x: 0,
    y: 0,
  });
  const [isContextMenuVisible, setisContextMenuVisible] = useState(false);

  const showContextMenu = (e) => {
    e.preventDefault();
    setcontextMenuCordinate({ x: e.pageX - 50, y: e.pageY + 20 });
    setisContextMenuVisible(true);
  };

  const contextMenuOptions = [
    {
      name: "General",
      callback: () => {},
    },
    {
      name: "Account",
      callback: () => {},
    },
    {
      name: "Chats",
      callback: () => {},
    },
    {
      name: "Notification",
      callback: () => {},
    },
    {
      name: "Personalization",
      callback: () => {},
    },
    {
      name: "Storage",
      callback: () => {},
    },
    {
      name: "Shortcuts",
      callback: () => {},
    },
    {
      name: "Help",
      callback: () => {},
    },
    {
      name: "Logout",
      callback: () => {
        setisContextMenuVisible(false);
        router.push("/logout");
      },
    },
  ];

  const handleAllContactPage = () => {
    //togglee contacts page
    dispatch({ type: reducerCases.SET_ALL_CONTACT_PAGE });
  };

  return (
    <div className="h-16 px-4 py-3 flex justify-between items-center">
      <div className="cursor-pointer">
        <Avatar type="sm" image={userInfo?.profileImage} />
      </div>
      <div className="flex gap-6">
        <BsFillChatLeftTextFill
          className="text-panel-header-icon cursor-pointer text-xl"
          title="New Chat"
          onClick={handleAllContactPage}
        />
        <>
          <BsThreeDotsVertical
            className="text-panel-header-icon cursor-pointer text-xl"
            title="Menu"
            id="context-opener"
            onClick={(e) => showContextMenu(e)}
          />
          {isContextMenuVisible && (
            <ContextMenu 
              options={contextMenuOptions}
              cordinates={contextMenuCordinate}
              contextMenu={isContextMenuVisible}
              setContextMenu={setisContextMenuVisible}
            />
          )}
        </>
      </div>
    </div>
  );
}

export default ChatListHeader;
