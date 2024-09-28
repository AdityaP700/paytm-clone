const express = require("express");
const mainRouter = require("./routes/index"); // Importing main router for API routes
const cors = require('cors'); // Cross-Origin Resource Sharing middleware
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", mainRouter);

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});

// Define available routes for reference
// /api/v1/user/signup
// /api/v2/user/signin
// /api/v1/user/changePassword
// /api/v1/account/transferMoney
// /api/v1/account/balance
