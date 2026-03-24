"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobValidations = void 0;
const zod_1 = require("zod");
const PreRequisiteCourseValidationSchema = zod_1.z.object({
    course: zod_1.z.string(),
    isDeleted: zod_1.z.boolean().optional(),
});
const createCourseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string(),
        prefix: zod_1.z.string(),
        code: zod_1.z.number(),
        credits: zod_1.z.number(),
        preRequisiteCourses: zod_1.z.array(PreRequisiteCourseValidationSchema).optional(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
const updatePreRequisiteCourseValidationSchema = zod_1.z.object({
    course: zod_1.z.string(),
    isDeleted: zod_1.z.boolean().optional(),
});
const updateCourseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        prefix: zod_1.z.string().optional(),
        code: zod_1.z.number().optional(),
        credits: zod_1.z.number().optional(),
        preRequisiteCourses: zod_1.z
            .array(updatePreRequisiteCourseValidationSchema)
            .optional(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
const facultiesWithCourseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        faculties: zod_1.z.array(zod_1.z.string()),
    }),
});
const createJobValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        jobTitle: zod_1.z
            .string()
            .trim()
            .min(1, 'Job title is required'),
        description: zod_1.z
            .string()
            .optional(),
        salaryRange: zod_1.z
            .string()
            .optional(),
        lastDateOfApplication: zod_1.z.string()
            .optional(),
        jobType: zod_1.z
            .string()
            .optional(),
        categories: zod_1.z
            .array(zod_1.z.string().trim())
            .optional(),
        companyName: zod_1.z
            .string()
            .optional(),
        companyLogo: zod_1.z
            .string()
            .url('Company logo must be a valid URL')
            .optional(),
        jobLocation: zod_1.z
            .array(zod_1.z.string().trim())
            .optional(),
        applicantCount: zod_1.z
            .number()
            .nonnegative()
            .optional(),
        createdBy: zod_1.z
            .string()
            .optional(),
        isDeleted: zod_1.z
            .boolean()
            .optional(),
        status: zod_1.z
            .string()
            .optional(),
    }),
});
const updateJobValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        jobTitle: zod_1.z.string().trim().min(1).optional(),
        description: zod_1.z.string().optional(),
        jobType: zod_1.z.string().optional(),
        categories: zod_1.z.array(zod_1.z.string().trim()).optional(),
        companyName: zod_1.z.string().optional(),
        companyLogo: zod_1.z.string().url().optional(),
        jobLocation: zod_1.z.array(zod_1.z.string().trim()).optional(),
        applicantCount: zod_1.z.number().nonnegative().optional(),
        createdBy: zod_1.z.string().optional(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
exports.JobValidations = {
    createCourseValidationSchema,
    updateCourseValidationSchema,
    facultiesWithCourseValidationSchema,
    createJobValidationSchema,
    updateJobValidationSchema
};
