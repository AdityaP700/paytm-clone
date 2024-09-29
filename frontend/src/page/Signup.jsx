import BottomWarning from "../components/BottomWarning"; 
import {Heading} from "../components/Heading";
import InputBox from "../components/InputBox"; 
import  Subheading  from "../components/SubHeading";
import axios from 'axios';
import { useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
export const Signup=()=>{
    const [firstName,setfirstName]=useState("");
    const [lastName,setlastName]=useState("");
    const [userName,setuserName]=useState("");
    const [password,setpassword]=useState("");
    const navigate=useNavigate();
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <Heading label={"Sign Up"}/>
            <Subheading label={"Enter your information to create an account"}/>
           
            <InputBox 
            onChange={(e)=>{
                setfirstName(e.target.value);
            }}
                placeholder="Aditya" label={"First Name"}/>
            <InputBox
             onChange={(e)=>{
                setlastName(e.target.value);
            }}
                placeholder="Pat" label={"Last Name"}/>
            <InputBox
             onChange={(e)=>{
                setuserName(e.target.value);
            }}
                placeholder="adityaa32078@gmail.com" label={"Email"}/>
            <InputBox 
             onChange={(e)=>{
                setpassword(e.target.value);
            }}
                label={"Password"}/>
            <div className="pt-4">
              <Button 
              onClick={async ()=>{
                  const response= await axios.post("http://localhost:3000/api/v1/user/signup",{
                    firstName,
                    lastName,
                    userName,
                    password
                   })
                  localStorage.setItem("token",response.data.token)
                  navigate("/dashboard")
              }} label={"Sign up"}/>
                  </div>
                  <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}/>
            </div>
        </div>
    </div>
}
export default Signup;