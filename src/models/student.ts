import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNumber: String,
  collegeName: String,
  sector: String,
  jobRole: String,
  resume: String, // Assuming you're storing a URL or file path for the resume
});

export default mongoose.models.Student || mongoose.model('Student', StudentSchema);
