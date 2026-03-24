/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { Job } from '../Job/job.model';
import { TApplyJob } from './applyJob.interface';
import ApplyJob from './applyJob.model';

const createApplyJobIntoDB = async (
  payload: TApplyJob,
) => {

  console.log('payload :>> ', payload);
  const session = await mongoose.startSession();

  try {
    session.startTransaction();


    // 🔹 Check Job exists
    const job = await Job.findById(payload.jobInfo).session(session);

    if (!job) {
      throw new Error('Job not found');
    }

       // 🔹 Check already applied (IMPORTANT)
    const alreadyApplied = await ApplyJob.findOne({
      jobInfo: payload.jobInfo,
      email: payload.email,
    }).session(session);

    if (alreadyApplied) {
      throw new Error('You have already applied for this job');
    }

    // 🔹 Create application
    const application = await ApplyJob.create(
      [
        payload,
      ],
      { session }
    );

    // 🔹 Increment applicant count
    await Job.findByIdAndUpdate(
      payload.jobInfo,
      { $inc: { applicantCount: 1 } },
      { session }
    );

  await session.commitTransaction();
    await session.endSession();

    return application;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

// const getAllApplyJobsFromDB = async (
//   facultyId: string,
//   query: Record<string, unknown>,
// ) => {
//   const faculty = await Faculty.findOne({ id: facultyId });

//   if (!faculty) {
//     throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found !');
//   }

//   const ApplyJobQuery = new QueryBuilder(
//     ApplyJob.find({
//       faculty: faculty._id,
//     }).populate(
//       'semesterRegistration academicSemester academicFaculty academicDepartment offeredCourse course student faculty',
//     ),
//     query,
//   )
//     .filter()
//     .sort()
//     .paginate()
//     .fields();

//   const result = await ApplyJobQuery.modelQuery;
//   const meta = await ApplyJobQuery.countTotal();

//   return {
//     meta,
//     result,
//   };
// };

// const getMyApplyJobsFromDB = async (
//   studentId: string,
//   query: Record<string, unknown>,
// ) => {
//   const student = await Student.findOne({ id: studentId });

//   if (!student) {
//     throw new AppError(httpStatus.NOT_FOUND, 'Student not found !');
//   }

//   const ApplyJobQuery = new QueryBuilder(
//     ApplyJob.find({ student: student._id }).populate(
//       'semesterRegistration academicSemester academicFaculty academicDepartment offeredCourse course student faculty',
//     ),
//     query,
//   )
//     .filter()
//     .sort()
//     .paginate()
//     .fields();

//   const result = await ApplyJobQuery.modelQuery;
//   const meta = await ApplyJobQuery.countTotal();

//   return {
//     meta,
//     result,
//   };
// };

// const updateApplyJobMarksIntoDB = async (
//   facultyId: string,
//   payload: Partial<TApplyJob>,
// ) => {
//   const { semesterRegistration, offeredCourse, student, courseMarks } = payload;

//   const isSemesterRegistrationExists =
//     await SemesterRegistration.findById(semesterRegistration);

//   if (!isSemesterRegistrationExists) {
//     throw new AppError(
//       httpStatus.NOT_FOUND,
//       'Semester registration not found !',
//     );
//   }

//   const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse);

//   if (!isOfferedCourseExists) {
//     throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found !');
//   }
//   const isStudentExists = await Student.findById(student);

//   if (!isStudentExists) {
//     throw new AppError(httpStatus.NOT_FOUND, 'Student not found !');
//   }

//   const faculty = await Faculty.findOne({ id: facultyId }, { _id: 1 });

//   if (!faculty) {
//     throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found !');
//   }

//   const isCourseBelongToFaculty = await ApplyJob.findOne({
//     semesterRegistration,
//     offeredCourse,
//     student,
//     faculty: faculty._id,
//   });

//   if (!isCourseBelongToFaculty) {
//     throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden! !');
//   }

//   const modifiedData: Record<string, unknown> = {
//     ...courseMarks,
//   };

//   if (courseMarks?.finalTerm) {
//     const { classTest1, classTest2, midTerm, finalTerm } =
//       isCourseBelongToFaculty.courseMarks;

//     const totalMarks =
//       Math.ceil(classTest1) +
//       Math.ceil(midTerm) +
//       Math.ceil(classTest2) +
//       Math.ceil(finalTerm);

//     const result = calculateGradeAndPoints(totalMarks);

//     modifiedData.grade = result.grade;
//     modifiedData.gradePoints = result.gradePoints;
//     modifiedData.isCompleted = true;
//   }

//   if (courseMarks && Object.keys(courseMarks).length) {
//     for (const [key, value] of Object.entries(courseMarks)) {
//       modifiedData[`courseMarks.${key}`] = value;
//     }
//   }

//   const result = await ApplyJob.findByIdAndUpdate(
//     isCourseBelongToFaculty._id,
//     modifiedData,
//     {
//       new: true,
//     },
//   );

//   return result;
// };

export const ApplyJobServices = {
  createApplyJobIntoDB,
  // getAllApplyJobsFromDB,
  // getMyApplyJobsFromDB,
  // updateApplyJobMarksIntoDB,
};
