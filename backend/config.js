require('dotenv').config(); 
module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'defaultSecretKey', // Use environment variable or fallback to default
};