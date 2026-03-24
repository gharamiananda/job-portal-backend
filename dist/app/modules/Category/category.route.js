"use strict";
// src/modules/category/category.route.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("./category.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../User/user.constant");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.admin), category_controller_1.CategoryControllers.createCategory);
router.get("/", category_controller_1.CategoryControllers.getAllCategories);
router.get("/:id", category_controller_1.CategoryControllers.getSingleCategory);
router.patch("/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.admin), category_controller_1.CategoryControllers.updateCategory);
router.delete("/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.admin), category_controller_1.CategoryControllers.deleteCategory);
exports.CategoryRoutes = router;
