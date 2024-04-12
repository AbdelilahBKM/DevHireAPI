import { NextFunction, Request, Response } from 'express';
import Company from '../models/Company';
import mongoose from 'mongoose';
import Logging from '../library/logging';

const createCompany = (req: Request, res: Response, next: NextFunction) => {
    const { name, logo, location, adress, website, phone, jobs } = req.body;
    const company = new Company({
        _id: new mongoose.Types.ObjectId(),
        name: name,
        logo: logo,
        location: location,
        adress: adress,
        website: website,
        phone: phone,
        jobs: jobs
    });
    return company
        .save()
        .then((company) => res.status(200).json({ company }))
        .catch((error) => {
            Logging.error(error);
            return res.status(500).json({ message: 'failed' });
        });
};
const readCompany = (req: Request, res: Response, next: NextFunction) => {
    const company_id = req.params.companyId;
    return Company.findById(company_id)
        .then((company) => (company ? res.status(201).json({ company }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ message: error }));
};
const readAllCompanies = (req: Request, res: Response, next: NextFunction) => {
    return Company.find()
        .then((companies) => res.status(201).json({ companies }))
        .catch((error) => res.status(500).json({ message: error }));
};
const updateCompany = (req: Request, res: Response, next: NextFunction) => {
    const company_id = req.params.companyId;
    return Company.findById(company_id).then((company) => {
        if (company) {
            company.set(company);
            return company
                .save()
                .then((company) => res.status(200).json({ company }))
                .catch((error) => res.status(500).json({ message: error }));
        }
    });
};
const deleteCompany = (req: Request, res: Response, next: NextFunction) => {
    const company_id = req.params.companyId;
    return Company.findByIdAndDelete(company_id)
        .then(() => res.status(404).json({ message: 'deleted' }))
        .catch((error) => res.status(500).json({ message: error }));
};

export default {
    createCompany,
    readAllCompanies,
    readCompany,
    updateCompany,
    deleteCompany
};
