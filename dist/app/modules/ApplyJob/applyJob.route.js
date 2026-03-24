"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplyJobRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const applyJob_controller_1 = require("./applyJob.controller");
const applyJob_validaton_1 = require("./applyJob.validaton");
const router = express_1.default.Router();
router.post('/create-apply-Job', (0, validateRequest_1.default)(applyJob_validaton_1.ApplyJobValidations.createApplyJobValidationZodSchema), applyJob_controller_1.ApplyJobControllers.createApplyJob);
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
exports.ApplyJobRoutes = router;
