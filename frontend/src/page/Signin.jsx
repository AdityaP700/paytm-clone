import React, { useState } from "react";
import {Heading} from "../components/Heading";
import SubHeading from "/src/components/SubHeading.jsx";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";

const Signin=()=>{
    return (
        <div className="h-screen bg-slate-300 flex justify-center items-center">
            <div className="flex flex-col">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"}/>
          <SubHeading label={"Enter your credentials to access your account"}/>
          <InputBox label={"Email"}
          placeholder={"user@gmail.com"}
          />
          <InputBox 
              label={"Password"}
              placeholder={"123456"}
              />
          <div className="pt-4">
              <Button label={"Sign in"}/>
                  </div>
                  <BottomWarning label={"Don't have an Account?"} buttonText={"Sign up"} to={"/signup"}/>
               </div>
            </div>
        </div>
    )
}
export default Signin