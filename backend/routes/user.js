const express = require('express'); 
const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../db");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");
const jwt = require('jsonwebtoken'); 
const signupBody = zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    userName: zod.string().email(),
    password: zod.string()
});

const updateUser = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
});
router.put("/", authMiddleware, async (req, res) => {
    const validation = updateUser.safeParse(req.body); // Store the result of safeParse
    if (!validation.success) {
        return res.status(400).json({
            message: "Error while updating information",
            errors: validation.error.errors // Use stored validation error
        });
    }
    await User.updateOne({ _id: req.userId }, req.body); // Update the user's information
    res.json({
        message: "Updated Successfully"
    });
});

router.post("/signup", async (req, res) => {
    const validation = signupBody.safeParse(req.body);
    if (!validation.success) {
        return res.status(401).json({
            message: "Validation error",
            errors: validation.error.errors 
        });
    }
    const existingUser = await User.findOne({ userName: req.body.userName });
    if (existingUser) {
        return res.status(404).json({
            message: "User already exists" 
        });
    }
    const newUser = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        password: req.body.password, 
    });
    const userid = newUser._id;
    await Account.create({
        userId: userid,
        balance: 1 + Math.random() * 10000,
    });
    const token = jwt.sign({ userid }, JWT_SECRET);
    res.json({
        message: "User created successfully",
        token: token,
    });
});
const signinBody = zod.object({
    userName: zod.string().email(),
    password: zod.string()
});
router.post("/signin", async (req, res) => {
    const validation = signinBody.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({
            message: "Incorrect inputs"
        });
    }
    const user = await User.findOne({ userName: req.body.userName });
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }
    if (req.body.password === user.password) {
        const token = jwt.sign({ userid: user._id }, JWT_SECRET);
        return res.json({
            token: token
        });
    } else {
        return res.status(400).json({ message: "Incorrect password" });
    }
});
router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";
    const users = await User.find({
        $or: [
            { firstName: { "$regex": filter, "$options": "i" } }, // Case insensitive
            { lastName: { "$regex": filter, "$options": "i" } }
        ]
    });
    res.json({
        users: users.map(user => ({
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            _id: user._id
        }))
    });
});
module.exports = router;
