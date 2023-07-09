const { Router } = require('express');
const path = require('path');
const fs = require('fs');

const router = Router();
const limiter = require('./rateLimiter');
const { ContactModel } = require('../database/mongoDB');

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

// // Get Request which send CV to user
router.get("/download_cv", limiter.downloadCVLimiter, (request, response) => {
  const filePath = parentDir + '/public/CV/umarCSResume.pdf';
  const fileName = 'umarCSResume.pdf';
  console.log("CV Request");
  response.statusCode = 200;
  response.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
  response.setHeader("Content-Type", "application/pdf");
  response.sendFile(filePath, (error) => (error500(error, response)));
});


// Receive Form Data and add it to the database
router.post("/contact_form", limiter.formLimiter, async (request, response) => {
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
router.get("/blogs", async (request, response) => {

  const path = parentDir + '/blogs/blog_';
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
    response.status(500).json({ error: 'Error fetching blog content' });
  }
});


module.exports = router;