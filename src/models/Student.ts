import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  designation: { type: String, required: true },                  // Name of the university
  name: { type: String, required: true },                   // Student's name
  email: { type: String, required: true, unique: true },    // Student's email, must be unique
  phoneNumber: { type: String, required: true },            // Student's phone number
  collegeName: { type: String, required: true },            // Name of the college the student belongs to
  sector: { type: String, required: true },                 // Sector the student is interested in
  jobRole: { type: String, required: true },                // Preferred job role of the student
  resume: { type: String, required: true },                 // URL or path to the student's resume
  password: { type: String, required: true },     // Assuming you're storing a URL or file path for the resume
});

export default mongoose.models.Student || mongoose.model('Student', StudentSchema);
