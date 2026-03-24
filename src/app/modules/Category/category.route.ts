// src/modules/category/category.route.ts

import express from "express";
import { CategoryControllers } from "./category.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";

const router = express.Router();

router.post("/",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    CategoryControllers.createCategory);
router.get("/", CategoryControllers.getAllCategories);
router.get("/:id", CategoryControllers.getSingleCategory);
router.patch("/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    
    CategoryControllers.updateCategory);
router.delete("/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    
    CategoryControllers.deleteCategory);

export const CategoryRoutes = router;