const express = require('express'); 
const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../db");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");
const jwt = require('jsonwebtoken'); // Import jsonwebtoken

// Validating the schemas with Zod
const signupBody = zod.object({
    userName: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
});

const updateUser = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
});

// Update user information
router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateUser.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            message: "Error while updating information",
            errors: updateUser.safeParse(req.body).error, // Optional: send validation errors
        });
    }
    await User.updateOne({ _id: req.userId }, req.body); // Corrected
    res.json({
        message: "Updated Successfully"
    });
});

// User signup
router.post("/signup", async (req, res) => { // Fixed parameter order
    const { success } = signupBody.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            message: "Email already taken/incorrect value"
        });
    }
    
    // Check if the user exists
    const existingUser = await User.findOne({ userName: req.body.userName }); // Added await
    if (existingUser) {
        return res.status(400).json({
            message: "Wrong inputs/User already exists"
        });
    }

    const newUser = await User.create({
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    });

    const userid = newUser._id; // Corrected to get the _id after creation
    await Account.create({ // Creating the account
        userId: userid,
        balance: 1 + Math.random() * 10000
    });

    // Create a token and return it
    const token = jwt.sign({ userid }, JWT_SECRET);
    res.json({
        message: "User created successfully",
        token: token
    });
});

// User signin
const signinBody = zod.object({
    userName: zod.string().email(),
    password: zod.string()
});

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            message: "Incorrect inputs"
        });
    }

    const user = await User.findOne({
        userName: req.body.userName,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({ userid: user._id }, JWT_SECRET);
        res.json({
            token: token
        });
        return;
    }
    res.status(400).json({
        message: "Error while logging in"
    });
});

// Bulk user retrieval
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
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    });
});

module.exports = router;
