const {Router} = require('express');
const router = Router();
const { pageLimiter } = require('./rateLimiter');
const path = require('path');

// Get the parent directory
const parentDir = path.dirname(__dirname);

const error500 = (error, response) => {
    if (error) {
        console.log(error);
        console.log("File not found");
        response.statusCode = 500; // Internal Server Error
        response.send("Internal Server Error");
    }
};

router.use(pageLimiter);

// GET home page
router.get("/", (request, response) => {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");
    response.sendFile(parentDir + "/public/index.html", (error) => (error500(error, response)));
});

router.get("/contact", (request, response) => {
    console.log("Server Running");
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");
    response.sendFile(parentDir + "/public/contact.html", (error) => (error500(error, response)));
});



module.exports = router;
