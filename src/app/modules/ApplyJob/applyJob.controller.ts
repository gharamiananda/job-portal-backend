import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ApplyJobServices } from './applyJob.service';

const createApplyJob = catchAsync(async (req, res) => {
  const result = await ApplyJobServices.createApplyJobIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is enrolled successfully',
    data: result,
  });
});

// const getAllApplyJobs = catchAsync(async (req, res) => {
//   const facultyId = req.user.userId;

//   const result = await ApplyJobServices.getAllApplyJobsFromDB(
//     facultyId,
//     req.query,
//   );

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Enrolled courses are retrieved successfully',
//     meta: result.meta,
//     data: result.result,
//   });
// });

// const getMyApplyJobs = catchAsync(async (req, res) => {
//   const studentId = req.user.userId;

//   const result = await ApplyJobServices.getMyApplyJobsFromDB(
//     studentId,
//     req.query,
//   );

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Enrolled courses are retrieved successfully',
//     meta: result.meta,
//     data: result.result,
//   });
// });

// const updateApplyJobMarks = catchAsync(async (req, res) => {
//   const facultyId = req.user.userId;
//   const result = await ApplyJobServices.updateApplyJobMarksIntoDB(
//     facultyId,
//     req.body,
//   );

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Marks is updated successfully',
//     data: result,
//   });
// });

export const ApplyJobControllers = {
  createApplyJob,
  // getAllApplyJobs,
  // getMyApplyJobs,
  // updateApplyJobMarks,
};
