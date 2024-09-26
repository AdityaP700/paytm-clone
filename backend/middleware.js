// Exports middleware function 
// Checks the headers 
// Verifies the token
// If not, returns a 401 status back to the user

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

const authMiddleware = (req, res, next) => { 
    console.log('Incoming headers:', req.headers);// Corrected parameter order
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer token
    
    if (token) {
        jwt.verify(token, JWT_SECRET, (err, decoded) => { 
            if (err) {
                return res.status(401).send({ success: false, message: "Failed to authenticate user." }); // Changed to 401
            } else {
                req.userId = decoded.userid; 
                next(); 
            }
        });
    } else {
        return res.status(401).send({ success: false, message: "No token Provided" }); // Changed to 401
    }
};

module.exports = {
    authMiddleware
};
