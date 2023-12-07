// add your code here!
import mongoose from 'mongoose';

// Load environment variables
import './config.mjs';


// Schema
const ReviewSchema = new mongoose.Schema({
    courseNumber: String,
    courseName: String,
    semester: String,
    year: Number,
    professor: String,
    review: String
});

mongoose.model('Review', ReviewSchema);

// Connect to the Database
mongoose.connect(process.env.DSN, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB!");
}).catch(err => {
    console.error("Error connecting to MongoDB:", err);
});
