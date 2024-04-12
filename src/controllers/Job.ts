import { NextFunction, Request, Response } from 'express';
import Job from '../models/Job';
import mongoose from 'mongoose';
import Logging from '../library/logging';

const createJob = (req: Request, res: Response, next: NextFunction) => {
    const { position, role, level, location, contractType, technologies } = req.body;
    const job = new Job({
        _id: new mongoose.Types.ObjectId(),
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
            Logging.error(error);
            return res.status(500).json({ message: 'failed' });
        });
};
const readJob = (req: Request, res: Response, next: NextFunction) => {
    const job_id = req.params.jobId;
    return Job.findById(job_id)
        .then((job) => (job ? res.status(201).json({ job }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ message: error }));
};
const readAllJobs = (req: Request, res: Response, next: NextFunction) => {
    return Job.find()
        .then((jobs) => res.status(201).json({ jobs }))
        .catch((error) => res.status(500).json({ message: error }));
};
const updateJob = (req: Request, res: Response, next: NextFunction) => {
    const job_id = req.params.jobId;
    return Job.findById(job_id).then((job) => {
        if (job) {
            job.set(job);
            return job
                .save()
                .then((job) => res.status(200).json({ job }))
                .catch((error) => res.status(500).json({ message: error }));
        }
    });
};
const deleteJob = (req: Request, res: Response, next: NextFunction) => {
    const job_id = req.params.jobId;
    return Job.findByIdAndDelete(job_id)
        .then(() => res.status(404).json({ message: 'deleted' }))
        .catch((error) => res.status(500).json({ message: error }));
};

export default {
    createJob,
    readAllJobs,
    readJob,
    updateJob,
    deleteJob
};
