const express = require('express');
const router = express.Router();
const { Account } = require("../db");
const { authMiddleware } = require('../middleware');
const mongoose = require('mongoose'); // Make sure mongoose is required
router.post("/transfer", authMiddleware, async (req, res) => {  // Swap req and res
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { amount, to } = req.body;
        const account = await Account.findOne({ userid: req.userid }).session(session);

        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }

        const toAccount = await Account.findOne({ userid: to }).session(session);  // Added await

        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid Account"
            });
        }

        // Update the sender's and receiver's account balances
        await Account.findOneAndUpdate({ userid: req.userid }, { $inc: { balance: -amount } }).session(session);
        await Account.findOneAndUpdate({ userid: to }, { $inc: { balance: amount } }).session(session);

        await session.commitTransaction();
        res.json({
            message: "Transfer Successful"
        });
    } catch (error) {
        await session.abortTransaction();
        res.status(500).json({
            message: "Transfer Failed",
            error: error.message
        });
    } finally {
        session.endSession();
    }
});

// Balance route
router.get("/balance", authMiddleware, async (req, res) => {  // Swap req and res
    const account = await Account.findOne({ userid: req.userid });
    
    if (!account) {
        return res.status(404).json({
            message: "Account not found"
        });
    }

    res.json({
        balance: account.balance
    });
});

module.exports = router;
