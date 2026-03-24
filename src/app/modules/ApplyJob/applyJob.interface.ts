import { Types } from 'mongoose';

export type TGrade = 'A' | 'B' | 'C' | 'D' | 'F' | 'NA';

export type TEnrolledCourseMarks = {
  classTest1: number;
  midTerm: number;
  classTest2: number;
  finalTerm: number;
};

export type TApplyJob = {
jobTile:string,
email:string,
jobInfo: Types.ObjectId;
firstName:string,
lastName:string,
contact:string,
additionalContact:string,
resume:string,
experience :"fresher"|"experience" ,
lastDrawnInHandSalary :number
noticePeriodDays:number
};
