import mongoose from 'mongoose';

// Define the Recruiter schema
const RecruiterSchema = new mongoose.Schema({
  designation: { type: String, required: true },                  // Name of the university
  name: { type: String, required: true },                  // Name of the recruiter
  workEmail: { type: String, required: true, unique: true },  // Work email, must be unique
  phoneNumber: { type: String, required: true },           // Phone number of the recruiter
  companyName: { type: String, required: true },           // Name of the company
  companySite: { type: String, required: true },           // Company website URL
  jobTuples: [
    {
      sector: { type: String, required: true },            // Sector of the job
      jobOpenings: { type: Number, required: true },       // Number of job openings
      jobDescription: { type: String, required: true },    // Description of the job
      experienceRequired: { type: Number, required: true },// Required experience in years
    },
  ],
  password: { type: String, required: true },              // Hashed password field
});

// Export the Recruiter model, or create a new one if it doesn't exist
export default mongoose.models.Recruiter || mongoose.model('Recruiter', RecruiterSchema);
