import BottomWarning from "../components/BottomWarning"; 
import {Heading} from "../components/Heading";
import InputBox from "../components/InputBox"; 
import  Subheading  from "../components/SubHeading";
import axios from 'axios';
import { useState } from "react";
import Button from "../components/Button";
export const Signup=()=>{
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [userName,setUserName]=useState("");
    const [password,setPassword]=useState("");
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <Heading label={"Sign Up"}/>
            <Subheading label={"Enter your information to create an account"}/>
           
            <InputBox 
            onChange={(e)=>{
                setFirstName(e.target.value);
            }}
                placeholder="Aditya" label={"First Name"}/>
            <InputBox
             onChange={(e)=>{
                setLastName(e.target.value);
            }}
                placeholder="Pat" label={"Last Name"}/>
            <InputBox
             onChange={(e)=>{
                setUserName(e.target.value);
            }}
                placeholder="adityaa32078@gmail.com" label={"Email"}/>
            <InputBox 
             onChange={(e)=>{
                setPassword(e.target.value);
            }}
                label={"Password"}/>
            <div className="pt-4">
              <Button 
              onClick={()=>{
                   axios.post('http://localhost:3000/api/user/signup',{
                      firstName,
                      lastName,
                      userName,
                      password
              }).then(response => {
                console.log("Signup successful", response.data);
                // Handle successful signup (e.g., redirect to login page or show success message)
            })
            .catch(error => {
                console.error("Signup failed", error.response ? error.response.data : error.message);
                // Handle error (e.g., show error message to user)
            });
                
              }} label={"Sign up"}/>
                  </div>
                  <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}/>
            </div>
        </div>
    </div>
}
export default Signup;