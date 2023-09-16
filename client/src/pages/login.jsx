import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
function login() {
  const router = useRouter();
  const {state: {userInfo, newUser}, dispatch} = useStateProvider();

  useEffect(() => {
    if(userInfo?.id && !newUser) router.push("/")
  }, [userInfo, newUser])

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const {user: {displayName: name, email, photoURL: profileImage}} = await signInWithPopup(firebaseAuth, provider);
    try {
      if(email){
        const {data} = await axios.post(CHECK_USER_ROUTE, { email });
        if(!data.status){
          dispatch({type: reducerCases.SET_NEW_USER, newUser: true});
          dispatch({
            type: reducerCases.SET_USER_INFO, 
            userInfo: {
              name,
              email,
              profileImage,
              status: ""
            }
          });
          router.push("/onboarding");
        }else {
          const {data: {id, name, email, profilePicture: profileImage, status}} = data;
          dispatch({type: reducerCases.SET_USER_INFO, userInfo: {
            name,
            email,
            id, 
            profileImage, 
            status
          }})
          router.push("/")
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="flex justify-center items-center bg-panel-header-background h-screen flex-col overflow-x-hidden">
      <div className="flex items-center justify-center gap-2 text-white">
        <Image src="/whatsapp.gif" alt="Whatapp" width={200} height={200} />
        <span className="text-7xl">Whatsapp</span>
      </div>

      <button
        onClick={handleLogin}
        className="mt-5 flex p-5 rounded-lg items-center justify-center gap-7 bg-search-input-container-background"
      >
        <FcGoogle className="text-4xl" />
        <span className="text-white text-2xl">Login with Google</span>
      </button>
    </div>
  );
}

export default login;
