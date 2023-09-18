import React from "react";

function ChatContainer() {
  return (
    <div className="h-[80vh] w-full flex-grow overflow-auto custom-scrollbar">
      <div className="bg-chat-background bg-fixed h-full w-full opacity-5 left-0 top-0 z-10"></div>
      <div className="flex w-full">
        <div className="flex flex-col">
          <div className="flex flex-col justify-end w-full gap-1 overflow-auto"></div>
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;
