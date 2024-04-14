"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Job_1 = __importDefault(require("../controllers/Job"));
const router = (0, express_1.default)();
router.post('/create', Job_1.default.createJob);
router.get('/getAll', Job_1.default.readAllJobs);
router.get('/get/:jobId', Job_1.default.readJob);
router.patch('/update/:jobId', Job_1.default.updateJob);
router.delete('/delete/:jobId', Job_1.default.deleteJob);
exports.default = router;
