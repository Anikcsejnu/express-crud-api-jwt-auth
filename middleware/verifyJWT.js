const jwt = require('jsonwebtoken');
require('dotenv').config;

const verifyJWT = (req, res, next) => {
    console.log('here');
    const authheader = req.headers['authorization'];
    if (!authheader) return res.sendStatus(401);
    console.log(authheader); // Bearer token
    const token = authheader.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); // invalid token, forbidden
            req.user = decoded.username;
            next();
        }
    )
}

module.exports = verifyJWT;