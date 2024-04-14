"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Company_1 = __importDefault(require("../models/Company"));
const mongoose_1 = __importDefault(require("mongoose"));
const logging_1 = __importDefault(require("../library/logging"));
const createCompany = (req, res, next) => {
    const { name, logo, location, adress, website, phone, jobs } = req.body;
    const company = new Company_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
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
        logging_1.default.error(error);
        return res.status(500).json({ message: 'failed' });
    });
};
const readCompany = (req, res, next) => {
    const company_id = req.params.companyId;
    return Company_1.default.findById(company_id)
        .then((company) => (company ? res.status(201).json({ company }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ message: error }));
};
const readAllCompanies = (req, res, next) => {
    return Company_1.default.find()
        .then((companies) => res.status(201).json({ companies }))
        .catch((error) => res.status(500).json({ message: error }));
};
const updateCompany = (req, res, next) => {
    const company_id = req.params.companyId;
    return Company_1.default.findById(company_id).then((company) => {
        if (company) {
            company.set(company);
            return company
                .save()
                .then((company) => res.status(200).json({ company }))
                .catch((error) => res.status(500).json({ message: error }));
        }
    });
};
const deleteCompany = (req, res, next) => {
    const company_id = req.params.companyId;
    return Company_1.default.findByIdAndDelete(company_id)
        .then(() => res.status(404).json({ message: 'deleted' }))
        .catch((error) => res.status(500).json({ message: error }));
};
exports.default = {
    createCompany,
    readAllCompanies,
    readCompany,
    updateCompany,
    deleteCompany
};
