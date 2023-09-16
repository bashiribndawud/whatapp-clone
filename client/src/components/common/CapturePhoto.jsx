import React, { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

function CapturePhoto({ setImage, hide }) {
  // reference the <video> element
  const videoRef = useRef(null);

  useEffect(() => {
    //hold the video stream obtained from the user's camera.
    let stream;
    //asynchronous function that requests access to the user's camera
    const startCamera = async () => {
      //captures video from the user's camera using the getUserMedia API
      stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      //sets the srcObject property of the <video> element referenced by videoRef to the video stream obtained from the camera. This effectively displays the video feed in the <video> element.
      videoRef.current.srcObject = stream;
    };
    startCamera();

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);
  const capturePhoto = () => {
    //This creates an HTML <canvas> element used to draw the video frame.
    const canvas = document.createElement("canvas");
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0, 300, 150);
    setImage(canvas.toDataURL("image/jpeg"));
    hide(false);
  };
  return (
    <div className="absolute h-4/6 w-2/6 top-1/4 left-1/3 bg-gray-900 gap-3 rounded-lg pt-2 flex items-center justify-center">
      <div className="flex flex-col gap-4 w-full items-center justify-center">
        <div
          className="text-white pt-2 pr-2 cursor-pointer flex items-end justify-end mt-4"
          onClick={() => hide(false)}
        >
          <IoClose className="h-10 w-10 cursor-pointer" />
        </div>

        <div className="flex justify-center">
          <video id="video" width="400" autoPlay ref={videoRef}></video>
        </div>

        <button
          className="h-16 w-16 bg-white rounded-full cursor-pointer border-8 border-teal-light p-2 mb-10"
          onClick={capturePhoto}
        ></button>
      </div>
    </div>
  );
}

export default CapturePhoto;
