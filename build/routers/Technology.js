"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Technology_1 = __importDefault(require("../controllers/Technology"));
const router = (0, express_1.default)();
router.post('/create', Technology_1.default.createTechnology);
router.get('/getAll', Technology_1.default.readAllTechnology);
router.get('/get/:technologyId', Technology_1.default.readTechnology);
router.patch('/update/:technologyId', Technology_1.default.updateTechnology);
router.delete('/delete/:technologyId', Technology_1.default.deleteTechnology);
exports.default = router;
