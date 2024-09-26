const express = require('express');
const router= express.Router();
const {Account}=require("../db");
const { authMiddleware } = require('../middleware');

router.post("/transfer ",authMiddleware,async(res,req)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
   const{ amount,to} =req.body
  const account= await Account.findOne({userid:req.userid}).session(session);
  
  if(!account||account.balance<amount){
    await session.abortTransaction();
     return res.status(400).json({
        message:"Insufficient balance"
     });
  }
  const toAccount= Account.findOne({userid:to}).session(session);
  if(!toAccount){
    await session.abortTransaction();
    return res.status(400).json({
        message:"Invalid Account"
    })
  }
   await  Account.findOne({userid:req.userid},{$inc:{balance:-amount}}).session(session);
   await Account.findOne({userid:to},{$inc:{balance:amount}}).session(session);
   await session.commitTransaction();
  res.json({
    message:"Transfer Successfull"
  });
  
//identifry the user's account
//woh valid hai ya nahi woh dekho
//jab bhejenge tab balance mai sufficient money hai ya nahi
//nahi hai toh alag se message bhejo
//nahi toh update the balance
});
router.get("/balance",authMiddleware,async(res,req)=>{
    //check for the middlewares
    //validate for the account
const account=await Account.findOne({
    //fetch the amount
   userid:req.userid
    });
   res.json({
    balance:account.balance
   })
});

module.exports=router;