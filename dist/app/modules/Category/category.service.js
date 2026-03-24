"use strict";
// src/modules/category/category.service.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const category_model_1 = require("./category.model");
// CREATE
const createCategoryIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // optional: prevent duplicate name
    const isExist = yield category_model_1.Category.findOne({ name: payload.name });
    if (isExist) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Category already exists');
    }
    const result = yield category_model_1.Category.create(payload);
    return result;
});
// GET ALL
const getAllCategoriesFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryQuery = new QueryBuilder_1.default(category_model_1.Category.find({ isDeleted: { $ne: true } }), query)
        .search(['name', "slug"])
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield categoryQuery.modelQuery;
    const meta = yield categoryQuery.countTotal();
    return {
        meta,
        result,
    };
});
// GET SINGLE
const getSingleCategoryFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.Category.findOne({
        _id: id,
        isDeleted: { $ne: true },
    });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Category not found');
    }
    return result;
});
// UPDATE
const updateCategoryIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.Category.findOneAndUpdate({ _id: id, isDeleted: { $ne: true } }, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Category not found');
    }
    return result;
});
// DELETE (Soft Delete)
const deleteCategoryFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.Category.findOneAndUpdate({ _id: id, isDeleted: { $ne: true } }, { isDeleted: true }, { new: true });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Category not found');
    }
    return result;
});
exports.CategoryServices = {
    createCategoryIntoDB,
    getAllCategoriesFromDB,
    getSingleCategoryFromDB,
    updateCategoryIntoDB,
    deleteCategoryFromDB,
};
