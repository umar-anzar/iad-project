const mongo = require('mongoose');

// Extract Schema
const { Schema } = mongo;


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


//Creating Schema for Contact Model {name, email, message}
const contactSchema = new Schema({
    name: String,
    email: String,
    message: String
});

// Creating Contact Model
const ContactModel = mongo.model("contact", contactSchema);



module.exports = {
    connectDB,
    contactSchema,
    ContactModel
};
