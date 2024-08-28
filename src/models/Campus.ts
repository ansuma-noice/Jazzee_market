import mongoose from 'mongoose';

const CampusSchema = new mongoose.Schema({
  universityName: String,
  coordinatorName: String,
  coordinatorEmail: String,
  universitySite:String,
  coordinatorPhoneNumber: Number,
  collegeAddress: String,
  pinCode: Number,
  jobTuples: [
    {
      sector: String,
      jobOpenings: Number,
    },
  ],
});

export default mongoose.models.Campus || mongoose.model('Campus', CampusSchema);
