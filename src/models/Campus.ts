import mongoose from 'mongoose';

// Define the Campus schema
const CampusSchema = new mongoose.Schema({
  designation: { type: String, required: true },                  // Name of the university
  universityName: { type: String, required: true },                  // Name of the university
  coordinatorName: { type: String, required: true },                // Name of the coordinator
  coordinatorEmail: { type: String, required: true, unique: true }, // Coordinator's email, must be unique
  universitySite: { type: String, required: true },                 // University website URL
  coordinatorPhoneNumber: { type: Number, required: true },         // Coordinator's phone number
  collegeAddress: { type: String, required: true },                 // Address of the college
  pinCode: { type: Number, required: true },                        // Postal code of the college location
  jobTuples: [
    {
      sector: { type: String, required: true },                     // Sector of the job
      jobOpenings: { type: Number, required: true },                // Number of job openings
    },
  ],
  password: { type: String, required: true },                       // Hashed password field
});

// Export the Campus model, or create a new one if it doesn't exist
export default mongoose.models.Campus || mongoose.model('Campus', CampusSchema);
