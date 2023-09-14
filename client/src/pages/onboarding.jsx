import React, { useState } from "react";
import Input from "@/components/common/Input";
import { useStateProvider } from "@/context/StateContext";
import Image from "next/image";
import Avatar from "@/components/common/Avatar";

function onboarding() {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState("/default_avatar.png");
  const { state, dispatch } = useStateProvider();

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
        </div>
        <div>
          <Avatar type="xl" image={image} setImage={setImage} />
        </div>
      </div>
    </div>
  );
}

export default onboarding;
