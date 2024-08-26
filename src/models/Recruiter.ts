import mongoose from 'mongoose';

const RecruiterSchema = new mongoose.Schema({
  name: String,
  workEmail: String,
  phoneNumber: String,
  companyName: String,
  jobTuples: [
    {
      sector: String,
      jobOpenings: [String],
      jobDescription: String,
      experienceRequired: String,
    },
  ],
});

export default mongoose.models.Recruiter || mongoose.model('Recruiter', RecruiterSchema);
