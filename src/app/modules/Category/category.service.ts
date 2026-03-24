// src/modules/category/category.service.ts

import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { Category } from './category.model';
import { ICategory } from './category.interface';

// CREATE
const createCategoryIntoDB = async (payload: ICategory) => {
  // optional: prevent duplicate name
  const isExist = await Category.findOne({ name: payload.name });

  if (isExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Category already exists');
  }

  const result = await Category.create(payload);
  return result;
};

// GET ALL
const getAllCategoriesFromDB = async (query: Record<string, unknown>) => {
  const categoryQuery = new QueryBuilder(
    Category.find({ isDeleted: { $ne: true } }),
    query,
  )
    .search(['name',"slug"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await categoryQuery.modelQuery;
  const meta = await categoryQuery.countTotal();

  return {
    meta,
    result,
  };
};

// GET SINGLE
const getSingleCategoryFromDB = async (id: string) => {
  const result = await Category.findOne({
    _id: id,
    isDeleted: { $ne: true },
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category not found');
  }

  return result;
};

// UPDATE
const updateCategoryIntoDB = async (
  id: string,
  payload: Partial<ICategory>,
) => {
  const result = await Category.findOneAndUpdate(
    { _id: id, isDeleted: { $ne: true } },
    payload,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category not found');
  }

  return result;
};

// DELETE (Soft Delete)
const deleteCategoryFromDB = async (id: string) => {
  const result = await Category.findOneAndUpdate(
    { _id: id, isDeleted: { $ne: true } },
    { isDeleted: true },
    { new: true },
  );

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category not found');
  }

  return result;
};

export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
  getSingleCategoryFromDB,
  updateCategoryIntoDB,
  deleteCategoryFromDB,
};