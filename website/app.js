// Import Require Libraries
const express = require('express');
const mongoDB = require('./database/mongoDB');
const os = require('os');

// Import Routes
const pageRoutes = require('./routes/pageRoutes');
const otherRoutes = require('./routes/otherRoutes');

// Global rate Limiter
const { pageLimiter } = require('./routes/rateLimiter');



// Create Express App
const app = express();


// Apply rate limiter middleware to each route
app.use(pageLimiter);


// Express JS Middleware
app.use(express.json());
app.use(express.static(__dirname + '/public'));


// Connecting to MongoDB using async/await
mongoDB.connectDB();


// Routes Middleware
app.use(pageRoutes);
app.use(otherRoutes);

// Catch-all route handler for non-existent routes
app.use((request, response) => {
    response.statusCode = 404; // Not Found
    response.setHeader("Content-Type", "text/html");
    response.send("404: Page Not Found");
});
/* the placement of the catch-all middleware function does matter in Express.js. 
It should be placed at the end of all other route handlers and middleware functions 
to ensure that it acts as a fallback for non-existent routes.
*/



// Listen on Multiple Network Interfaces
const port = 5500;

// Get all the multiple network interfaces As Object
const networkInterfaces = os.networkInterfaces();

// Loop Through all the network interfaces and Listen on all IPV4 Address available on the machine
Object.keys(networkInterfaces).forEach((interfaceName) => {

    const addresses = networkInterfaces[interfaceName];

    addresses.forEach((address) => {
        if (address.family === 'IPv4') {
            app.listen(port, address.address, () => {
                asyncLog(`Interface: ${interfaceName}
                IP Address: http://${address.address}:${port}`, 2000);
            })
        }
    });
});




function asyncLog(message, delay) {
    setTimeout(() => (console.log(message)) , delay);
}