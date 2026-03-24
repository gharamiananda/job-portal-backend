"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplyJobValidations = void 0;
const zod_1 = require("zod");
const createApplyJobValidationZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        jobInfo: zod_1.z
            .string()
            .min(1, 'Job ID is required'),
        email: zod_1.z
            .string()
            .email('Invalid email')
            .optional(),
        firstName: zod_1.z
            .string()
            .trim()
            .optional(),
        lastName: zod_1.z
            .string()
            .trim()
            .optional(),
        contact: zod_1.z
            .string()
            .trim()
            .optional(),
        additionalContact: zod_1.z
            .string()
            .trim()
            .optional(),
        resume: zod_1.z
            .string()
            .url('Resume must be a valid URL')
            .optional(),
        experience: zod_1.z
            .string()
            .optional(),
        lastDrawnInHandSalary: zod_1.z
            .number()
            .min(0, 'Salary cannot be negative')
            .max(50000, 'Salary cannot exceed 50000')
            .optional(),
        noticePeriodDays: zod_1.z
            .number()
            .min(0)
            .max(180)
            .optional(),
    }),
});
const updateApplyJobMarksValidationZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        semesterRegistration: zod_1.z.string(),
        offeredCourse: zod_1.z.string(),
        student: zod_1.z.string(),
        courseMarks: zod_1.z.object({
            classTest1: zod_1.z.number().optional(),
            midTerm: zod_1.z.number().optional(),
            classTest2: zod_1.z.number().optional(),
            finalTerm: zod_1.z.number().optional(),
        }),
    }),
});
exports.ApplyJobValidations = {
    createApplyJobValidationZodSchema,
    updateApplyJobMarksValidationZodSchema,
};
