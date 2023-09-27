import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { ADD_IMAGE_MESSAGE_ROUTE, ADD_MESSAGE_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import React, { useEffect, useRef, useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";
import PhotoPicker from "../common/PhotoPicker";
import dynamic from "next/dynamic";
const CaptureAudio = dynamic(() => import("../common/CaptureAudio"), {ssr: false});
function MessageBar() {
  const {
    state: { currentChatUser, userInfo, socket },
    dispatch,
  } = useStateProvider();
  const [message, setmessage] = useState("");
  const [showEmojiPicker, setshowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);
  const [grabPhoto, setGrabPhoto] = useState(false);
  const [showAudioRecorder, setshowAudioRecorder] = useState(false);
  
  const photoPickerChange = async (e) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      //save to data
      const response = await axios.post(ADD_IMAGE_MESSAGE_ROUTE, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        params: {
          from: userInfo.id,
          to: currentChatUser.id,
        },
      });
      //emit message to the user
      if (response.status === 201) {
        socket.current.emit("send-msg", {
          to: currentChatUser?.id,
          from: userInfo?.id,
          message: response.data.message,
        });
        dispatch({
          type: reducerCases.ADD_MESSAGE,
          message: {
            ...response.data.message,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (grabPhoto) {
      const data = document.getElementById("photo-picker");
      data.click();
      document.body.onfocus = (e) => {
        setTimeout(() => {
          setGrabPhoto(false);
        }, 1000);
      };
    }
  }, [grabPhoto]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.id !== "emoji-open") {
        //emoji picker exist and click event occured outside the the emoji picker i.e element is outside the emoji picker
        if (
          emojiPickerRef.current &&
          !emojiPickerRef.current.contains(event.target)
        ) {
          setshowEmojiPicker(false);
        }
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  const handleEmojiModal = () => {
    setshowEmojiPicker(!showEmojiPicker);
  };
  const handleEmojiClick = (emoji) => {
    setmessage((prevMessage) => (prevMessage += emoji.emoji));
  };
  const sendMessage = async () => {
    try {
      const { data } = await axios.post(ADD_MESSAGE_ROUTE, {
        message,
        to: currentChatUser?.id,
        from: userInfo?.id,
      });
      socket.current.emit("send-msg", {
        to: currentChatUser?.id,
        from: userInfo?.id,
        message: data.message,
      });
      dispatch({
        type: reducerCases.ADD_MESSAGE,
        message: { ...data.message },
        fromSelf: true,
      });
      setmessage("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-panel-header-background h-20 px-4 flex items-center gap-6 relative">
      {
        !showAudioRecorder && (
          <>
          
            <div className="flex gap-6">
              <BsEmojiSmile
                className="text-panel-header-icon cursor-pointer text-xl"
                title="Emoji"
                id="emoji-open"
                onClick={handleEmojiModal}
              />
              {showEmojiPicker && (
                <div
                  className="absolute bottom-24 left-16 z-40"
                  ref={emojiPickerRef}
                >
                  <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
                </div>
              )}
              <ImAttachment
                className="text-panel-header-icon cursor-pointer text-xl"
                title="Attach File"
                onClick={() => setGrabPhoto(true)}
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
                {
                  message.length ? (

                    <MdSend
                      className="text-panel-header-icon cursor-pointer text-xl"
                      title="Send Message"
                    />
                  ) : (

                    <FaMicrophone
                      className="text-panel-header-icon cursor-pointer text-xl"
                      title="Record"
                      onClick={() => setshowAudioRecorder(true)}
                    />
                  )
                }
              </button>
            </div>
          </>
        )
      }
      {grabPhoto && <PhotoPicker onChange={photoPickerChange} />}
      {showAudioRecorder && <CaptureAudio hide={setshowAudioRecorder} />}
    </div>
  );
}

export default MessageBar;
