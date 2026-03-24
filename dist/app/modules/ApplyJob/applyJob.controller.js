"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplyJobControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const applyJob_service_1 = require("./applyJob.service");
const createApplyJob = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield applyJob_service_1.ApplyJobServices.createApplyJobIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Student is enrolled successfully',
        data: result,
    });
}));
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
exports.ApplyJobControllers = {
    createApplyJob,
    // getAllApplyJobs,
    // getMyApplyJobs,
    // updateApplyJobMarks,
};
