import { useStateProvider } from "@/context/StateContext";
import { ADD_MESSAGE_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import React, { useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";
function MessageBar() {
  const {
    state: { currentChatUser, userInfo },
    dispatch,
  } = useStateProvider();
  const [message, setmessage] = useState("");
  const sendMessage = async () => {
    try {
      const { data } = await axios.post(ADD_MESSAGE_ROUTE, {
        message,
        to: currentChatUser?.id,
        from: userInfo?.id,
      });
      setmessage("")
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div className="bg-panel-header-background h-20 px-4 flex items-center gap-6 relative">
      <>
        <div className="flex gap-6">
          <BsEmojiSmile
            className="text-panel-header-icon cursor-pointer text-xl"
            title="Emoji"
          />
          <ImAttachment
            className="text-panel-header-icon cursor-pointer text-xl"
            title="Attach File"
          />
        </div>

        <div className="w-full roundedlg h-10 flex items-center">
          <input
            type="text"
            name=""
            placeholder="Type a message"
            value={message}
            onChange={(e) => setmessage(e.target.value)}
            className="flex-1 px-5 py-4 bg-input-background text-sm focus:outline-none text-white h-10 rounded-lg "
          />
        </div>

        <div className="flex w-10 items-center jsutify-center">
          <button onClick={sendMessage}>
            <MdSend
              className="text-panel-header-icon cursor-pointer text-xl"
              title="Send Message"
            />
            {/* <FaMicrophone className="text-panel-header-icon cursor-pointer text-xl" title="Record" /> */}
          </button>
        </div>
      </>
    </div>
  );
}

export default MessageBar;
