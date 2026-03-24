import { z } from 'zod';

 const createApplyJobValidationZodSchema = z.object({
  body: z.object({
    jobInfo: z
      .string()
      .min(1, 'Job ID is required'),

    email: z
      .string()
      .email('Invalid email')
      .optional(),

    firstName: z
      .string()
      .trim()
      .optional(),

    lastName: z
      .string()
      .trim()
      .optional(),

    contact: z
      .string()
      .trim()
      .optional(),

    additionalContact: z
      .string()
      .trim()
      .optional(),

    resume: z
      .string()
      .url('Resume must be a valid URL')
      .optional(),

    experience: z
      .string()
      .optional(),

    lastDrawnInHandSalary: z
      .number()
      .min(0, 'Salary cannot be negative')
      .max(50000, 'Salary cannot exceed 50000')
      .optional(),

    noticePeriodDays: z
      .number()
      .min(0)
      .max(180)
      .optional(),
  }),
});

const updateApplyJobMarksValidationZodSchema = z.object({
  body: z.object({
    semesterRegistration: z.string(),
    offeredCourse: z.string(),
    student: z.string(),
    courseMarks: z.object({
      classTest1: z.number().optional(),
      midTerm: z.number().optional(),
      classTest2: z.number().optional(),
      finalTerm: z.number().optional(),
    }),
  }),
});

export const ApplyJobValidations = {
  createApplyJobValidationZodSchema,
  updateApplyJobMarksValidationZodSchema,
};
