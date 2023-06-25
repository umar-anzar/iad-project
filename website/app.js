// Import Require Libraries
const express = require("express");
const mongo = require("mongoose");
const fs = require('fs');
const os = require('os');

// Create Express App and Extract Schema
const app = express();
const { Schema } = mongo;


// Express JS Middleware
app.use(express.json());
app.use(express.static(__dirname + '/public'));


// Connecting to MongoDB using async/await
const connectDB = async () => {
    try {
        await mongo.connect("mongodb://127.0.0.1:27017/portfolio");
        console.log("MongoDB Connected");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

connectDB();


//Creating Schema for Contact Model {name, email, message}
const contactSchema = new Schema({
    name: String,
    email: String,
    message: String
});

// Creating Contact Model
const ContactModel = mongo.model("contact", contactSchema);

const error500 = (error, response) => {
    if (error) {
        console.log(error);
        console.log("File not found");
        response.statusCode = 500; // Internal Server Error
        response.send("Internal Server Error");
    }
};


// root URL ('/') 
app.get("/", (request, response) => {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");
    response.sendFile(__dirname + "/public/index.html", (error) => (error500(error, response)));
});

app.get("/contact", (request, response) => {
    console.log("Server Running");
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");
    response.sendFile(__dirname + "/public/contact.html", (error) => (error500(error, response)));
});

app.get("/download_cv", (request, response) => {
    const filePath = __dirname + '/public/CV/umarCSResume.pdf';
    const fileName = 'umarCSResume.pdf';

    response.statusCode = 200;
    response.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
    response.setHeader("Content-Type", "application/pdf");
    response.sendFile(filePath, (error) => (error500(error, response)));
});


// Receive Form Data and add it to the database
app.post("/contact_form", async (request, response) => {
    const email1 = request.body.email;
    const name1 = request.body.name;
    const message1 = request.body.message;

    // Add Data in model
    const newContact = new ContactModel({ name: name1, email: email1, message: message1 });



    try {
        // Check whether database already has same message copy
        const isDuplicate = await ContactModel.findOne({ name: name1, email: email1, message: message1 });
        if (isDuplicate) {
            response.statusCode = 400;
            response.setHeader("Content-Type", "text/plain");
            response.end("Email already exists!");
            console.log("Message ALready Exists");
        } else {

            // Save the newContact instance to the database
            const savedContact = await newContact.save();
            console.log('Data saved:', savedContact);

            response.statusCode = 200;
            response.setHeader("Content-Type", "text/plain");
            response.end("Data Received!");
        }
    } catch (error) {
        console.error('Error saving data:', error);
        response.statusCode = 500;
        response.setHeader("Content-Type", "text/plain");
        response.end("Error saving data!");
    }
});


// Get Request which send front end blog data in json format
app.get("/blogs", async (request, response) => {

    const path = __dirname + '/blogs/blog_';
    const blogs = []

    try {
        for (let index = 1; true; index++) {

            let folder = path + index + '/';
            if (fs.existsSync(folder)) {
                let image = await fs.promises.readFile(folder + 'image.jpg');
                let text = await fs.promises.readFile(folder + 'text.json');
                let blog = {
                    image: image.toString('base64'),
                    text: JSON.parse(text)
                };
                blogs.push(blog);
            } else {
                response.status(200).json(blogs);
                break;
            }
        }
    } catch (error) {
        // Send an error response with status code 500 if any error occurs
        res.status(500).json({ error: 'Error fetching blog content' });
    }
});



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
                console.log(`Interface: ${interfaceName}`);
                console.log(`IP Address: http://${address.address}:${port}`);
            })
        }
    });

});


// Localhost IP
// app.listen("5500", "localhost", () => {
//     console.log("Server is running on http://localhost:5500");
// })