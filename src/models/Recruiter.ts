import mongoose from 'mongoose';

const RecruiterSchema = new mongoose.Schema({
  name: String,
  workEmail: String,
  phoneNumber: String,
  companyName: String,
  companySite:String,
  jobTuples: [
    {
      sector: String,
      jobOpenings: Number,
      jobDescription: String,
      experienceRequired: Number,
    },
  ],
});

export default mongoose.models.Recruiter || mongoose.model('Recruiter', RecruiterSchema);
