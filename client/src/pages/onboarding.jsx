import React, { useEffect, useState } from "react";
import Input from "@/components/common/Input";
import { useStateProvider } from "@/context/StateContext";
import Image from "next/image";
import Avatar from "@/components/common/Avatar";
import axios from "axios";
import { ONBOARD_USER_ROUTE } from "@/utils/ApiRoutes";
import { reducerCases } from "@/context/constants";
import { useRouter } from "next/router";


function onboarding() {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState("/default_avatar.png");
  const { state: {userInfo, newUser}, dispatch } = useStateProvider();
  const router = useRouter();

  useEffect(() => {
    if(!newUser && !userInfo?.email) router.push("/login")
    else if(!newUser && userInfo?.email) router.push("/")
  }, [newUser, userInfo, router])

  const onboardUser = async () => {
    if (validateDetails()) {
      const email = userInfo.email;
      try {
        const { data } = await axios.post(ONBOARD_USER_ROUTE, {
          email,
          name,
          about,
          image,
        });
        if (data.status) {
          dispatch({ type: reducerCases.SET_NEW_USER, newUser: false });
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: { id: data.id, name, email, profileImage: image, status: about },
          });
          router.push("/index")
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const validateDetails = () => {
    if (name.length < 3) {
      return false;
    }
    return true;
  };
  return (
    <div className="bg-panel-header-background h-screen  flex flex-col items-center justify-center ">
      <div className="flex items-center justify-center gap-2">
        <Image src="/whatsapp.gif" alt="Whatapp" width={200} height={200} />
        <span className="text-7xl  text-white">Whatsapp</span>
      </div>
      <h2 className="text-2xl text-white">Create Your Profile</h2>
      <div className="flex gap-6 mt-6 ">
        <div className="flex flex-col items-center justify-center mt-5 gap-6">
          <Input name="Display Name" state={name} setState={setName} label />
          <Input name="About" state={about} setState={setAbout} label />
          <div className="flex items-center justify-center">
            <button
              onClick={onboardUser}
              className="mt-5 text-white flex p-5 rounded-lg items-center justify-center gap-7 bg-search-input-container-background"
            >
              Create Profile
            </button>
          </div>
        </div>
        <div>
          <Avatar type="xl" image={image} setImage={setImage} />
        </div>
      </div>
    </div>
  );
}

export default onboarding;
