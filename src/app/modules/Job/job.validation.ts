import { z } from 'zod';

const PreRequisiteCourseValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    preRequisiteCourses: z.array(PreRequisiteCourseValidationSchema).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const updatePreRequisiteCourseValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    credits: z.number().optional(),
    preRequisiteCourses: z
      .array(updatePreRequisiteCourseValidationSchema)
      .optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const facultiesWithCourseValidationSchema = z.object({
  body: z.object({
    faculties: z.array(z.string()),
  }),
});


 const createJobValidationSchema = z.object({
  body: z.object({
    jobTitle: z
      .string()
      .trim()
      .min(1, 'Job title is required'),

    description: z
      .string()
      .optional(),
salaryRange:z
      .string()
      .optional(),
      lastDateOfApplication:z.string()
      .optional(),
    jobType: z
      .string()
      .optional(),

    categories: z
      .array(z.string().trim())
      .optional(),

    companyName: z
      .string()
      .optional(),

    companyLogo: z
      .string()
      .url('Company logo must be a valid URL')
      .optional(),

    jobLocation: z
      .array(z.string().trim())
      .optional(),

    applicantCount: z
      .number()
      .nonnegative()
      .optional(),

    createdBy: z
      .string()
      .optional(),

    isDeleted: z
      .boolean()
      .optional(),
      status: z
      .string()
      .optional(),
  }),
});

 const updateJobValidationSchema = z.object({
  body: z.object({
    jobTitle: z.string().trim().min(1).optional(),
    description: z.string().optional(),
    jobType: z.string().optional(),
    categories: z.array(z.string().trim()).optional(),
    companyName: z.string().optional(),
    companyLogo: z.string().url().optional(),
    jobLocation: z.array(z.string().trim()).optional(),
    applicantCount: z.number().nonnegative().optional(),
    createdBy: z.string().optional(),
    isDeleted: z.boolean().optional(),
  }),
});
export const JobValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
  facultiesWithCourseValidationSchema,
  createJobValidationSchema,
  updateJobValidationSchema
};
