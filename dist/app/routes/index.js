"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_route_1 = require("../modules/Admin/admin.route");
const auth_route_1 = require("../modules/Auth/auth.route");
const course_route_1 = require("../modules/Course/course.route");
const academicDepartment_route_1 = require("../modules/AcademicDepartment/academicDepartment.route");
const academicFaculty_route_1 = require("../modules/AcademicFaculty/academicFaculty.route");
const academicSemester_route_1 = require("../modules/AcademicSemester/academicSemester.route");
const applyJob_route_1 = require("../modules/ApplyJob/applyJob.route");
const faculty_route_1 = require("../modules/Faculty/faculty.route");
const OfferedCourse_route_1 = require("../modules/OfferedCourse/OfferedCourse.route");
const semesterRegistration_route_1 = require("../modules/SemesterRegistration/semesterRegistration.route");
const student_route_1 = require("../modules/Student/student.route");
const user_route_1 = require("../modules/User/user.route");
const job_route_1 = require("../modules/Job/job.route");
const category_route_1 = require("../modules/Category/category.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/students',
        route: student_route_1.StudentRoutes,
    },
    {
        path: '/faculties',
        route: faculty_route_1.FacultyRoutes,
    },
    {
        path: '/admins',
        route: admin_route_1.AdminRoutes,
    },
    {
        path: '/academic-semesters',
        route: academicSemester_route_1.AcademicSemesterRoutes,
    },
    {
        path: '/academic-faculties',
        route: academicFaculty_route_1.AcademicFacultyRoutes,
    },
    {
        path: '/academic-departments',
        route: academicDepartment_route_1.AcademicDepartmentRoutes,
    },
    {
        path: '/courses',
        route: course_route_1.CourseRoutes,
    },
    {
        path: '/semester-registrations',
        route: semesterRegistration_route_1.semesterRegistrationRoutes,
    },
    {
        path: '/offered-courses',
        route: OfferedCourse_route_1.offeredCourseRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/apply-job',
        route: applyJob_route_1.ApplyJobRoutes,
    },
    {
        path: '/jobs',
        route: job_route_1.JobRoutes
    },
    {
        path: '/category',
        route: category_route_1.CategoryRoutes
    }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
