import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ApplyJobControllers } from './applyJob.controller';
import { ApplyJobValidations } from './applyJob.validaton';

const router = express.Router();

router.post(
  '/create-apply-Job',
  validateRequest(
    ApplyJobValidations.createApplyJobValidationZodSchema,
  ),
  ApplyJobControllers.createApplyJob,
);

// router.get(
//   '/',
//   auth(USER_ROLE.faculty),
//   ApplyJobControllers.getAllApplyJobs,
// );

// router.get(
//   '/my-Apply-Jobs',
//   auth(USER_ROLE.student),
//   ApplyJobControllers.getMyApplyJobs,
// );

// router.patch(
//   '/update-Apply-Job-marks',
//   auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
//   validateRequest(
//     ApplyJobValidations.updateApplyJobMarksValidationZodSchema,
//   ),
//   ApplyJobControllers.updateApplyJobMarks,
// );

export const ApplyJobRoutes = router;
