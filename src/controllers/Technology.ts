import { NextFunction, Request, Response } from 'express';
import Technology from '../models/Technology';
import mongoose from 'mongoose';
import Logging from '../library/logging';

const createTechnology = (req: Request, res: Response, next: NextFunction) => {
    const { name, value } = req.body;
    const technology = new Technology({
        _id: new mongoose.Types.ObjectId(),
        name: name,
        value: value
    });
    return technology
        .save()
        .then((technology) => res.status(200).json({ technology }))
        .catch((error) => {
            Logging.error(error);
            return res.status(500).json({ message: 'failed' });
        });
};
const readTechnology = (req: Request, res: Response, next: NextFunction) => {
    const technology_id = req.params.technologyId;
    return Technology.findById(technology_id)
        .then((technology) => (technology ? res.status(201).json({ technology }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ message: error }));
};
const readAllTechnology = (req: Request, res: Response, next: NextFunction) => {
    return Technology.find()
        .then((technologies) => res.status(201).json({ technologies }))
        .catch((error) => res.status(500).json({ message: error }));
};
const updateTechnology = (req: Request, res: Response, next: NextFunction) => {
    const technology_id = req.params.technologyId;
    return Technology.findById(technology_id).then((technology) => {
        if (technology) {
            technology.set(technology);
            return technology
                .save()
                .then((technology) => res.status(200).json({ technology }))
                .catch((error) => res.status(500).json({ message: error }));
        }
    });
};
const deleteTechnology = (req: Request, res: Response, next: NextFunction) => {
    const technology_id = req.params.technologyId;
    return Technology.findByIdAndDelete(technology_id)
        .then(() => res.status(404).json({ message: 'deleted' }))
        .catch((error) => res.status(500).json({ message: error }));
};

export default {
    createTechnology,
    readAllTechnology,
    readTechnology,
    updateTechnology,
    deleteTechnology
};
