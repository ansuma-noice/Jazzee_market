const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Dummy database or storage for storing form data
let studentData = [];
let recruiterData = [];
let campusData = [];

// Routes

// Student Form Route
app.post('/api/student', (req, res) => {
    const { name, email, phoneNumber, collegeName, sector, jobRole, resume } = req.body;

    // Here, you can add logic to save this data to a database or process it as needed.
    studentData.push({ name, email, phoneNumber, collegeName, sector, jobRole, resume });

    res.status(200).json({ message: 'Student data received successfully!' });
});

// Recruiter Form Route
app.post('/api/recruiter', (req, res) => {
    const { name, workEmail, phoneNumber, companyName, tuples } = req.body;

    // Here, you can add logic to save this data to a database or process it as needed.
    recruiterData.push({ name, workEmail, phoneNumber, companyName, tuples });

    res.status(200).json({ message: 'Recruiter data received successfully!' });
});

// Campus Form Route
app.post('/api/campus', (req, res) => {
    const { universityName, coordinatorName, coordinatorEmail, coordinatorPhone, collegeAddress, pinCode, tuples } = req.body;

    // Here, you can add logic to save this data to a database or process it as needed.
    campusData.push({ universityName, coordinatorName, coordinatorEmail, coordinatorPhone, collegeAddress, pinCode, tuples });

    res.status(200).json({ message: 'Campus data received successfully!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
