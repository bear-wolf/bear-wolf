export {}

const jwt = require("jsonwebtoken");
const globalAny: any = global;

module.exports = function(req:any, res:any, next:any) {
    //get the token from the header if present
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    //if no token found, return response (without going to the next middelware)
    if (!token) return res.status(401).send("Access denied. No token provided.");

    try {
        //if can verify the token, set req.user and pass to next middleware
        const decoded = jwt.verify(token, globalAny.gConfig.privateKey);
        req.user = decoded;
        next();
    } catch (ex) {
        //if invalid token
        res.status(400).send("Invalid token.");
    }
};
