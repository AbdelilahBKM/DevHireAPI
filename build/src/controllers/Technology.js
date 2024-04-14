"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Technology_1 = __importDefault(require("../models/Technology"));
const mongoose_1 = __importDefault(require("mongoose"));
const logging_1 = __importDefault(require("../library/logging"));
const createTechnology = (req, res, next) => {
    const { name, value } = req.body;
    const technology = new Technology_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        name: name,
        value: value
    });
    return technology
        .save()
        .then((technology) => res.status(200).json({ technology }))
        .catch((error) => {
        logging_1.default.error(error);
        return res.status(500).json({ message: 'failed' });
    });
};
const readTechnology = (req, res, next) => {
    const technology_id = req.params.technologyId;
    return Technology_1.default.findById(technology_id)
        .then((technology) => (technology ? res.status(201).json({ technology }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ message: error }));
};
const readAllTechnology = (req, res, next) => {
    return Technology_1.default.find()
        .then((technologies) => res.status(201).json({ technologies }))
        .catch((error) => res.status(500).json({ message: error }));
};
const updateTechnology = (req, res, next) => {
    const technology_id = req.params.technologyId;
    return Technology_1.default.findById(technology_id).then((technology) => {
        if (technology) {
            technology.set(technology);
            return technology
                .save()
                .then((technology) => res.status(200).json({ technology }))
                .catch((error) => res.status(500).json({ message: error }));
        }
    });
};
const deleteTechnology = (req, res, next) => {
    const technology_id = req.params.technologyId;
    return Technology_1.default.findByIdAndDelete(technology_id)
        .then(() => res.status(404).json({ message: 'deleted' }))
        .catch((error) => res.status(500).json({ message: error }));
};
exports.default = {
    createTechnology,
    readAllTechnology,
    readTechnology,
    updateTechnology,
    deleteTechnology
};
