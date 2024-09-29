import React from 'react';
import Appbar from "../components/Appbar"
import Balance from "../components/Balance"
import Users from "../components/Users"

export const Dashboard=()=>{
    return <div>
        <Appbar/>
        <div className="m-8">
            <Balance label={"13,321"}/>
            <Users/>
        </div>
    </div>
}
export default Dashboard;