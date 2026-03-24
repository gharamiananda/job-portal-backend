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
exports.JobServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const job_constant_1 = require("./job.constant");
const job_model_1 = require("./job.model");
const createJobIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield job_model_1.Job.create(payload);
    return result;
});
const getAllJobsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const JobQuery = new QueryBuilder_1.default(job_model_1.Job.find(), query)
        .search(job_constant_1.JobSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield JobQuery.modelQuery;
    const meta = yield JobQuery.countTotal();
    return {
        meta,
        result,
    };
});
const getCategoryWithCount = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield job_model_1.Job.aggregate([
        {
            $match: {
                isDeleted: false, // optional filter
                // status: "PUBLISH", // optional
            },
        },
        {
            $unwind: "$categories", // break array into individual docs
        },
        {
            $group: {
                _id: "$categories",
                count: { $sum: 1 }, // count jobs
            },
        },
        {
            $project: {
                _id: 0,
                category: "$_id",
                count: 1,
            },
        },
        {
            $sort: { count: -1 }, // optional (descending)
        },
    ]);
    return result;
});
const getSingleJobFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield job_model_1.Job.findById(id);
    return result;
});
const updateJobIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    //step1: basic Job info update
    const updatedBasicJobInfo = yield job_model_1.Job.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!updatedBasicJobInfo) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to update Job');
    }
    return updatedBasicJobInfo;
});
const deleteJobFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield job_model_1.Job.findByIdAndUpdate(id, { isDeleted: true }, {
        new: true,
    });
    return result;
});
exports.JobServices = {
    createJobIntoDB,
    getAllJobsFromDB,
    getSingleJobFromDB,
    updateJobIntoDB,
    deleteJobFromDB,
    getCategoryWithCount
};
