"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const course_router_1 = __importDefault(require("../module/router/course.router"));
const module_router_1 = __importDefault(require("../module/router/module.router"));
const lecture_router_1 = __importDefault(require("../module/router/lecture.router"));
const auth_router_1 = __importDefault(require("../module/router/auth.router"));
const router = (0, express_1.Router)();
router.use('/course', course_router_1.default);
router.use('/module', module_router_1.default);
router.use('/lecture', lecture_router_1.default);
router.use('/auth', auth_router_1.default);
exports.default = router;
