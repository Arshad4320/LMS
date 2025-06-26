"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseControllers = void 0;
const course_model_1 = require("../model/course.model");
const cloudinary_1 = require("../../utilits/cloudinary");
const createCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, price } = req.body;
        const file = req.file;
        let imageUrl = '';
        if (file) {
            imageUrl = (yield (0, cloudinary_1.uploadToCloudinary)(file.buffer, file.originalname));
        }
        const result = yield course_model_1.Course.create({
            title,
            description,
            price,
            thumbnail: imageUrl,
        });
        res.status(201).json({
            success: true,
            message: '✅ Course created successfully',
            data: result,
        });
    }
    catch (err) {
        console.error(err);
        res
            .status(500)
            .json({ success: false, message: '❌ Failed to create course' });
    }
});
const getAllCourse = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield course_model_1.Course.find();
        res.status(200).json({
            success: true,
            message: '✅ All courses retrieved successfully',
            data: result,
        });
    }
    catch (err) {
        console.error(err);
        res
            .status(500)
            .json({ success: false, message: '❌ Failed to retrieve courses' });
    }
});
const getSingleCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield course_model_1.Course.findById(id);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: '❌ Course not found',
            });
        }
        res.status(200).json({
            success: true,
            message: '✅ Course retrieved successfully',
            data: result,
        });
    }
    catch (err) {
        console.error(err);
        res
            .status(500)
            .json({ success: false, message: '❌ Failed to retrieve course' });
    }
});
const updateCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updateData = {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
        };
        if (req.file) {
            const imageUrl = (yield (0, cloudinary_1.uploadToCloudinary)(req.file.buffer, req.file.originalname));
            updateData.thumbnail = imageUrl;
        }
        const updatedCourse = yield course_model_1.Course.findByIdAndUpdate(id, updateData, {
            new: true,
        });
        if (!updatedCourse) {
            return res.status(404).json({
                success: false,
                message: '❌ Course not found',
            });
        }
        res.status(200).json({
            success: true,
            message: '✅ Course updated successfully',
            data: updatedCourse,
        });
    }
    catch (err) {
        console.error(err);
        res
            .status(500)
            .json({ success: false, message: '❌ Failed to update course' });
    }
});
const deleteCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const deleted = yield course_model_1.Course.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: '❌ Course not found',
            });
        }
        res.status(200).json({
            success: true,
            message: '✅ Course deleted successfully',
            data: deleted,
        });
    }
    catch (err) {
        console.error(err);
        res
            .status(500)
            .json({ success: false, message: '❌ Failed to delete course' });
    }
});
exports.courseControllers = {
    createCourse,
    getAllCourse,
    getSingleCourse,
    updateCourse,
    deleteCourse,
};
