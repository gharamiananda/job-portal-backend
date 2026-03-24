// src/modules/category/category.controller.ts

import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CategoryServices } from './category.service';

// CREATE CATEGORY
const createCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.createCategoryIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Category created successfully',
    data: result,
  });
});

// GET ALL CATEGORIES
const getAllCategories = catchAsync(async (req, res) => {
  const result = await CategoryServices.getAllCategoriesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

// GET SINGLE CATEGORY
const getSingleCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CategoryServices.getSingleCategoryFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category retrieved successfully',
    data: result,
  });
});

// UPDATE CATEGORY
const updateCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CategoryServices.updateCategoryIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category updated successfully',
    data: result,
  });
});

// DELETE CATEGORY
const deleteCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CategoryServices.deleteCategoryFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category deleted successfully',
    data: result,
  });
});

export const CategoryControllers = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};