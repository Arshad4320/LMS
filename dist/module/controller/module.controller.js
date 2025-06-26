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
exports.moduleController = void 0;
const module_model_1 = require("../model/module.model");
const getNextModuleNumber = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
    const modules = yield module_model_1.Module.find({ courseId })
        .sort({ moduleNumber: -1 })
        .limit(1);
    return modules.length ? modules[0].moduleNumber + 1 : 1;
});
const createModule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseId, title } = req.body;
        const moduleNumber = yield getNextModuleNumber(courseId);
        const result = yield module_model_1.Module.create({ courseId, title, moduleNumber });
        res.json({
            success: true,
            message: 'module create successfully',
            data: result,
        });
    }
    catch (err) {
        console.log(err);
    }
});
const getAllModuleByCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield module_model_1.Module.find({ courseId: req.params.courseId });
        res.json({
            success: true,
            message: 'get all module',
            data: result,
        });
    }
    catch (err) {
        console.log(err);
    }
});
const getSingleModule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield module_model_1.Module.findById(id);
        res.json({
            success: true,
            message: 'module retrieve successfully',
            data: result,
        });
    }
    catch (err) {
        console.log(err);
    }
});
const getAllModule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield module_model_1.Module.find();
        res.json({
            success: true,
            message: 'get all module',
            data: result,
        });
    }
    catch (err) {
        console.log(err);
    }
});
const updateModule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const data = req.body;
        const result = yield module_model_1.Module.findByIdAndUpdate(id, data, { new: true });
        res.json({
            success: true,
            message: 'module update successfully',
            data: result,
        });
    }
    catch (err) {
        console.log(err);
    }
});
const deleteModule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield module_model_1.Module.findByIdAndDelete(id, { new: true });
        res.json({
            success: true,
            message: 'module deleted successfully',
            result,
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.moduleController = {
    createModule,
    getAllModuleByCourse,
    getAllModule,
    updateModule,
    deleteModule,
    getSingleModule,
};
