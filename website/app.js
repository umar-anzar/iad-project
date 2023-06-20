const express = require("express");
const app = express();

// Express JS Middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname + '/public'));

const error500 = (error, response) => {
    if (error) {
        console.log("File not found");
        response.statusCode = 500; // Internal Server Error
        response.send("Internal Server Error");
    }
};

// root URL ('/') 
app.get("/", (request, response) => {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");
    response.sendFile(__dirname+"/public/index.html", (error) => ( error500(error, response) ) ); 
});

app.get("/contact", (request, response) => {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");
    response.sendFile(__dirname+"/public/contact.html", (error) => ( error500(error, response) ) ); 
});


// Recieve Form Data
app.post("/contact_form", (req, res) => {
    const email1 = req.body.email;
    const name1 = req.body.nme;
    const message1 = req.body.message;
    console.log(req.body);
    //   add Data in model
    //const addData = new myModel({ name: name1, email: email1, message: message1});
    //   call function to add data
    //insertData(addData);
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Data Received!");
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


app.listen("3000", "localhost", ()=>{
    console.log("Server is running on http://localhost:3000");
})