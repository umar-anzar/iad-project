const rateLimiter = require("express-rate-limit");

/*  
    The rate limiter middleware needs to access the request 
    body in order to identify the IP address of the client 
    making the request. It uses this information 
    to enforce rate limiting rules per IP address. If the 
    rate limiter middleware is placed after express.json(), 
    it won't have access to the request body, and the rate 
    limiting logic may not work as expected.
*/


// Apply rate limiter middleware to each route
const pageLimiter = rateLimiter({
    windowMs: 5 * 1000, // 5 seconds
    max: 30, // limit each IP to 30 requests per windowMs
    message: "Too many requests from this IP, please try again later"
});

const formLimiter = rateLimiter({
    windowMs: 10 * 1000, // 10 seconds
    max: 2, // limit each IP to 2 requests per windowMs
    message: {
        code: 429,
        message: "Too many send requests from this IP, please try again later"
    }
});

const downloadCVLimiter = rateLimiter({
    windowMs: 10 * 1000, // 10 seconds
    max: 2, // limit each IP to 2 requests per windowMs
    message: {
        code: 429,
        message: "Too many send requests from this IP, please try again later"
    }
});

module.exports = {
    pageLimiter,
    formLimiter,
    downloadCVLimiter
};