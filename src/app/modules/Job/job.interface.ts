import { Types,Document } from 'mongoose';

export type TPreRequisiteCourses = {
  course: Types.ObjectId;
  isDeleted: boolean;
};

  export interface TJob extends Document {

 jobTitle: string;
 jobType:string,
 salaryRange?:string,

 companyLogo:string,
  description?: string;
  categories: string[];
  companyName?: string;
  jobLocation?: string[];
  applicantCount: number;
  createdBy?: Types.ObjectId; // better than string
  createdAt: Date;
  updatedAt: Date;
  isDeleted?: boolean;
  lastDateOfApplication?:string,
  status:"DRAFT"|"PUBLISH"
};

export type TCoursefaculty = {
  course: Types.ObjectId;
  faculties: [Types.ObjectId];
};
