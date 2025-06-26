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
exports.lectureController = void 0;
const lecture_model_1 = require("../model/lecture.model");
const createLecture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { moduleId, title, videoUrl } = req.body;
        const pdfNotes = ((_a = req.files) === null || _a === void 0 ? void 0 : _a.map(file => file.path)) || [];
        const result = yield lecture_model_1.Lecture.create({
            moduleId,
            title,
            videoUrl,
            pdfNotes,
        });
        res.json({
            success: true,
            message: 'create lecture',
            data: result,
        });
    }
    catch (err) {
        console.log(err);
    }
});
const getLectures = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { moduleId, courseId } = req.query;
        const filter = {};
        if (moduleId)
            filter.moduleId = moduleId;
        const lectures = yield lecture_model_1.Lecture.find(filter).populate({
            path: 'moduleId',
            match: courseId ? { courseId } : {},
        });
        const result = lectures.filter(l => l.moduleId !== null);
        res.status(200).json({
            success: true,
            message: 'lecture successfully retrieved',
            data: result,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve lectures',
            error: err,
        });
    }
});
const getAllLectures = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield lecture_model_1.Lecture.find();
        res.json({
            success: true,
            message: 'find all lecture',
            data: result,
        });
    }
    catch (err) {
        console.log(err);
    }
});
const updateLecture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, videoUrl } = req.body;
        const pdfNotes = req.files
            ? req.files.map(file => file.path)
            : [];
        const result = yield lecture_model_1.Lecture.findByIdAndUpdate(req.params.id, { title, videoUrl, pdfNotes }, { new: true });
        res.json({
            success: true,
            message: 'lecture update successfully',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({ message: 'Lecture update failed', error: err });
    }
});
const deleteLecture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield lecture_model_1.Lecture.findByIdAndDelete(req.params.id);
        res.json({
            success: true,
            message: 'lecture deleted successfully',
            data: result,
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.lectureController = {
    createLecture,
    getLectures,
    updateLecture,
    deleteLecture,
    getAllLectures,
};
