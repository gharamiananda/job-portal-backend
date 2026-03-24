import mongoose, { Schema } from 'mongoose';
import { TApplyJob } from './applyJob.interface';

const ApplyJobSchema = new Schema<TApplyJob>({
  jobInfo: {
    type: Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },

  jobTile: {
    type: String,
    default: "",
  },
  email:{
    type: String,

  },

  firstName: {
    type: String,
    default: "",
  },

  lastName: {
    type: String,
    default: "",
  },

  contact: {
    type: String,
    default: "",
  },

  additionalContact: {
    type: String,
    default: "",
  },

  resume: {
    type: String,
    default: "",
  },
   experience: {
    type: String,
    default: "fresher",
  },
  lastDrawnInHandSalary: {
    type: Number,
    min: 0,
    max: 50000,
    default: 0,
  },
   noticePeriodDays: {
    type: Number,
    min: 0,
    max: 180,
    default: 0,
  },
  
});

const ApplyJob = mongoose.model<TApplyJob>(
  'ApplyJob',
  ApplyJobSchema,
);

export default ApplyJob;
