import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { calculateTime } from "@/utils/CalculateTime";
import React, { useEffect, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

function SearchMessages() {
  const {
    state: { currentChatUser, messages },
    dispatch,
  } = useStateProvider();
  const [searchTerm, setsearchTerm] = useState("");
  const [searchMessages, setsearchMessages] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      setsearchMessages(
        messages.filter(
          (message) =>
            message.type === "text" &&
            message.message.includes(searchTerm.toLowerCase())
        )
      );
    }else {
      setsearchMessages([]);
    }
  }, [searchTerm]);
  return (
    <div className="border-conversation-border border-l w-full bg-conversation-panel-background flex flex-col z-10 max-h-screen">
      <div className="h-16 px-4 py-5 flex items-center bg-panel-header-background text-primary-strong">
        <IoClose
          className="cursor-pointer text-icon-lighter text-2xl "
          onClick={() => dispatch({ type: reducerCases.SET_MESSAGE_SEARCH })}
        />
        <span className="ml-8">Search Messages</span>
      </div>
      <div className="overflow-auto custom-scrollbar h-full">
        <div className="flex items-center flex-col w-full">
          <div className="flex px-5 items-center gap-3 h-14 w-full">
            <div className="bg-panel-header-background flex items-center gap-5 px-3 py-2 rounded-lg flex-grow ">
              <div>
                <BiSearchAlt2 className="text-panel-header-icon cursor-pointer text-l" />
              </div>
              <div className="flex-grow">
                <input
                  type="text"
                  name=""
                  value={searchTerm}
                  onChange={(e) => setsearchTerm(e.target.value)}
                  placeholder="Search messages"
                  className="bg-transparent text-sm focus:outline-none flex-grow text-white w-full"
                  // onChange={}
                />
              </div>
            </div>
          </div>
          <span className="mt-10 text-secondary">
            {!searchTerm.length &&
              `Search for messages with ${currentChatUser.name}`}
          </span>
        </div>
        <div className="flex justify-center h-full flex-col">
          {searchTerm.length > 0 && !searchMessages.length && (
            <span className="text-secondary w-full flex justify-center">
              No messages found
            </span>
          )}
          <div className="flex flex-col w-full h-full">
            {searchMessages.map((message) => (
              <div className="flex cursor-pointer flex-col justify-center hover:bg-background-default-hover w-full px-5 border-b-[0.1px] border-secondary py-5">
                <div className="text-sm text-secondary">
                  {calculateTime(message.createdAt)}
                </div>
                <div className="text-icon-green">{message.message}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchMessages;
