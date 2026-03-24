"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Job = void 0;
const mongoose_1 = require("mongoose");
const courseSchema = new mongoose_1.Schema({
    jobTitle: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    description: String,
    salaryRange: { type: String, default: "" },
    jobType: String,
    categories: [
        {
            type: String, // Example: ["IT", "Finance"]
        },
    ],
    companyName: String,
    companyLogo: String,
    jobLocation: [String],
    applicantCount: {
        type: Number,
        default: 0,
    },
    createdBy: {
        type: String, // Admin ID (can replace with ObjectId)
    },
    lastDateOfApplication: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        enum: ['DRAFT', 'PUBLISH'],
        default: "DRAFT"
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});
exports.Job = (0, mongoose_1.model)('Job', courseSchema);
