import { Schema, model } from 'mongoose';
import {
  TJob,

} from './job.interface';


const courseSchema = new Schema<TJob>({
  jobTitle: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
    description: String,
    salaryRange:{type:String,default:""},
    jobType:String,
    categories: [
      {
        type: String, // Example: ["IT", "Finance"]
      },
    ],

    companyName: String,
    companyLogo:String,
    jobLocation: [String],

    applicantCount: {
      type: Number,
      default: 0,
    },

    createdBy: {
      type: String, // Admin ID (can replace with ObjectId)
    },
    lastDateOfApplication:{
      type:String,
      default:""
    },
   status:{
    type:String,
      enum:['DRAFT','PUBLISH'],
      default:"DRAFT"
    },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const Job = model<TJob>('Job', courseSchema);