import mongoose from 'mongoose';

const CampusSchema = new mongoose.Schema({
  universityName: String,
  coordinatorName: String,
  coordinatorEmail: String,
  coordinatorPhoneNumber: String,
  collegeAddress: String,
  pinCode: String,
  jobTuples: [
    {
      sector: String,
      jobOpenings: String,
    },
  ],
});

export default mongoose.models.Campus || mongoose.model('Campus', CampusSchema);
