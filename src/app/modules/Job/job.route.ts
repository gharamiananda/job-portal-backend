import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../User/user.constant';
import { JobControllers } from './job.controller';
import { JobValidations } from './job.validation';

const router = express.Router();

router.post(
  '/create-job',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(JobValidations.createJobValidationSchema),
  JobControllers.createJob,
);


router.get(
  '/category-by-job',
  JobControllers.getCategoryWithCount,
);


router.get(
  '/:id',
  JobControllers.getSingleJob,
);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(JobValidations.updateJobValidationSchema),
  JobControllers.updateJob,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  JobControllers.deleteJob,
);

router.get(
  '/',
  JobControllers.getAllJobs,
);

export const JobRoutes = router;
