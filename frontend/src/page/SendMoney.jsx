import { useSearchParams} from 'react-router-dom';
import {useState} from'react';
import axios from 'axios';
function SendMoney({}){
    const[searchParams]=useSearchParams();
    const name=searchParams.get("name");
    const id=searchParams.get("id");
    const [amount,setAmount]=useState(0);
    return <div class="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
            <div class="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded">
             <div class="flex flex-col space-y-1.5 p-6">
                <h2 class="text-3xl font-bold text-center">
                    Send Money
                </h2>
             </div>
             <div className="p-6">
               <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-2xl text-white">
                      {name && name.length>0?  name[0].toUpperCase(): ""}
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold">{name}</h3>
               </div>
               <div className="space-y-4">
                  <div class="space-y-2">
                    <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-10"
                    for="amount">
                        Amount(in &#x20B9;)
                    </label>
                    <input 
                    onChange={(e)=>{
                        setAmount(e.target.value);
                    }}
                    type="number" min="1"
                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    id="amount"
                    placeholder="Enter Amount"/>
                  </div>
                  <button onClick={async()=>{
                   await axios.post("http://localhost:3000/api/v1/account/transfer",{
                        to: id,
                        amount,
                      },
                      {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                    )}
                 } class="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                    Initiate Transfer
                  </button>
               </div>
             </div>
            </div>
        </div>
    </div>
}
export default SendMoney; 
