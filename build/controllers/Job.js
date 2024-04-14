"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Job_1 = __importDefault(require("../models/Job"));
const mongoose_1 = __importDefault(require("mongoose"));
const logging_1 = __importDefault(require("../library/logging"));
const createJob = (req, res, next) => {
    const { position, role, level, location, contractType, technologies } = req.body;
    const job = new Job_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        position: position,
        role: role,
        level: level,
        location: location,
        contractType: contractType,
        technologies: technologies
    });
    return job
        .save()
        .then((job) => res.status(200).json({ job }))
        .catch((error) => {
        logging_1.default.error(error);
        return res.status(500).json({ message: 'failed' });
    });
};
const readJob = (req, res, next) => {
    const job_id = req.params.jobId;
    return Job_1.default.findById(job_id)
        .then((job) => (job ? res.status(201).json({ job }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ message: error }));
};
const readAllJobs = (req, res, next) => {
    return Job_1.default.find()
        .then((jobs) => res.status(201).json({ jobs }))
        .catch((error) => res.status(500).json({ message: error }));
};
const updateJob = (req, res, next) => {
    const job_id = req.params.jobId;
    return Job_1.default.findById(job_id).then((job) => {
        if (job) {
            job.set(job);
            return job
                .save()
                .then((job) => res.status(200).json({ job }))
                .catch((error) => res.status(500).json({ message: error }));
        }
    });
};
const deleteJob = (req, res, next) => {
    const job_id = req.params.jobId;
    return Job_1.default.findByIdAndDelete(job_id)
        .then(() => res.status(404).json({ message: 'deleted' }))
        .catch((error) => res.status(500).json({ message: error }));
};
exports.default = {
    createJob,
    readAllJobs,
    readJob,
    updateJob,
    deleteJob
};
