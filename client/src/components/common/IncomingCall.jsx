import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import Image from "next/image";
import React from "react";

function IncomingCall() {
   const {
     state: { incomingVoiceCall, socket },
     dispatch,
   } = useStateProvider();
  //  console.log(incomingVideoCall);
   const acceptCall = () => {
     const call = incomingVoiceCall;
     dispatch({
       type: reducerCases.SET_VIDEO_CALL,
       videoCall: { ...incomingVoiceCall, type: "in-coming" },
     });
     socket.current.emit("accept-incoming-call", { id: incomingVoiceCall.id });
     dispatch({
       type: reducerCases.SET_INCOMING_VIDEO_CALL,
       incomingVoiceCall: null,
     });
   };
   const rejectCall = () => {
     socket.current.emit("reject-voice-call", { from: incomingVoiceCall.id });
     dispatch({ type: reducerCases.END_CALL });
   };
   return (
     <div className="h-24 w-80 fixed bottom-8 mb-0 z-50 rounded-sm flex gap-5 items-center justify-start bg-conversation-panel-background text-white drop-shadow-2xl border-icon-green border-2 py-14">
       <div>
         <Image
           src={incomingVoiceCall.profilePicture}
           alt="Avatar"
           width={70}
           height={70}
           className="rounded-full"
         />
       </div>

       <div>
         <div>{incomingVoiceCall.name}</div>
         <div className="text-xs">Incoming voice call</div>
         <div className="flex gap-2 mt-2">
           <button
             className="bg-red-500 p-1 px-3 text-sm rounded-full"
             onClick={rejectCall}
           >
             Reject
           </button>
           <button
             className="bg-green-500 p-1 px-3 text-sm rounded-full"
             onClick={acceptCall}
           >
             Accept
           </button>
         </div>
       </div>
     </div>
   );
}

export default IncomingCall;
